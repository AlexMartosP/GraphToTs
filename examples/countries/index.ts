import { query } from "./graphql-ts";

async function test() {
  console.log("in test");
  const allResponse = await query({
    continents: {
      arguments: {},
      fields: {
        name: true,
        code: true,
        countries: {
          awsRegion: true,
          capital: true,
        },
      },
    },
    countries: {
      arguments: {
        filter: {
          currency: {
            in: ["SEK"],
            nin: ["SEK"],
          },
        },
      },
      fields: {
        capital: true,
      },
    },
  });

  console.log(allResponse.continents);
}
test();
