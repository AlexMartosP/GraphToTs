import { typeNames } from "../constants";
import { FieldTypes, FieldWithKey } from "../types";

type ConditionHandler = (field: FieldWithKey) => string;

type PrintFieldParams = {
  field: FieldWithKey;
  ifScalar?: ConditionHandler;
  ifListOfScalars?: ConditionHandler;
  ifListOfObjects?: ConditionHandler;
  ifObject?: ConditionHandler;
};

function printField({
  field,
  ifScalar,
  ifObject,
  ifListOfObjects,
  ifListOfScalars,
}: PrintFieldParams) {
  const keyValuePair: [string, string] = [field.key, ""];

  switch (field.type) {
    case FieldTypes.Scalar:
      keyValuePair[1] = ifScalar
        ? ifScalar(field)
        : `${typeNames.SCALARS}["${field.typeValue}"]`;
      break;
    case FieldTypes.List:
      switch (field.listof) {
        case FieldTypes.Scalar:
          keyValuePair[1] = ifListOfScalars
            ? ifListOfScalars(field)
            : `${typeNames.SCALARS}["${field.typeValue}"][]`;
          break;
        case FieldTypes.Object:
          keyValuePair[1] = ifListOfObjects
            ? ifListOfObjects(field)
            : `${field.typeValue}[]`;
          break;
      }
      break;
    case FieldTypes.Object:
    case FieldTypes.Input_object:
      keyValuePair[1] = ifObject ? ifObject(field) : `${field.typeValue}`;
      break;
  }

  return keyValuePair;
}

export default printField;
