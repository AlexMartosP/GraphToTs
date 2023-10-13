import { InputObjectsTree } from "../types";
import printArgs from "./printArgs";
import printField from "./printField";
import printType from "./printType";

function printInputObjects(inputObjects: InputObjectsTree) {
  let output = "";

  for (let inputObject of Object.values(inputObjects)) {
    output += printType({
      name: inputObject.originalName,
      fieldsPrinter: () => {
        const stringArray: string[] = [];
        for (let field of Object.values(inputObject.fields)) {
          let fieldKeyValue: [string, string] = printField({ field });

          if (field.isOptional) {
            stringArray.push(fieldKeyValue.join("?: "));
          } else {
            stringArray.push(fieldKeyValue.join(": "));
          }
        }

        return stringArray;
      },
    });
  }

  return output;
}

export default printInputObjects;
