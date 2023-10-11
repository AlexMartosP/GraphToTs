export function makeQuery(endpoint: string) {
  // @ts-expect-error
  return async function query<T extends Params>(
    resolver: T
  ): Promise<
    // @ts-expect-error
    QueryResponseResolver<T>
  > {
    const queryString = generateQueryString(resolver);

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
        ${queryString.join("\n")}
    }`,
      }),
    });
    const data = await res.json();

    return data.data;
  };
}

// @ts-expect-error
function generateQueryString<T extends Params>(resolver: T): string[] {
  const queryStringArray: string[] = [];

  for (let [key, value] of Object.entries(resolver)) {
    // @ts-expect-error
    if (typeof value === "object" && "arguments" in value) {
      // @ts-expect-error
      const argumentsStringArray = generateArgumentsString(value.arguments);

      // @ts-expect-error
      if (typeof value.fields === "boolean") {
        queryStringArray.push(`${key} (${argumentsStringArray.join(", ")})`);
      } else {
        queryStringArray.push(`${key} (${argumentsStringArray.join(", ")}) {
              ${
                // @ts-expect-error
                generateQueryString(value.fields).join("\n")
              }
          }`);
      }
    } else if (typeof value === "object") {
      queryStringArray.push(`${key} {
              ${generateQueryString(value).join("\n")}
              }`);
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
        keyValues.push(`${key}: "${value}"`);
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
