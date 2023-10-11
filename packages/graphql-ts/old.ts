// function generateTypes(objects: any) {
//   let typesType = "";
//   let queryTypes = "";

//   for (let i = 0; i < objects.length; i++) {
//     const obj = objects[i];

//     let typeString = `export type ${obj.name} = {\n`;
//     let queryTypeString = `export type query${obj.name} = {\n`;

//     for (let j = 0; j < obj.fields.length; j++) {
//       const field = obj.fields[j];

//       const fieldName = field.typeValue;

//       const type = getType(field.type);

//       switch (type?.type) {
//         case FieldTypes.Scalar:
//           typeString += `${fieldName}: Scalars["${type.typeValue}"]`;
//           queryTypeString += `${fieldName}?: boolean`;
//           break;
//         case FieldTypes.List:
//           typeString += `${fieldName}: ${type.typeValue}[]`;
//           queryTypeString += `${fieldName}?: ${type.typeValue}[]`;
//           break;
//         case FieldTypes.Object:
//           typeString += `${fieldName}: ${type.typeValue}`;
//           queryTypeString += `${fieldName}?: ${type.typeValue}`;
//           break;
//       }

//       if (j === obj.fields.length - 1) {
//         typeString += "\n}";
//         queryTypeString += "\n}";
//       } else {
//         typeString += ",\n";
//         queryTypeString += ",\n";
//       }
//     }

//     typesType += typeString + "\n\n";
//     queryTypes += queryTypeString + "\n\n";
//   }

//   return { queryTypes, typesType };
// }

// function generateQuery(queryObject: any) {
//   let string = `export type Query = {\n`;

//   // Duplicate
//   for (let i = 0; i < queryObject.fields.length; i++) {
//     const field = queryObject.fields[i];

//     const fieldName = field.typeValue;

//     const type = getType(field.type);

//     switch (type?.type) {
//       case FieldTypes.Scalar:
//         string += `${fieldName}: Scalars["${type.typeValue}"]`;
//         break;
//       case FieldTypes.List:
//         string += `${fieldName}: ${type.typeValue}[]`;
//         break;
//       case FieldTypes.Object:
//         string += `${fieldName}: ${type.typeValue}`;
//         break;
//     }

//     if (i === queryObject.fields.length - 1) {
//       string += "\n}";
//     } else {
//       string += ",\n";
//     }
//   }

//   return string;
// }

// function generateObjectTree(onlyTypes: any): TreeType[] {
//   let types: TreeType[] = [];

//   for (let i = 0; i < onlyTypes.length; i++) {
//     const obj = onlyTypes[i];

//     let newType: TreeType = {
//       name: obj.name,
//       queryName: "Query" + obj.name,
//       fields: [],
//     };

//     for (let j = 0; j < obj.fields.length; j++) {
//       const field = obj.fields[j];

//       const fieldName = field.typeValue;

//       const type = getType(field.type);
//       let argTypes: FieldTypeWKeyArgs["args"] = [];

//       if (field.args.length > 0) {
//         for (let k = 0; k < field.args.length; k++) {
//           const arg = field.args[k];

//           const argType = getType(arg.type);

//           argTypes.push({
//             key: arg.typeValue,
//             ...argType,
//           });
//         }
//       }

//       newType.fields.push({
//         key: fieldName,
//         args: argTypes,
//         ...type,
//       });
//     }

//     types.push(newType);
//   }

//   return types;
// }

// function generateQueryTree(onlyQuery: any) {
//   let queryFields: QueryTree = [];

//   for (let i = 0; i < onlyQuery.fields.length; i++) {
//     const field = onlyQuery.fields[i];

//     const type = getType(field.type);

//     // Duplicate
//     let argTypes: FieldTypeWKeyArgs["args"] = [];

//     if (field.args.length > 0) {
//       for (let k = 0; k < field.args.length; k++) {
//         const arg = field.args[k];

//         const argType = getType(arg.type);

//         argTypes.push({
//           key: arg.typeValue,
//           ...argType,
//         });
//       }
//     }

//     queryFields.push({
//       key: field.typeValue,
//       args: argTypes,
//       ...type,
//     });
//   }

//   return queryFields;
// }

// function generateObjectOutput(objectTree: TreeType[]) {
//   let schemaObjectsOutput = "";
//   let queryObjectsOutput = "";

//   for (let i = 0; i < objectTree.length; i++) {
//     const obj = objectTree[i];

//     let typeString = `export type ${obj.name} = {\n`;
//     let queryTypeString = `export type ${obj.queryName} = {\n`;

//     for (let j = 0; j < obj.fields.length; j++) {
//       const field = obj.fields[j];

//       const fieldKey = field.key;

//       switch (field.type) {
//         case FieldTypes.Scalar:
//           typeString += `${fieldKey}: Scalars["${field.typeValue}"]`;
//           queryTypeString += `${fieldKey}?: boolean`;
//           break;
//         case FieldTypes.List:
//           switch (field.listof) {
//             case FieldTypes.Scalar:
//               typeString += `${fieldKey}: Scalars["${field.typeValue}"][]`;
//               queryTypeString += `${fieldKey}?: boolean`;
//               break;
//             case FieldTypes.Object:
//               typeString += `${fieldKey}: ${field.typeValue}[]`;
//               queryTypeString += `${fieldKey}?: Query${field.typeValue}`;
//               break;
//           }
//           break;
//         case FieldTypes.Object:
//           typeString += `${fieldKey}: ${field.typeValue}`;
//           queryTypeString += `${fieldKey}?: Query${field.typeValue}`;
//           break;
//       }

//       if (j === obj.fields.length - 1) {
//         typeString += "\n}";
//         queryTypeString += "\n}";
//       } else {
//         typeString += ",\n";
//         queryTypeString += ",\n";
//       }
//     }

//     schemaObjectsOutput += typeString + "\n\n";
//     queryObjectsOutput += queryTypeString + "\n\n";
//   }

//   return { schemaObjectsOutput, queryObjectsOutput };
// }

// function generateParamsOutput(queryTree: QueryTree) {
//   let paramsString = "export type Params = {\n";

//   // Duplicate
//   for (let i = 0; i < queryTree.length; i++) {
//     const field = queryTree[i];

//     let fieldString = "";

//     const fieldKey = field.key;

//     switch (field.type) {
//       case FieldTypes.Scalar:
//         fieldString += `${fieldKey}?: boolean`;
//         break;
//       case FieldTypes.List:
//         switch (field.listof) {
//           case FieldTypes.Scalar:
//             fieldString += `${fieldKey}?: boolean`;
//             break;
//           case FieldTypes.Object:
//             fieldString += `${fieldKey}?: Query${field.typeValue}`;
//             break;
//         }
//         break;
//       case FieldTypes.Object:
//         if (field.args.length > 0) {
//           let args: string[] = [];
//           for (let arg of field.args) {
//             args.push(`${arg.key}?: Scalars["${arg.typeValue}"]`);
//           }

//           fieldString += `${fieldKey}?: ResolverWithArguments<{${args.join(
//             ", "
//           )}}, Query${field.typeValue}>`;
//         } else {
//           fieldString += `${fieldKey}?: Query${field.typeValue}`;
//         }
//         break;
//     }

//     if (i === queryTree.length - 1) {
//       fieldString += "\n}";
//     } else {
//       fieldString += ",\n";
//     }

//     paramsString += fieldString + "\n\n";
//   }

//   return paramsString;
// }

// function generateQueryResponseResolver(queryTree: QueryTree) {
//   let responseString =
//     "export type QueryResponseResolver<Resolver extends Params> = {\n";

//   for (let i = 0; i < queryTree.length; i++) {
//     const field = queryTree[i];

//     let fieldString = "";

//     if (field.args.length > 0) {
//       fieldString = `${field.key}: ResponseType<Resolver["${field.key}"]["fields"], ${field.typeValue}>`;
//     } else {
//       fieldString = `${field.key}: ResponseType<Resolver["${field.key}"], ${field.typeValue}>`;
//     }

//     if (i === queryTree.length - 1) {
//       fieldString += "\n}";
//     } else {
//       fieldString += ",\n";
//     }

//     responseString += fieldString + "\n\n";
//   }

//   return responseString;
// }

// function generateQueryFunctionOutput() {
//   return `
//     export function query<T extends Params>(resolver: T): QueryResponseResolver<T> {}
//   `;
// }
