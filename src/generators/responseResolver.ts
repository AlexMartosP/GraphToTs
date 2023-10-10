function generateResponseResolver() {
  return `type ResponseType<Resolver extends object, Comparer extends object> = {
    [K in keyof Resolver]: Comparer[K] extends object[] 
      ? Resolver[K] extends ResolverWithArguments<any, any> 
        ? ResponseTypeNew<Resolver[K]["fields"], Comparer[K][number]>[] 
        : ResponseTypeNew<Resolver[K], Comparer[K][number]>[]
      : Comparer[K] extends object
        ? ResponseTypeNew<Resolver[K], Comparer[K]> 
        : Comparer[K]
  };
  `;
}

export default generateResponseResolver;
