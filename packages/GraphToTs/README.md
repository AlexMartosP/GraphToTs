# GraphToTS
Convert your schema to TypeScript types which you can use to make fully type-safe queries to your server.
You will know what the server expects and what you will get from the server, without re-generating (unless you change the schema).


> [!NOTE]
> I do not recommend using this for other than exploring, this is not fully tested yet!

### Not supported
- Mutatate
- Subscribe
- Alias
- Local schemas

### Feature ideas (beyond the list above)
- Cached queries
- Config with more options:
  - Local schema with a remote server
  - Types only (and as CLI flag)
Do not hesitate to create an issue with feature ideas!

## Usage
Install the package
```
npm install graphtots
```

Configure your schema in `graphtots.json` at the root of your project
```
{
  "schema": "example.com"
}
```

Run generator
```
npx graphtots
```

Query your server
```
import { query } from "./graphtots"

// data is fully type-safe based on your schema
const data = await query({
  // Without arguments
  someData: {
    someField: true
  },
  // With arguments
  someOtherData: {
    arguments: {
      arg1: "someValue
    },
    fields: {
      otherField: true,
      nestedField: {
        someNestedField: true
      }
    }
  }
});

```
`query()` will fetch your server with a generated query.

## Contribution
You are more than welcome to create issues, feature requests or make contributions!
I think this package has potential if it has more features and is fully tested.
While learning GraphQL I found it very annoying without typesafety. Code generators made it easier, but needing to create a query string manually (without type safety) and then generate again was very time-consuming.

### Run locally
Before starting, install PNPM as the package manager.

1. Clone this repo (or fork)
2. Run `pnpm install`
3. Make changes in the new branch
4. Test out in `/examples/countries` or create a new example
5. Create a pull request