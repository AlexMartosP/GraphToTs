import { typeNames } from "../constants";
import { QueryTree } from "../types";
import printArgs from "./printArgs";
import printField from "./printField";
import printType from "./printType";

function printParams(queryTree: QueryTree) {
  const output = printType({
    name: typeNames.PARAMS,
    fieldsPrinter: () => {
      const stringArray: string[] = [];

      for (let field of Object.values(queryTree)) {
        let fieldKeyValue = printField({
          field,
          ifScalar: () => "boolean",
          ifListOfScalars: () => "boolean",
          ifListOfObjects: (field) =>
            `${typeNames.OBJECT_PREFIX}${field.typeValue}`,
          ifObject: (field) => `${typeNames.OBJECT_PREFIX}${field.typeValue}`,
        });

        if (field.args.length > 0) {
          const argsString = printArgs(field.args);

          const fieldType = fieldKeyValue[1];
          fieldKeyValue[1] = `${typeNames.RESWARGS}<{${argsString}}, ${fieldType}>`;
        }

        stringArray.push(fieldKeyValue.join("?: "));
      }

      return stringArray;
    },
  });

  return output;
}

export default printParams;
