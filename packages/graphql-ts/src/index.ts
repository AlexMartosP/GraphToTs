import { mkdir, writeFile } from "fs/promises";
import fetchIntrospection from "./helpers/fetchIntrospection";

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

  // Generate internal schema tree
  const schemaTree = generateSchemaTree(data.data.__schema.types);

  const filesPrint = await printFiles(schemaTree, config);

  await fileHandler(filesPrint);
}

export default run;
