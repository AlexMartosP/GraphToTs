// import { query } from "./graphql-ts";
import { makeQuery } from "./graphql-ts/generated";
const query = makeQuery("https://countries.trevorblades.com/");
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

  console.log(allResponse.countries[0].capital);
}
test();
