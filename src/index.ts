import { writeFile } from "fs/promises";
import { buildClientSchema } from "graphql";

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

  let scalarsType = generateScalars(onlyScalars);
  let typeTypes = generateTypes(onlyObjects);
  let queryType = generateQuery(queryObject);
  let schema = generateSchema();
  let responseResolver = generateResponseResolver();
  let resolverWithArguments = generateResolveWithArguments();
  let resolverFunctions = generateResolverFunctions();

  let output = `
  // Scalars
  ${scalarsType}
  
  // Types
  ${typeTypes.typesType}

  // Query
  ${queryType}

  // Schema
  ${schema}

  // Internal query types
  ${typeTypes.queryTypes}

  // Internal helper types
  // Response resolver
  ${responseResolver}

  // Resolver with arguments
  ${resolverWithArguments}
  `;

  await writeFile("./generated.ts", output);
}

function generateScalars(scalars: any) {
  let scalarsType = "type Scalars = {\n";

  for (let i = 0; i < scalars.length; i++) {
    const scalar = scalars[i];

    switch (scalar.name) {
      case "Boolean":
        scalarsType += `${scalar.name}: boolean`;
        break;
      case "Float":
      case "Int":
        scalarsType += `${scalar.name}: number`;
        break;
      case "String":
      case "ID":
        scalarsType += `${scalar.name}: string`;
        break;
      default:
        scalarsType += `${scalar.name}: any`;
        break;
    }

    if (i === scalars.length - 1) {
      scalarsType += "\n}";
    } else {
      scalarsType += ",\n";
    }
  }

  return scalarsType;
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
          queryTypeString += `${fieldName}?: Scalars["${type.name}"]`;
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

function generateSchema() {
  return `export type Schema = {
    query: Query
  }`;
}

enum Type {
  Scalar,
  List,
  Object,
}

function getType(type: any) {
  let currentType = type;
  let data: {
    type: Type | null;
    name: string;
  } = {
    type: null,
    name: "",
  };

  while (true) {
    if (currentType.kind === constants.NON_NULL) {
      currentType = currentType.ofType;
    } else if (currentType.kind === constants.SCALAR) {
      if (data.type === Type.List) {
        data.name = currentType.name;
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
      } else {
        data.type = Type.Object;
        data.name = currentType.name;
      }

      return data;
    } else {
      break;
    }
  }
}

function generateResponseResolver() {
  return `type ResponseType<Resolver extends object, Comparer extends object> = {
    [K in keyof Resolver]: Comparer[K] extends any[]
      ? Resolver[K][]
      : Resolver[K];
  };
  `;
}

function generateResolveWithArguments() {
  return `type ResolverWithArguments<Arguments, Fields> = {
    arguments: Arguments;
    fields: Fields;
  };`;
}

function generateResolverFunctions(queryTypes: any) {
  
}

getIntrospection();
