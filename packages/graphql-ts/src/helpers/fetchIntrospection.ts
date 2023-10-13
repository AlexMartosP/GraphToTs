import { IntrospectionResponse } from "../types";

async function fetchIntrospection(endpoint: string) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;",
    },
    body: JSON.stringify({
      query: `
      {
        __schema {
          queryType {
            name,
            kind
          }
          types {
            kind,
            name,
            description,
            enumValues {
              name,
            },
            inputFields {
              defaultValue,
              name,
              description,
              type {
                kind,
                name,
                ofType {
                  name,
                  kind,
                  ofType {
                    name,
                    kind,
                    ofType {
                      name,
                      kind
                    }
                  }
                }
              }
            }
            ofType {
              name,
              kind
            }
            fields(includeDeprecated: true) {
              name,
              description,
              args {
                name,
                description,
                defaultValue,
                type {
                  kind,
                  name,
                  ofType {
                    name,
                    kind,
                  }
                },
              },
              type {
                name,
                kind,
                ofType {
                  name,
                  kind,
                  ofType {
                    name,
                    kind,
                    ofType {
                      name,
                      kind
                    }
                  }
                }
              },
            }
          }
        }
      }
    `,
    }),
  });

  if (!res.ok) {
    throw new Error("Could not fetch schema");
  }
  const data: IntrospectionResponse = await res.json();

  return data;
}

export default fetchIntrospection;
