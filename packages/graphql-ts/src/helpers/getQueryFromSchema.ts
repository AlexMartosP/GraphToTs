import { IntrospectionTypeArray } from "../types";
import { schemaTypeConstants } from "../constants";

function getQueryFromSchema(schemaTypes: IntrospectionTypeArray) {
  return schemaTypes.find(
    (type) => type.kind === schemaTypeConstants.OBJECT && type.name === "Query"
  );
}

export default getQueryFromSchema;
