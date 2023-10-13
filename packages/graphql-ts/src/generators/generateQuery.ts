import { getArgs, getType } from "../helpers";
import { IntrospectionType, QueryTree } from "../types";

function generateQuery(queryType: IntrospectionType): QueryTree {
  const query: QueryTree = {};

  for (let i = 0; i < queryType.fields.length; i++) {
    const field = queryType.fields[i];

    const fieldType = getType(field.type);
    const fieldArgs = getArgs(field.args);

    query[field.name] = {
      key: field.name,
      args: fieldArgs,
      ...fieldType,
    };
  }

  return query;
}

export default generateQuery;
