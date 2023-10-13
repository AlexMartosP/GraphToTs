import printIndexFile from "./printIndexFile";
import printTypesFile from "./printTypesFile";
import printParams from "../printers/printParams";
import printSchemaTree from "../printers/printSchemaTree";
import { SchemaTree } from "../types";
import Loading from "../cli/loading";
import { green } from "../cli/textColors";
import icons from "../cli/icons";

async function printFiles(schemaTree: SchemaTree, config: any) {
  const loading = new Loading({
    label: "Printing files...",
  });

  loading.start();

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

  loading.stop();
  console.log(green(icons.check) + " Printed files");

  return {
    typesPrint,
    indexPrint,
  };
}

export default printFiles;
