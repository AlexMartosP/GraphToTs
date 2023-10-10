// Scalars
type Scalars = {
  Boolean: boolean;
  Float: number;
  ID: string;
  Int: number;
  String: string;
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
};

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
  name?: boolean;
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

// Internal helper types
// Response resolver
type ResponseType<Resolver extends object, Comparer extends object> = {
  [K in keyof Resolver]: Comparer[K] extends object[]
    ? Resolver[K] extends ResolverWithArguments<any, any>
      ? ResponseTypeNew<Resolver[K]["fields"], Comparer[K][number]>[]
      : ResponseTypeNew<Resolver[K], Comparer[K][number]>[]
    : Comparer[K] extends object
    ? ResponseTypeNew<Resolver[K], Comparer[K]>
    : Comparer[K];
};

// Resolver with arguments
type ResolverWithArguments<Arguments, Fields> = {
  arguments: Arguments;
  fields: Fields;
};

// Params
export type Params = {
  continent?: ResolverWithArguments<{ code?: Scalars["ID"] }, QueryContinent>;

  continents?: QueryContinent;

  countries?: QueryCountry;

  country?: ResolverWithArguments<{ code?: Scalars["ID"] }, QueryCountry>;

  language?: ResolverWithArguments<{ code?: Scalars["ID"] }, QueryLanguage>;

  languages?: QueryLanguage;
};

// Root resolver
export type QueryResponseResolver<Resolver extends Params> = {
  continent: ResponseType<Resolver["continent"]["fields"], Continent>;

  continents: ResponseType<Resolver["continents"]["fields"], Continent>;

  countries: ResponseType<Resolver["countries"]["fields"], Country>;

  country: ResponseType<Resolver["country"]["fields"], Country>;

  language: ResponseType<Resolver["language"]["fields"], Language>;

  languages: ResponseType<Resolver["languages"]["fields"], Language>;
};

// Query function

export function query<T extends Params>(
  resolver: T
): QueryResponseResolver<T> {}

const t = query({
  continent: {
    arguments: {
      code: "EU",
    },
    fields: {
      code: true,
    },
  },
  continents: {
    code: true,
    countries: {
      awsRegion: true,
    },
  },
});

t.continent.code;
t.continents;
