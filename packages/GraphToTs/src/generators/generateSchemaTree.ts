import { IntrospectionTypeArray, SchemaTree } from "../types";
import {
  getInputObjectsFromSchema,
  getObjectsFromSchema,
  getQueryFromSchema,
  getScalarsFromSchema,
} from "../helpers";
import generateScalars from "./generateScalars";
import generateObjects from "./generateObjects";
import generateQuery from "./generateQuery";
import generateInputObjects from "./generateInputObjects";

function generateSchemaTree(
  types: IntrospectionTypeArray,
  queryName: string
): SchemaTree {
  // Get types from introspection
  const scalarTypes = getScalarsFromSchema(types);
  const objectTypes = getObjectsFromSchema(types, queryName);
  const queryType = getQueryFromSchema(types, queryName);
  const inputObjectsTypes = getInputObjectsFromSchema(types);

  if (!queryType) {
    throw new Error("No Query type found!");
  }

  // Generate sub-trees of types
  const scalars = generateScalars(scalarTypes);
  const inputObjects = generateInputObjects(inputObjectsTypes);
  const objects = generateObjects(objectTypes);
  const query = generateQuery(queryType);

  // Return entire schema tree
  return {
    scalars,
    objects,
    query,
    inputObjects,
    enums: {},
  };
}

export default generateSchemaTree;
