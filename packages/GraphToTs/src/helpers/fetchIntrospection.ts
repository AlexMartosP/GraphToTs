import icons from "../cli/icons";
import Loading from "../cli/loading";
import { green, red } from "../cli/textColors";
import { IntrospectionResponse } from "../types";

async function fetchIntrospection(endpoint: string) {
  const loading = new Loading({
    label: "Fetching schema...",
  });

  loading.start();
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
    loading.stop();
    console.log(red(icons.error) + " Could not fetch schema");
    const e = await res.json();
    console.log(res);
    console.log(e);
    process.exit(1);
  }

  const data: IntrospectionResponse = await res.json();

  loading.stop();
  console.log(green(icons.check) + " Fetched schema successfully");

  return data;
}

export default fetchIntrospection;
