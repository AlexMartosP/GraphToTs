#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "fs/promises";
import fetchIntrospection from "./helpers/fetchIntrospection";

import printIndexFile from "./filePrinters/printIndexFile";
import printTypesFile from "./filePrinters/printTypesFile";
import generateSchemaTree from "./generators/generateSchemaTree";
import printParams from "./printers/printParams";
import printSchemaTree from "./printers/printSchemaTree";

async function run() {
  // Read endpoint from config file
  const configFile = await readFile("./graphql-ts.json", "utf-8");
  const config = JSON.parse(configFile);

  // Fetch schema
  const data = await fetchIntrospection(config.schema);

  // Generate internal schema tree
  const schemaTree = generateSchemaTree(data.data.__schema.types);

  // Printed schema tree
  const treePrint = printSchemaTree(schemaTree);
  // Printed params type
  const paramsPrint = printParams(schemaTree.query);

  // Print files
  const typesPrint = await printTypesFile({
    params: paramsPrint,
    inputObjects: treePrint.inputObjects,
    internalObjects: treePrint.objects.internal,
    originalObjects: treePrint.objects.original,
    query: treePrint.query,
    scalars: treePrint.scalars,
  });
  const indexPrint = await printIndexFile(config.schema);

  await mkdir("./graphql-ts");
  await writeFile("./graphql-ts/types.ts", typesPrint);
  await writeFile("./graphql-ts/index.ts", indexPrint);
}

export default run;
