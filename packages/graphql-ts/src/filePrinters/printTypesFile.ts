import { format } from "prettier";
import typeHelpers from "../shared/typeHelpers";
import resolverWithArguments from "../shared/resolverWithArguments";
import schema from "../shared/schema";
import graphResponseResolver from "../shared/graphResponseResolver";
import queryResponseResolver from "../shared/queryResponseResolver";

type PrintTypesFile = {
  params: string;
  scalars: string;
  inputObjects: string;
  originalObjects: string;
  query: string;
  internalObjects: string;
};

async function printTypesFile({
  params,
  scalars,
  inputObjects,
  internalObjects,
  originalObjects,
  query,
}: PrintTypesFile) {
  const output = `
  // Helpers
  ${typeHelpers}

  // Resolver with Arguments
  ${resolverWithArguments}

  // Scalars
  ${scalars}

  // Input objects
  ${inputObjects}

  // Objects
  ${originalObjects}

  // Query
  ${query}

  // Schema
  ${schema}

  // Internal objects
  ${internalObjects}

  // Params
  ${params}

  ${graphResponseResolver}
  // Root resolver
  ${queryResponseResolver}
  `;

  return await format(output, { parser: "typescript" });
}

export default printTypesFile;
