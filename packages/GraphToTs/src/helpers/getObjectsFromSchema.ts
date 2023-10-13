import { IntrospectionTypeArray } from "../types";
import { schemaTypeConstants } from "../constants";

function getObjectsFromSchema(schemaTypes: IntrospectionTypeArray) {
  return schemaTypes.filter(
    (type) =>
      type.kind === schemaTypeConstants.OBJECT &&
      type.name !== "Query" &&
      !type.name.startsWith("__")
  );
}

export default getObjectsFromSchema;
