const graphResponseResolver = `
type GraphResponseResolver<
Resolver extends any,
Comparer extends ObjectType
> = Comparer extends any[]
? GraphResponseResolver<Resolver, Comparer[number]>[]
: {
  [K in keyof Resolver & string]: Comparer[K] extends object[]
  ? Resolver[K] extends ResolverWithArguments<any, any>
  ? GraphResponseResolver<Resolver[K]["fields"], Comparer[K][number]>[]
  : GraphResponseResolver<Resolver[K], Comparer[K][number]>[]
  : Comparer[K] extends object
  ? GraphResponseResolver<Resolver[K], Comparer[K]>
  : Comparer[K]
};
`;

export default graphResponseResolver;
