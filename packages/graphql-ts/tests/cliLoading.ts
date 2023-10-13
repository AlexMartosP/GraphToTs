import Loading from "../src/cli/loading";
import chalk from "chalk";

function t() {
  const loading = new Loading({
    label: "Loading config file...",
  });
  loading.start();

  setTimeout(() => {
    loading.stop();
    console.log(chalk.green("Loaded config file"));
  }, 5000);
}

t();
