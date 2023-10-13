import { SchemaTree } from "../types";
import printInputObjects from "./printInputObjects";
import printObjects from "./printObject";
import printQuery from "./printQuery";
import printScalars from "./printScalars";

function printSchemaTree(schemaTree: SchemaTree) {
  const renderedScalars = printScalars(schemaTree.scalars);
  const renderedInputObjects = printInputObjects(schemaTree.inputObjects);
  // Prints both original query types and the ones used internally
  const renderedObjects = printObjects(schemaTree.objects);
  const renderedQuery = printQuery(schemaTree.query);

  return {
    scalars: renderedScalars,
    inputObjects: renderedInputObjects,
    objects: renderedObjects,
    query: renderedQuery,
  };
}

export default printSchemaTree;
