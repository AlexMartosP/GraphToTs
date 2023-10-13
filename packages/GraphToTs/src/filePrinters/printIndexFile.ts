import { format } from "prettier";
import makeQueryFn from "../shared/queryFn";

async function printIndexFile(endpoint: string) {
  const output = makeQueryFn(endpoint);

  return await format(output, { parser: "typescript" });
}

export default printIndexFile;
