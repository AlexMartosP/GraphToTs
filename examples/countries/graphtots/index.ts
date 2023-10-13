import { Params, QueryResponseResolver } from "./types";

export async function query<T extends Params>(
  resolver: T,
): Promise<QueryResponseResolver<T>> {
  const queryString = generateQueryString(resolver);

  const res = await fetch("https://spacex-production.up.railway.app/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{${queryString.join("\n")}}`,
    }),
  });
  const data = await res.json();

  return data.data;
}

function generateQueryString<T extends object>(resolver: T): string[] {
  const queryStringArray: string[] = [];

  for (let [key, value] of Object.entries(resolver)) {
    if (typeof value === "object" && "arguments" in value) {
      const argumentsStringArray = generateArgumentsString(value.arguments);

      if (typeof value.fields === "boolean") {
        queryStringArray.push(
          `${key} ${
            argumentsStringArray.length > 0
              ? `(${argumentsStringArray.join(", ")})`
              : ""
          }`,
        );
      } else {
        queryStringArray.push(
          `${key} ${
            argumentsStringArray.length > 0
              ? `(${argumentsStringArray.join(", ")})`
              : ""
          } { ${generateQueryString(value.fields).join("\n")}}`,
        );
      }
    } else if (typeof value === "object") {
      queryStringArray.push(
        `${key} { ${generateQueryString(value).join("\n")}}`,
      );
    } else {
      queryStringArray.push(key + "\n");
    }
  }

  return queryStringArray;
}

function generateArgumentsString(args: object): string[] {
  let keyValues: string[] = [];

  for (let [key, value] of Object.entries(args)) {
    if (typeof value === "object" && !Array.isArray(value)) {
      keyValues.push(`${key}: { ${generateArgumentsString(value)} }`);
    } else {
      if (Array.isArray(value)) {
        keyValues.push(`${key}: [${value.map(wrapCorrectly)}]`);
      } else if (typeof value === "string") {
        keyValues.push(`${key}: '${value}'`);
      }
    }
  }

  return keyValues;
}

function wrapCorrectly(value: any): string {
  if (typeof value === "string") {
    return `"${value}"`;
  } else {
    return value;
  }
}
