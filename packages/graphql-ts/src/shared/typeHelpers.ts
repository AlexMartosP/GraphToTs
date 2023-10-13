const typeHelpers = `
type ObjectType = Record<string, any>;

type Nullable<T> = T;

type IsNullable<T> = T extends Nullable<any>  ? true : false;
`;

export default typeHelpers;
