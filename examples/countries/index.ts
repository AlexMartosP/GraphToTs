import { query } from "./graphtots/index";

async function test() {
  console.log("in test");
  const allResponse = await query({
    ships: {
      arguments: {},
      fields: {
        id: true,
        model: true,
        name: true,
        type: true,
        status: true,
        speed_kn: true,
      },
    },
  });

  console.log(allResponse);
}
test();
