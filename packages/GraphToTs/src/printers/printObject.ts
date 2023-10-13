import { typeNames } from "../constants";
import { ObjectsTree, ObjectsTreeValue } from "../types";
import printArgs from "./printArgs";
import printField from "./printField";
import printType from "./printType";

function printObjects(objectsTree: ObjectsTree) {
  let allOriginalsOutput = "";
  let allInternalsOutput = "";

  for (let obj of Object.values(objectsTree)) {
    const objectString = printTypeObject(obj);

    allOriginalsOutput += objectString.original;
    allInternalsOutput += objectString.internal;
  }

  return {
    original: allOriginalsOutput,
    internal: allInternalsOutput,
  };
}

function printTypeObject(obj: ObjectsTreeValue) {
  const original = printType({
    name: obj.originalName,
    fieldsPrinter: () => {
      const stringArray: string[] = [];

      for (let i = 0; i < obj.fields.length; i++) {
        const field = obj.fields[i];

        let fieldKeyValue = printField({ field });

        stringArray.push(fieldKeyValue.join(": "));
      }

      return stringArray;
    },
  });

  const internal = printType({
    name: obj.internalName,
    fieldsPrinter: () => {
      const stringArray: string[] = [];

      for (let i = 0; i < obj.fields.length; i++) {
        const field = obj.fields[i];

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

  return {
    original,
    internal,
  };
}

export default printObjects;
