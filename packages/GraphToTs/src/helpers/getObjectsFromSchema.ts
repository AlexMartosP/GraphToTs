import { IntrospectionTypeArray } from "../types";
import { schemaTypeConstants } from "../constants";

function getObjectsFromSchema(
  schemaTypes: IntrospectionTypeArray,
  queryName: string
) {
  return schemaTypes.filter(
    (type) =>
      type.kind === schemaTypeConstants.OBJECT &&
      type.name !== queryName &&
      type.name !== "Mutation" &&
      type.name !== "Subscription" &&
      !type.name.startsWith("__")
  );
}

export default getObjectsFromSchema;
