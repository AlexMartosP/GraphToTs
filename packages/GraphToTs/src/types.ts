export type NameKind = {
  name: string;
  kind: string;
};

export type IntrospectionFieldType = {
  name: string;
  kind: string;
  ofType: {
    name: string;
    kind: string;
  } & IntrospectionFieldType;
};

export type IntrospectionArgs = {
  name: string;
  description: string;
  defaultValue: string;
  type: IntrospectionFieldType;
};

export type IntrospectionType = {
  kind: string;
  name: string;
  description: string;
  enumValues: {
    name: string;
  };
  inputFields: {
    defaultValue: string;
    name: string;
    description: string;
    type: IntrospectionFieldType;
  }[];
  ofType: NameKind;
  fields: {
    name: string;
    description: string;
    args: IntrospectionArgs[];
    type: IntrospectionFieldType;
  }[];
};

export type IntrospectionTypeArray = IntrospectionType[];

export type IntrospectionResponse = {
  data: {
    __schema: {
      queryType: NameKind;
      types: IntrospectionTypeArray;
    };
  };
};

export enum FieldTypes {
  Scalar,
  List,
  Object,
  Input_object,
}

export type FieldWithKey = {
  key: string;
} & FieldType;

export type Args = FieldWithKey;

export type FieldType = {
  type: FieldTypes | null;
  listof: FieldTypes | null; // Optional
  typeValue: string;
  isOptional: boolean;
};

export type Field = {
  key: string;
  args: Args[];
} & FieldType;

export type ObjectsTreeValue = {
  originalName: string;
  internalName: string;
  fields: Field[];
};

export type ObjectsTree = {
  [key: string]: ObjectsTreeValue;
};

export type QueryTree = {
  // Field name as key
  // Better connections with "objects"
  [key: string]: Field;
};

export type InputObjectsTree = {
  // Original name as key
  [key: string]: {
    originalName: string;
    internalName: string;
    fields: Args[];
  };
};

export type ScalarTree = {
  [key: string]: {
    key: string;
    tsType: string;
    usageString: string;
  };
};

export type SchemaTree = {
  scalars: ScalarTree;
  inputObjects: InputObjectsTree;
  enums: {};
  objects: ObjectsTree;
  query: QueryTree;
  // Mutations etc.
};
