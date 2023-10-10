
  // Scalars
  type Scalars = {
Boolean: boolean,
Float: number,
ID: string,
Int: number,
String: string
}
  
  // Types
  export type Continent = {
code: Scalars["ID"],
countries: Country[],
name: Scalars["String"]
}

export type Country = {
awsRegion: Scalars["String"],
capital: Scalars["String"],
code: Scalars["ID"],
continent: Continent,
currencies: String[],
currency: Scalars["String"],
emoji: Scalars["String"],
emojiU: Scalars["String"],
languages: Language[],
name: Scalars["String"],
native: Scalars["String"],
phone: Scalars["String"],
phones: String[],
states: State[],
subdivisions: Subdivision[]
}

export type Language = {
code: Scalars["ID"],
name: Scalars["String"],
native: Scalars["String"],
rtl: Scalars["Boolean"]
}

export type State = {
code: Scalars["String"],
country: Country,
name: Scalars["String"]
}

export type Subdivision = {
code: Scalars["ID"],
emoji: Scalars["String"],
name: Scalars["String"]
}



  // Query
  export type Query = {
continent: Continent,
continents: Continent[],
countries: Country[],
country: Country,
language: Language,
languages: Language[]
}

  // Schema
  export type Schema = {
    query: Query
  }

  // Internal query types
  export type queryContinent = {
code?: Scalars["ID"],
countries?: Country[],
name?: Scalars["String"]
}

export type queryCountry = {
awsRegion?: Scalars["String"],
capital?: Scalars["String"],
code?: Scalars["ID"],
continent?: Continent,
currencies?: String[],
currency?: Scalars["String"],
emoji?: Scalars["String"],
emojiU?: Scalars["String"],
languages?: Language[],
name?: Scalars["String"],
native?: Scalars["String"],
phone?: Scalars["String"],
phones?: String[],
states?: State[],
subdivisions?: Subdivision[]
}

export type queryLanguage = {
code?: Scalars["ID"],
name?: Scalars["String"],
native?: Scalars["String"],
rtl?: Scalars["Boolean"]
}

export type queryState = {
code?: Scalars["String"],
country?: Country,
name?: Scalars["String"]
}

export type querySubdivision = {
code?: Scalars["ID"],
emoji?: Scalars["String"],
name?: Scalars["String"]
}



  // Internal helper types
  // Response resolver
  type ResponseType<Resolver extends object, Comparer extends object> = {
    [K in keyof Resolver]: Comparer[K] extends any[]
      ? Resolver[K][]
      : Resolver[K];
  };
  

  // Resolver with arguments
  type ResolverWithArguments<Arguments, Fields> = {
    arguments: Arguments;
    fields: Fields;
  };
  