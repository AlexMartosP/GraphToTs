import { typeNames } from "../constants";
import { ScalarTree } from "../types";
import printType from "./printType";

function printScalars(scalarsTree: ScalarTree): string {
  let scalarsOutput = printType({
    name: typeNames.SCALARS,
    fieldsPrinter: () => {
      const stringArray: string[] = [];

      for (let value of Object.values(scalarsTree)) {
        stringArray.push(`${value.key}: ${value.tsType}`);
      }

      return stringArray;
    },
  });

  return scalarsOutput;
}

export default printScalars;
