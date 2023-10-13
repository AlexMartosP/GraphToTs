import { NameKind } from "../types";

function getQueryName(queryType: NameKind) {
  return queryType.name;
}

export default getQueryName;
