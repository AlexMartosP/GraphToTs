import { readFile } from "fs/promises";
import Loading from "../cli/loading";
import { green, red } from "../cli/textColors";
import icons from "../cli/icons";

async function readConfigFile() {
  const loading = new Loading({
    label: "Loading config file...",
  });

  try {
    loading.start();

    const configFile = await readFile("./graphtots.json", "utf-8");
    const config = JSON.parse(configFile);

    loading.stop();
    console.log(green(icons.check) + " Loaded config file");

    return config;
  } catch (error) {
    loading.stop();
    console.log(red(icons.error) + " Could not find graphtots.json file");
    process.exit(1);
  }
}

export default readConfigFile;
