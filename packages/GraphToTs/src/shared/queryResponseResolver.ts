const queryResponseResolver = `
export type QueryResponseResolver<Resolver extends Params> = {
  [K in keyof Resolver & string]: Resolver[K] extends ResolverWithArguments<
    any,
    any
  >
  ? IsNullable<Query[K]> extends true 
    ? GraphResponseResolver<Resolver[K]["fields"], Query[K]> | null
    : GraphResponseResolver<Resolver[K]["fields"], Query[K]>
  : IsNullable<Query[K]> extends true 
    ? GraphResponseResolver<Resolver[K], Query[K]> | null
    : GraphResponseResolver<Resolver[K], Query[K]>
};
`;

export default queryResponseResolver;
