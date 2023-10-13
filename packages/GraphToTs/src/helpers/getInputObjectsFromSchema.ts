import { IntrospectionTypeArray } from "../types";
import { schemaTypeConstants } from "../constants";

function getInputObjectsFromSchema(schemaTypes: IntrospectionTypeArray) {
  return schemaTypes.filter(
    (type) => type.kind === schemaTypeConstants.INPUT_OBJECT
  );
}

export default getInputObjectsFromSchema;
