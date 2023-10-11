// Scalars
export type Scalars = {
  Boolean: boolean;
  Float: number;
  ID: string;
  Int: number;
  String: string;
};

// Input objects
export type ContinentFilterInput = {
  code?: StringQueryOperatorInput;
};
export type CountryFilterInput = {
  code?: StringQueryOperatorInput;
  continent?: StringQueryOperatorInput;
  currency?: StringQueryOperatorInput;
  name?: StringQueryOperatorInput;
};
export type LanguageFilterInput = {
  code?: StringQueryOperatorInput;
};
export type StringQueryOperatorInput = {
  eq?: Scalars["String"];
  in: Scalars["String"][];
  ne?: Scalars["String"];
  nin: Scalars["String"][];
  regex?: Scalars["String"];
};

// Objects
export type Continent = {
  code: Scalars["ID"];
  countries: Country[];
  name: Scalars["String"];
};
export type Country = {
  awsRegion: Scalars["String"];
  capital: Scalars["String"];
  code: Scalars["ID"];
  continent: Continent;
  currencies: Scalars["String"][];
  currency: Scalars["String"];
  emoji: Scalars["String"];
  emojiU: Scalars["String"];
  languages: Language[];
  name: Scalars["String"];
  native: Scalars["String"];
  phone: Scalars["String"];
  phones: Scalars["String"][];
  states: State[];
  subdivisions: Subdivision[];
};
export type Language = {
  code: Scalars["ID"];
  name: Scalars["String"];
  native: Scalars["String"];
  rtl: Scalars["Boolean"];
};
export type State = {
  code: Scalars["String"];
  country: Country;
  name: Scalars["String"];
};
export type Subdivision = {
  code: Scalars["ID"];
  emoji: Scalars["String"];
  name: Scalars["String"];
};

// Query
export type Query = {
  continent: Continent;
  continents: Continent[];
  countries: Country[];
  country: Country;
  language: Language;
  languages: Language[];
} & ObjectType;

// Schema
export type Schema = {
  query: Query;
};

// Internal query types
export type QueryContinent = {
  code?: boolean;
  countries?: QueryCountry;
  name?: boolean;
};
export type QueryCountry = {
  awsRegion?: boolean;
  capital?: boolean;
  code?: boolean;
  continent?: QueryContinent;
  currencies?: boolean;
  currency?: boolean;
  emoji?: boolean;
  emojiU?: boolean;
  languages?: QueryLanguage;
  name?: ResolverWithArguments<{ lang?: Scalars["String"] }, boolean>;
  native?: boolean;
  phone?: boolean;
  phones?: boolean;
  states?: QueryState;
  subdivisions?: QuerySubdivision;
};
export type QueryLanguage = {
  code?: boolean;
  name?: boolean;
  native?: boolean;
  rtl?: boolean;
};
export type QueryState = {
  code?: boolean;
  country?: QueryCountry;
  name?: boolean;
};
export type QuerySubdivision = {
  code?: boolean;
  emoji?: boolean;
  name?: boolean;
};

type ObjectType = Record<string, any>;

// Response resolver
type GraphResponseType<
  Resolver extends any,
  Comparer extends ObjectType
> = Comparer extends any[]
  ? GraphResponseType<Resolver, Comparer[number]>[]
  : {
      [K in keyof Resolver & string]: Force<Comparer, K> extends object[]
        ? Resolver[K] extends ResolverWithArguments<any, any>
          ? GraphResponseType<
              Resolver[K]["fields"],
              Force<Comparer, K>[number]
            >[]
          : GraphResponseType<Resolver[K], Force<Comparer, K>[number]>[]
        : Force<Comparer, K> extends object
        ? GraphResponseType<Resolver[K], Force<Comparer, K>>
        : Force<Comparer, K>;
    };

// Resolver with arguments
type ResolverWithArguments<Arguments, Fields> = {
  arguments: Arguments;
  fields: Fields;
};

// Params
export type Params = {
  continent?: ResolverWithArguments<{ code: Scalars["ID"] }, QueryContinent>;
  continents?: ResolverWithArguments<
    { filter?: ContinentFilterInput },
    QueryContinent
  >;
  countries?: ResolverWithArguments<
    { filter?: CountryFilterInput },
    QueryCountry
  >;
  country?: ResolverWithArguments<{ code: Scalars["ID"] }, QueryCountry>;
  language?: ResolverWithArguments<{ code: Scalars["ID"] }, QueryLanguage>;
  languages?: ResolverWithArguments<
    { filter?: LanguageFilterInput },
    QueryLanguage
  >;
};

type Force<T extends { [key: string]: ObjectType }, J extends string> = T[J];

// Root resolver
export type QueryResponseResolver<Resolver extends Params> = {
  [K in keyof Resolver & string]: Resolver[K] extends ResolverWithArguments<
    any,
    any
  >
    ? GraphResponseType<Resolver[K]["fields"], Query[K]>
    : GraphResponseType<Resolver[K], Force<Query, K>>;
};
export function makeQuery(endpoint: string) {
  return async function query<T extends Params>(
    resolver: T
  ): Promise<QueryResponseResolver<T>> {
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

function generateQueryString<T extends object>(resolver: T): string[] {
  const queryStringArray: string[] = [];

  for (let [key, value] of Object.entries(resolver)) {
    if (typeof value === "object" && "arguments" in value) {
      const argumentsStringArray = generateArgumentsString(value.arguments);

      if (typeof value.fields === "boolean") {
        queryStringArray.push(`${key} (${argumentsStringArray.join(", ")})`);
      } else {
        queryStringArray.push(`${key} (${argumentsStringArray.join(", ")}) {
              ${generateQueryString(value.fields).join("\n")}
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
