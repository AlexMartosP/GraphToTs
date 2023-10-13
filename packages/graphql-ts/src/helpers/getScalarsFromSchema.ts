import { IntrospectionTypeArray } from "../types";
import { schemaTypeConstants } from "../constants";

function getScalarsFromSchema(schemaTypes: IntrospectionTypeArray) {
  return schemaTypes.filter((type) => type.kind === schemaTypeConstants.SCALAR);
}

export default getScalarsFromSchema;
