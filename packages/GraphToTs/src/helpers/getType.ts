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

  console.log(currentType);
  while (true) {
    if (currentType.kind === schemaTypeConstants.NON_NULL) {
      data.isOptional = false;
      if (currentType.ofType) {
        currentType = currentType.ofType;
      } else {
        data.listof = FieldTypes.Scalar;
        data.typeValue = "Any";

        return data;
      }
    } else if (currentType.kind === schemaTypeConstants.SCALAR) {
      data.typeValue = currentType.name;

      if (data.type === FieldTypes.List) {
        data.listof = FieldTypes.Scalar;
      } else {
        data.type = FieldTypes.Scalar;
      }

      return data;
    } else if (currentType.kind === schemaTypeConstants.LIST) {
      data.type = FieldTypes.List;

      if (currentType.ofType) {
        currentType = currentType.ofType;
      } else {
        data.listof = FieldTypes.Scalar;
        data.typeValue = "Any";
      }
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
    } else if (currentType.kind === schemaTypeConstants.ENUM) {
      data.type = FieldTypes.Scalar;
      data.typeValue = "Any";

      return data;
    } else {
      break;
    }
  }

  return data;
}

export default getType;
