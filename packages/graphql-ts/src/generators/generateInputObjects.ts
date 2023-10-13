import { getType } from "../helpers";
import { Args, InputObjectsTree, IntrospectionTypeArray } from "../types";

function generateInputObjects(
  inputObjectTypes: IntrospectionTypeArray
): InputObjectsTree {
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

export default generateInputObjects;
