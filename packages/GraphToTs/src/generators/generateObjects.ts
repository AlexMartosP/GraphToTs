import { typeNames } from "../constants";
import { getArgs, getType } from "../helpers";
import { Field, IntrospectionTypeArray, ObjectsTree } from "../types";

function generateObjects(objectTypes: IntrospectionTypeArray): ObjectsTree {
  const objects: ObjectsTree = {};

  for (let i = 0; i < objectTypes.length; i++) {
    const obj = objectTypes[i];
    const fields: Field[] = [];

    console.log(obj);
    for (let j = 0; j < obj.fields.length; j++) {
      const field = obj.fields[j];

      const fieldType = getType(field.type);
      const fieldArgs = getArgs(field.args);

      fields.push({
        key: field.name,
        args: fieldArgs,
        ...fieldType,
      });
    }

    objects[obj.name] = {
      originalName: obj.name,
      internalName: typeNames.OBJECT_PREFIX + obj.name,
      fields,
    };
  }

  return objects;
}

export default generateObjects;
