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

function generateSchemaTree(types: IntrospectionTypeArray): SchemaTree {
  // Get types from introspection
  const scalarTypes = getScalarsFromSchema(types);
  const objectTypes = getObjectsFromSchema(types);
  const queryType = getQueryFromSchema(types);
  const inputObjectsTypes = getInputObjectsFromSchema(types);

  if (!queryType) {
    console.log("No Query type found!");
    throw new Error();
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
