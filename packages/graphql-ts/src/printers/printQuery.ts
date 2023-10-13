import { typeNames } from "../constants";
import { QueryTree } from "../types";
import printField from "./printField";
import printType from "./printType";

function printQuery(queryTree: QueryTree) {
  const queryOutput = printType({
    name: typeNames.QUERY,
    extendedTypes: [typeNames.OBJECT_HELPER],
    fieldsPrinter: () => {
      const stringArray: string[] = [];

      for (let field of Object.values(queryTree)) {
        let fieldKeyValue: [string, string] = printField({ field });

        if (field.isOptional) {
          const fieldType = fieldKeyValue[1];
          fieldKeyValue[1] = `${typeNames.NULLABLE_HELPER}<${fieldType}>`;
        }

        stringArray.push(fieldKeyValue.join(": "));
      }

      return stringArray;
    },
  });

  return queryOutput;
}

export default printQuery;
