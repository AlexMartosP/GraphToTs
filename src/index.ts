import { writeFile } from "fs/promises";
import { buildClientSchema } from "graphql";
import generateScalars from "./generators/scalars";
import generateSchema from "./generators/schema";
import generateResponseResolver from "./generators/responseResolver";
import generateResolveWithArguments from "./generators/resolverWithArguments";

// Get introspection
// Generate schema types
// Generate internal types
// Generate internal functions
// Generate functions and objects to be exported

// Constants
const constants = {
  SCALAR: "SCALAR",
  OBJECT: "OBJECT",
  ENUM: "ENUM",
  NON_NULL: "NON_NULL",
  LIST: "LIST",
};

// Internal types

// Introspection
async function getIntrospection() {
  // Get schema URL from config
  const res = await fetch("https://countries.trevorblades.com/", {
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
                  kind
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

  // const test = buildClientSchema(data.data);

  const onlyScalars = data.data.__schema.types.filter(
    (type: any) => type.kind === constants.SCALAR
  );
  const onlyObjects = data.data.__schema.types.filter(
    (type: any) =>
      type.kind === constants.OBJECT &&
      !type.name.startsWith("__") &&
      type.name !== "Query"
  );

  const queryObject = data.data.__schema.types.find(
    (type: any) => type.kind === constants.OBJECT && type.name === "Query"
  );

  const onlyEnum = data.data.__schema.types.filter(
    (type: any) => type.kind === constants.ENUM
  );

  // Generate scalars taht are being used
  let scalarsType = generateScalars(onlyScalars);
  // Generate the types used by queries
  // let typeTypes = generateTypes(onlyObjects);
  // Generate the query type
  let queryType = generateQuery(queryObject);
  // Generate the schema type
  let schema = generateSchema();
  // Generate the response type resolver
  let responseResolver = generateResponseResolver();
  // Generate the resolver with arguments type
  let resolverWithArguments = generateResolveWithArguments();

  let objectTree = generateObjectTree(onlyObjects);
  let queryTree = generateQueryTree(queryObject);

  let objectsOutput = generateObjectOutput(objectTree);
  let paramsOutput = generateParamsOutput(queryTree);
  let rootResponseOutput = generateQueryResponseResolver(queryTree);
  let queryFunctionOutput = generateQueryFunctionOutput();

  // TODO
  // Generate input types
  // Generate enums
  // Response resolver only return what is in params
  // Generate resolver function body
  // CLEAN-UP

  let output = `
  // Scalars
  ${scalarsType}
  
  // Objects
  ${objectsOutput.schemaObjectsOutput}

  // Query
  ${queryType}

  // Schema
  ${schema}

  // Internal query types
  ${objectsOutput.queryObjectsOutput}

  // Internal helper types
  // Response resolver
  ${responseResolver}

  // Resolver with arguments
  ${resolverWithArguments}

  // Params
  ${paramsOutput}

  // Root resolver
  ${rootResponseOutput}

  // Query function
  ${queryFunctionOutput}
  `;

  await writeFile("./generated.ts", output);
}

function generateTypes(objects: any) {
  let typesType = "";
  let queryTypes = "";

  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];

    let typeString = `export type ${obj.name} = {\n`;
    let queryTypeString = `export type query${obj.name} = {\n`;

    for (let j = 0; j < obj.fields.length; j++) {
      const field = obj.fields[j];

      const fieldName = field.name;

      const type = getType(field.type);

      switch (type?.type) {
        case Type.Scalar:
          typeString += `${fieldName}: Scalars["${type.name}"]`;
          queryTypeString += `${fieldName}?: boolean`;
          break;
        case Type.List:
          typeString += `${fieldName}: ${type.name}[]`;
          queryTypeString += `${fieldName}?: ${type.name}[]`;
          break;
        case Type.Object:
          typeString += `${fieldName}: ${type.name}`;
          queryTypeString += `${fieldName}?: ${type.name}`;
          break;
      }

      if (j === obj.fields.length - 1) {
        typeString += "\n}";
        queryTypeString += "\n}";
      } else {
        typeString += ",\n";
        queryTypeString += ",\n";
      }
    }

    typesType += typeString + "\n\n";
    queryTypes += queryTypeString + "\n\n";
  }

  return { queryTypes, typesType };
}

function generateQuery(queryObject: any) {
  let string = `export type Query = {\n`;

  // Duplicate
  for (let i = 0; i < queryObject.fields.length; i++) {
    const field = queryObject.fields[i];

    const fieldName = field.name;

    const type = getType(field.type);

    switch (type?.type) {
      case Type.Scalar:
        string += `${fieldName}: Scalars["${type.name}"]`;
        break;
      case Type.List:
        string += `${fieldName}: ${type.name}[]`;
        break;
      case Type.Object:
        string += `${fieldName}: ${type.name}`;
        break;
    }

    if (i === queryObject.fields.length - 1) {
      string += "\n}";
    } else {
      string += ",\n";
    }
  }

  return string;
}

type FieldType = {
  type: Type | null;
  listof: Type | null;
  name: string;
};

type FieldTypeWKeyArgs = {
  key: string;
  args: ({
    key: string;
  } & FieldType)[];
} & FieldType;

type TreeType = {
  name: string;
  queryName: string;
  fields: FieldTypeWKeyArgs[];
};

function generateObjectTree(onlyTypes: any): TreeType[] {
  let types: TreeType[] = [];

  for (let i = 0; i < onlyTypes.length; i++) {
    const obj = onlyTypes[i];

    let newType: TreeType = {
      name: obj.name,
      queryName: "Query" + obj.name,
      fields: [],
    };

    for (let j = 0; j < obj.fields.length; j++) {
      const field = obj.fields[j];

      const fieldName = field.name;

      const type = getType(field.type);
      let argTypes: FieldTypeWKeyArgs["args"] = [];

      if (field.args.length > 0) {
        for (let k = 0; k < field.args.length; k++) {
          const arg = field.args[k];

          const argType = getType(arg.type);

          argTypes.push({
            key: arg.name,
            ...argType,
          });
        }
      }

      newType.fields.push({
        key: fieldName,
        args: argTypes,
        ...type,
      });
    }

    types.push(newType);
  }

  return types;
}

type QueryTree = FieldTypeWKeyArgs[];

function generateQueryTree(onlyQuery: any) {
  let queryFields: QueryTree = [];

  for (let i = 0; i < onlyQuery.fields.length; i++) {
    const field = onlyQuery.fields[i];

    const type = getType(field.type);

    // Duplicate
    let argTypes: FieldTypeWKeyArgs["args"] = [];

    if (field.args.length > 0) {
      for (let k = 0; k < field.args.length; k++) {
        const arg = field.args[k];

        const argType = getType(arg.type);

        argTypes.push({
          key: arg.name,
          ...argType,
        });
      }
    }

    queryFields.push({
      key: field.name,
      args: argTypes,
      ...type,
    });
  }

  return queryFields;
}

enum Type {
  Scalar,
  List,
  Object,
}

function getType(type: any): FieldType {
  let currentType = type;
  let data: FieldType = {
    type: null,
    name: "",
    listof: null,
  };

  while (true) {
    if (currentType.kind === constants.NON_NULL) {
      currentType = currentType.ofType;
    } else if (currentType.kind === constants.SCALAR) {
      if (data.type === Type.List) {
        data.name = currentType.name;
        data.listof = Type.Scalar;
      } else {
        data.type = Type.Scalar;
        data.name = currentType.name;
      }
      return data;
    } else if (currentType.kind === constants.LIST) {
      currentType = currentType.ofType;
      data.type = Type.List;
    } else if (currentType.kind === constants.OBJECT) {
      if (data.type === Type.List) {
        data.name = currentType.name;
        data.listof = Type.Object;
      } else {
        data.type = Type.Object;
        data.name = currentType.name;
      }

      return data;
    } else {
      break;
    }
  }

  return data;
}

function generateObjectOutput(objectTree: TreeType[]) {
  let schemaObjectsOutput = "";
  let queryObjectsOutput = "";

  for (let i = 0; i < objectTree.length; i++) {
    const obj = objectTree[i];

    let typeString = `export type ${obj.name} = {\n`;
    let queryTypeString = `export type ${obj.queryName} = {\n`;

    for (let j = 0; j < obj.fields.length; j++) {
      const field = obj.fields[j];

      const fieldKey = field.key;

      switch (field.type) {
        case Type.Scalar:
          typeString += `${fieldKey}: Scalars["${field.name}"]`;
          queryTypeString += `${fieldKey}?: boolean`;
          break;
        case Type.List:
          switch (field.listof) {
            case Type.Scalar:
              typeString += `${fieldKey}: Scalars["${field.name}"][]`;
              queryTypeString += `${fieldKey}?: boolean`;
              break;
            case Type.Object:
              typeString += `${fieldKey}: ${field.name}[]`;
              queryTypeString += `${fieldKey}?: Query${field.name}`;
              break;
          }
          break;
        case Type.Object:
          typeString += `${fieldKey}: ${field.name}`;
          queryTypeString += `${fieldKey}?: Query${field.name}`;
          break;
      }

      if (j === obj.fields.length - 1) {
        typeString += "\n}";
        queryTypeString += "\n}";
      } else {
        typeString += ",\n";
        queryTypeString += ",\n";
      }
    }

    schemaObjectsOutput += typeString + "\n\n";
    queryObjectsOutput += queryTypeString + "\n\n";
  }

  return { schemaObjectsOutput, queryObjectsOutput };
}

function generateParamsOutput(queryTree: QueryTree) {
  let paramsString = "export type Params = {\n";

  // Duplicate
  for (let i = 0; i < queryTree.length; i++) {
    const field = queryTree[i];

    let fieldString = "";

    const fieldKey = field.key;

    switch (field.type) {
      case Type.Scalar:
        fieldString += `${fieldKey}?: boolean`;
        break;
      case Type.List:
        switch (field.listof) {
          case Type.Scalar:
            fieldString += `${fieldKey}?: boolean`;
            break;
          case Type.Object:
            fieldString += `${fieldKey}?: Query${field.name}`;
            break;
        }
        break;
      case Type.Object:
        if (field.args.length > 0) {
          let args: string[] = [];
          for (let arg of field.args) {
            args.push(`${arg.key}?: Scalars["${arg.name}"]`);
          }

          fieldString += `${fieldKey}?: ResolverWithArguments<{${args.join(
            ", "
          )}}, Query${field.name}>`;
        } else {
          fieldString += `${fieldKey}?: Query${field.name}`;
        }
        break;
    }

    if (i === queryTree.length - 1) {
      fieldString += "\n}";
    } else {
      fieldString += ",\n";
    }

    paramsString += fieldString + "\n\n";
  }

  return paramsString;
}

function generateQueryResponseResolver(queryTree: QueryTree) {
  let responseString =
    "export type QueryResponseResolver<Resolver extends Params> = {\n";

  for (let i = 0; i < queryTree.length; i++) {
    const field = queryTree[i];

    let fieldString = "";

    if (field.args.length > 0) {
      fieldString = `${field.key}: ResponseType<Resolver["${field.key}"]["fields"], ${field.name}>`;
    } else {
      fieldString = `${field.key}: ResponseType<Resolver["${field.key}"], ${field.name}>`;
    }

    if (i === queryTree.length - 1) {
      fieldString += "\n}";
    } else {
      fieldString += ",\n";
    }

    responseString += fieldString + "\n\n";
  }

  return responseString;
}

function generateQueryFunctionOutput() {
  return `
    export function query<T extends Params>(resolver: T): QueryResponseResolver<T> {}
  `;
}

getIntrospection();
