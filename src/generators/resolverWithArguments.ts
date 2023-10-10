function generateResolveWithArguments() {
  return `type ResolverWithArguments<Arguments, Fields> = {
    arguments: Arguments;
    fields: Fields;
  };`;
}

export default generateResolveWithArguments;
