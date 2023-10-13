import { mkdir, writeFile, access } from "fs/promises";
import Loading from "../cli/loading";
import { green } from "../cli/textColors";
import icons from "../cli/icons";

async function fileHandler(filesPrint: {
  typesPrint: string;
  indexPrint: string;
}) {
  const loading = new Loading({
    label: "Generating folder and files...",
  });

  let willOverwrite = false;

  loading.start();

  try {
    await mkdir("./graphql-ts");
  } catch (error: any) {
    if (error.code === "EEXIST") {
      willOverwrite = true;
    }
  }

  await writeFile("./graphql-ts/types.ts", filesPrint.typesPrint);
  await writeFile("./graphql-ts/index.ts", filesPrint.indexPrint);

  loading.stop();
  if (willOverwrite) {
    console.log(green(icons.check) + " Overwrote files");
  } else {
    console.log(green(icons.check) + " Generated folder and files");
  }
}

export default fileHandler;
