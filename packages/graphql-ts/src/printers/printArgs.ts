import { Args, FieldTypes } from "../types";
import printField from "./printField";

function printArgs(args: Args[]) {
  let argsStrings: string[] = [];

  for (let arg of args) {
    const argKeyValue = printField({ field: arg });

    if (arg.isOptional) {
      argsStrings.push(argKeyValue.join("?: "));
    } else {
      argsStrings.push(argKeyValue.join(": "));
    }
  }

  return argsStrings.join(", ");
}

export default printArgs;
