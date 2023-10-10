function generateSchema() {
  return `export type Schema = {
    query: Query
  }`;
}

export default generateSchema;
