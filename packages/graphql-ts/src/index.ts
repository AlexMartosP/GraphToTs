#!/usr/bin/env node

import { writeFile, readFile, mkdir, appendFile } from "fs/promises";
import {
  FieldType,
  FieldTypes,
  Field,
  SchemaTree,
  ObjectsTree,
  QueryTreeNew,
  InputObjectsTree,
  Args,
  ScalarTree,
} from "./internals/types";
import constants from "./internals/constants";

// Introspection
async function getIntrospection() {
  // Read endpoint from config file
  const configFile = await readFile("./graphql-ts.json", "utf-8");
  const config = JSON.parse(configFile);
  console.log(config);

  const res = await fetch(config.schema, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;",
    },
    body: JSON.stringify({
      query: `
      {
        __schema {
          queryType {
            name,
            kind
          }
          types {
            kind,
            name,
            description,
            enumValues {
              name,
            },
            inputFields {
              defaultValue,
              name,
              description,
              type {
                kind,
                name,
                ofType {
                  name,
                  kind,
                  ofType {
                    name,
                    kind,
                    ofType {
                      name,
                      kind
                    }
                  }
                }
              }
            }
            ofType {
              name,
              kind
            }
            fields(includeDeprecated: true) {
              name,
              description,
              args {
                name,
                description,
                defaultValue,
                type {
                  kind,
                  name,
                  ofType {
                    name,
                    kind,
                  }
                },
              },
              type {
                name,
                kind,
                ofType {
                  name,
                  kind,
                  ofType {
                    name,
                    kind,
                    ofType {
                      name,
                      kind
                    }
                  }
                }
              },
            }
          }
        }
      }
    `,
    }),
  });
  const data = await res.json();

  const schemaTree = generateSchemaTree(data.data.__schema.types);
  const renderedTree = renderSchemaTree(schemaTree);
  const renderedParams = renderParams(schemaTree.query);

  let internalTypesOutput = `
  // Response resolver
  type GraphResponseType<Resolver extends object, Comparer extends object> = Comparer extends any[] 
  ? GraphResponseType<Resolver, Comparer[number]>[]  
  : {
    [K in keyof Resolver]: Comparer[K] extends object[]
      ? Resolver[K] extends ResolverWithArguments<any, any>
        ? GraphResponseType<Resolver[K]["fields"], Comparer[K][number]>[]
        : GraphResponseType<Resolver[K], Comparer[K][number]>[]
      : Comparer[K] extends object
      ? GraphResponseType<Resolver[K], Comparer[K]>
      : Comparer[K];
  };

  // Resolver with arguments
  type ResolverWithArguments<Arguments, Fields> = {
    arguments: Arguments;
    fields: Fields;
  };

  // Params
  ${renderedParams}

  // Root resolver
  export type QueryResponseResolver<Resolver extends Params> = {
    [K in keyof Resolver]: Resolver[K] extends ResolverWithArguments<any, any> 
    ? GraphResponseType<Resolver[K]["fields"], Query[K]> 
    : GraphResponseType<Resolver[K], Query[K]>;
  };
  `;

  let output = `
  // Scalars
  ${renderedTree.scalars}

  // Input objects
  ${renderedTree.inputObjects}

  // Objects
  ${renderedTree.objects.original}

  // Query
  ${renderedTree.query}

  // Schema
  export type Schema = {
    query: Query
  }

  // Internal query types
  ${renderedTree.objects.internal}
  `;

  const fn = await readFile(
    "node_modules/graphql-ts/src/internals/functions.ts",
    "utf-8"
  );

  await mkdir("./graphql-ts");
  await writeFile("./graphql-ts/generated.ts", output);
  await appendFile("./graphql-ts/generated.ts", internalTypesOutput);
  await appendFile("./graphql-ts/generated.ts", fn);
  await writeFile(
    "./graphql-ts/index.ts",
    `
    import {makeQuery} from "./generated"



    export const query = makeQuery("${config.schema}");
  `
  );
}

function generateSchemaTree(types: any): SchemaTree {
  const scalarTypes = types.filter(
    (type: any) => type.kind === constants.SCALAR
  );
  const objectTypes = types.filter(
    (type: any) =>
      type.kind === constants.OBJECT &&
      !type.name.startsWith("__") &&
      type.name !== "Query"
  );

  const queryType = types.find(
    (type: any) => type.kind === constants.OBJECT && type.name === "Query"
  );

  const inputObjectsTypes = types.filter(
    (type: any) => type.kind === constants.INPUT_OBJECT
  );

  const enumTypes = types.filter((type: any) => type.kind === constants.ENUM);

  const scalars = generateScalars(scalarTypes);
  const objects = generateObjects(objectTypes);
  const query = generateQueryNew(queryType);
  const inputObjects = generateInputObjects(inputObjectsTypes);

  return {
    scalars,
    objects,
    query,
    inputObjects,
    enums: {},
  };
}

function generateScalars(scalarType: any[]): ScalarTree {
  const scalars: ScalarTree = {};

  for (let i = 0; i < scalarType.length; i++) {
    const scalar = scalarType[i];

    switch (scalar.name) {
      case "Boolean":
        scalars[scalar.name] = {
          key: scalar.name,
          tsType: "boolean",
          usageString: `Scalars["${scalar.name}"]`,
        };
        break;
      case "Float":
      case "Int":
        scalars[scalar.name] = {
          key: scalar.name,
          tsType: "number",
          usageString: `Scalars["${scalar.name}"]`,
        };
        break;
      case "String":
      case "ID":
        scalars[scalar.name] = {
          key: scalar.name,
          tsType: "string",
          usageString: `Scalars["${scalar.name}"]`,
        };
        break;
      default:
        scalars[scalar.name] = {
          key: scalar.name,
          tsType: "any",
          usageString: `Scalars["${scalar.name}"]`,
        };
        break;
    }
  }

  return scalars;
}

function generateObjects(objectTypes: any[]): ObjectsTree {
  const objects: ObjectsTree = {};

  for (let i = 0; i < objectTypes.length; i++) {
    const obj = objectTypes[i];
    const fields: Field[] = [];

    for (let j = 0; j < obj.fields.length; j++) {
      const field = obj.fields[j];

      const fieldType = getType(field.type);
      const fieldArgs = getArgs(field.args);

      fields.push({
        key: field.name,
        args: fieldArgs,
        ...fieldType,
      });
    }

    objects[obj.name] = {
      originalName: obj.name,
      internalName: "Query" + obj.name,
      fields,
    };
  }

  return objects;
}

function generateQueryNew(queryType: any): QueryTreeNew {
  const query: QueryTreeNew = {};

  for (let i = 0; i < queryType.fields.length; i++) {
    const field = queryType.fields[i];

    const fieldType = getType(field.type);
    const fieldArgs = getArgs(field.args);

    query[field.name] = {
      key: field.name,
      args: fieldArgs,
      ...fieldType,
    };
  }

  return query;
}

function generateInputObjects(inputObjectTypes: any[]): InputObjectsTree {
  const inputObjects: InputObjectsTree = {};

  for (let i = 0; i < inputObjectTypes.length; i++) {
    const obj = inputObjectTypes[i];
    const inputFields: Args[] = [];

    for (let j = 0; j < obj.inputFields.length; j++) {
      const field = obj.inputFields[j];

      const fieldType = getType(field.type);

      inputFields.push({
        key: field.name,
        ...fieldType,
      });
    }

    inputObjects[obj.name] = {
      originalName: obj.name,
      internalName: obj.name,
      fields: inputFields,
    };
  }

  return inputObjects;
}

function renderSchemaTree(schemaTree: SchemaTree) {
  const renderedScalars = renderScalars(schemaTree.scalars);
  const renderedInputObjects = renderInputObjects(schemaTree.inputObjects);
  const renderedObjects = renderObjectsTree(schemaTree.objects);
  const renderedQuery = renderQueryTree(schemaTree.query);

  return {
    scalars: renderedScalars,
    inputObjects: renderedInputObjects,
    objects: renderedObjects,
    query: renderedQuery,
  };
}

// Should be divided in two functions for original and internals
function renderScalars(scalarsTree: ScalarTree): string {
  let scalarsOutput = "export type Scalars = {\n";

  for (let [key, value] of Object.entries(scalarsTree)) {
    const fieldString = `${key}: ${value.tsType}`;

    scalarsOutput += `${fieldString},\n`;
  }

  scalarsOutput += "};";

  return scalarsOutput;
}

function renderObjectsTree(objectsTree: ObjectsTree) {
  let allOriginalsOutput = "";
  let allInternalsOutput = "";

  for (let [key, value] of Object.entries(objectsTree)) {
    // Could be in class method (object)
    let originalObjectString = `export type ${value.originalName} = {\n`;
    let internalObjectString = `export type ${value.internalName} = {\n`;

    // Could be in class method (object)
    for (let i = 0; i < value.fields.length; i++) {
      const field = value.fields[i];

      let originalFieldKeyValue: [string, string] = [field.key, ""];
      let internalFieldKeyValue: [string, string] = [field.key, ""];

      switch (field.type) {
        case FieldTypes.Scalar:
          originalFieldKeyValue[1] = `Scalars["${field.typeValue}"]`;
          internalFieldKeyValue[1] = `boolean`;
          break;
        case FieldTypes.List:
          switch (field.listof) {
            case FieldTypes.Scalar:
              originalFieldKeyValue[1] = `Scalars["${field.typeValue}"][]`;
              internalFieldKeyValue[1] = `boolean`;
              break;
            case FieldTypes.Object:
              originalFieldKeyValue[1] = `${field.typeValue}[]`;
              internalFieldKeyValue[1] = `Query${field.typeValue}`;
              break;
          }
          break;
        case FieldTypes.Object:
          originalFieldKeyValue[1] = `${field.typeValue}`;
          internalFieldKeyValue[1] = `Query${field.typeValue}`;

          break;
      }

      if (field.args.length > 0) {
        const argsString = renderArgs(field.args);

        const internalFieldType = internalFieldKeyValue[1];
        internalFieldKeyValue[1] = `ResolverWithArguments<{${argsString}}, ${internalFieldType}>`;
      }

      const originalFieldString = originalFieldKeyValue.join(": ");
      const internalFieldString = internalFieldKeyValue.join("?: ");

      if (i === value.fields.length - 1) {
        originalObjectString += `${originalFieldString}\n};`;
        internalObjectString += `${internalFieldString}\n};`;
      } else {
        originalObjectString += `${originalFieldString},\n`;
        internalObjectString += `${internalFieldString},\n`;
      }
    }

    allOriginalsOutput += originalObjectString;
    allInternalsOutput += internalObjectString;
  }

  return {
    original: allOriginalsOutput,
    internal: allInternalsOutput,
  };
}

function renderQueryTree(queryTree: QueryTreeNew) {
  let queryOutput = "export type Query = {\n";

  for (let [key, value] of Object.entries(queryTree)) {
    let fieldKeyValue: [string, string] = [value.key, ""];

    switch (value.type) {
      case FieldTypes.Scalar:
        fieldKeyValue[1] = `Scalars["${value.typeValue}"]`;
        break;
      case FieldTypes.List:
        switch (value.listof) {
          case FieldTypes.Scalar:
            fieldKeyValue[1] = `Scalars["${value.typeValue}"][]`;
            break;
          case FieldTypes.Object:
            fieldKeyValue[1] = `${value.typeValue}[]`;
            break;
        }
        break;
      case FieldTypes.Object:
        fieldKeyValue[1] = `${value.typeValue}`;
        break;
    }

    const fieldString = fieldKeyValue.join(": ");

    queryOutput += `${fieldString},\n`;
  }

  queryOutput += "};";

  return queryOutput;
}

function renderInputObjects(inputObjects: InputObjectsTree) {
  let output = "";

  for (let [key, value] of Object.entries(inputObjects)) {
    let singleInputObjectString = `export type ${value.originalName} = {\n`;
    const fields = renderArgs(value.fields);

    singleInputObjectString += fields + "\n};";

    output += singleInputObjectString;
  }

  return output;
}

function renderParams(queryTree: QueryTreeNew) {
  let output = "export type Params = {\n";

  for (let [key, value] of Object.entries(queryTree)) {
    let fieldKeyValue: [string, string] = [value.key, ""];

    switch (value.type) {
      case FieldTypes.Scalar:
        fieldKeyValue[1] = `boolean`;
        break;
      case FieldTypes.List:
        switch (value.listof) {
          case FieldTypes.Scalar:
            fieldKeyValue[1] = `boolean`;
            break;
          case FieldTypes.Object:
            fieldKeyValue[1] = `Query${value.typeValue}`;
            break;
        }
        break;
      case FieldTypes.Object:
        fieldKeyValue[1] = `Query${value.typeValue}`;
        break;
    }

    if (value.args.length > 0) {
      const argsString = renderArgs(value.args);

      const fieldType = fieldKeyValue[1];
      fieldKeyValue[1] = `ResolverWithArguments<{${argsString}}, ${fieldType}>`;
    }

    const fieldString = fieldKeyValue.join("?: ");

    output += `${fieldString},\n`;
  }

  output += "};";

  return output;
}

function renderArgs(args: Args[]) {
  let argsStrings: string[] = [];

  for (let arg of args) {
    const argKeyValue: [string, string] = [arg.key, ""];

    // Duplicate
    switch (arg.type) {
      case FieldTypes.Scalar:
        argKeyValue[1] = `Scalars["${arg.typeValue}"]`;
        break;
      case FieldTypes.List:
        switch (arg.listof) {
          case FieldTypes.Scalar:
            argKeyValue[1] = `Scalars["${arg.typeValue}"][]`;
            break;
          case FieldTypes.Object:
            argKeyValue[1] = `${arg.typeValue}[]`;
            break;
        }
        break;
      case FieldTypes.Object:
      case FieldTypes.Input_object:
        argKeyValue[1] = `${arg.typeValue}`;
        break;
    }

    if (arg.isOptional) {
      argsStrings.push(argKeyValue.join("?: "));
    } else {
      argsStrings.push(argKeyValue.join(": "));
    }
  }

  return argsStrings.join(", ");
}

// Need to handle input objects
function getType(type: any): FieldType {
  let currentType = type;
  let data: FieldType = {
    type: null,
    typeValue: "",
    listof: null,
    isOptional: true,
  };

  while (true) {
    if (currentType.kind === constants.NON_NULL) {
      currentType = currentType.ofType;
      data.isOptional = false;
    } else if (currentType.kind === constants.SCALAR) {
      if (data.type === FieldTypes.List) {
        data.typeValue = currentType.name;
        data.listof = FieldTypes.Scalar;
      } else {
        data.type = FieldTypes.Scalar;
        data.typeValue = currentType.name;
      }
      return data;
    } else if (currentType.kind === constants.LIST) {
      currentType = currentType.ofType;
      data.type = FieldTypes.List;
    } else if (currentType.kind === constants.OBJECT) {
      if (data.type === FieldTypes.List) {
        data.typeValue = currentType.name;
        data.listof = FieldTypes.Object;
      } else {
        data.type = FieldTypes.Object;
        data.typeValue = currentType.name;
      }

      return data;
    } else if (currentType.kind === constants.INPUT_OBJECT) {
      data.type = FieldTypes.Input_object;
      data.typeValue = currentType.name;

      return data;
    } else {
      break;
    }
  }

  return data;
}

function getArgs(argTypes: any[]) {
  let args: Args[] = [];

  for (let i = 0; i < argTypes.length; i++) {
    const arg = argTypes[i];

    const argType = getType(arg.type);

    args.push({
      key: arg.name,
      ...argType,
    });
  }

  return args;
}

getIntrospection();
