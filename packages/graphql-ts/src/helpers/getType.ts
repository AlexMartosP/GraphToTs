import { schemaTypeConstants } from "../constants";
import { FieldType, FieldTypes, IntrospectionFieldType } from "../types";

function getType(type: IntrospectionFieldType): FieldType {
  let currentType = type;
  let data: FieldType = {
    type: null,
    typeValue: "",
    listof: null,
    isOptional: true,
  };

  while (true) {
    if (currentType.kind === schemaTypeConstants.NON_NULL) {
      currentType = currentType.ofType;
      data.isOptional = false;
    } else if (currentType.kind === schemaTypeConstants.SCALAR) {
      data.typeValue = currentType.name;

      if (data.type === FieldTypes.List) {
        data.listof = FieldTypes.Scalar;
      } else {
        data.type = FieldTypes.Scalar;
      }

      return data;
    } else if (currentType.kind === schemaTypeConstants.LIST) {
      currentType = currentType.ofType;
      data.type = FieldTypes.List;
    } else if (currentType.kind === schemaTypeConstants.OBJECT) {
      data.typeValue = currentType.name;

      if (data.type === FieldTypes.List) {
        data.listof = FieldTypes.Object;
      } else {
        data.type = FieldTypes.Object;
      }

      return data;
    } else if (currentType.kind === schemaTypeConstants.INPUT_OBJECT) {
      data.type = FieldTypes.Input_object;
      data.typeValue = currentType.name;

      return data;
    } else {
      break;
    }
  }

  return data;
}

export default getType;
