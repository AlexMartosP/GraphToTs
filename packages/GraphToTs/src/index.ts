import { mkdir, writeFile } from "fs/promises";
import fetchIntrospection from "./helpers/fetchIntrospection";
import getQueryname from "./helpers/getQueryName";

import printFiles from "./filePrinters/printFiles";
import generateSchemaTree from "./generators/generateSchemaTree";
import readConfigFile from "./helpers/readConfigFile";
import fileHandler from "./helpers/fileHandler";

async function run() {
  console.log("\nGenerating Typescript types based on GraphQL schema");

  // Read config file
  const config = await readConfigFile();

  // Fetch schema
  const data = await fetchIntrospection(config.schema);

  // Get Query name
  const queryName = getQueryname(data.data.__schema.queryType);

  // Generate internal schema tree
  const schemaTree = generateSchemaTree(data.data.__schema.types, queryName);

  const filesPrint = await printFiles(schemaTree, config);

  await fileHandler(filesPrint);
}

export default run;
