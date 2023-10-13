import { IntrospectionTypeArray } from "../types";
import { schemaTypeConstants } from "../constants";

function getQueryFromSchema(
  schemaTypes: IntrospectionTypeArray,
  queryName: string
) {
  return schemaTypes.find(
    (type) =>
      type.kind === schemaTypeConstants.OBJECT && type.name === queryName
  );
}

export default getQueryFromSchema;
