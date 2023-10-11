import { type } from "os";

export enum FieldTypes {
  Scalar,
  List,
  Object,
  Input_object,
}

export type Args = {
  key: string;
} & FieldType;

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

export type ObjectsTree = {
  [key: string]: {
    originalName: string;
    internalName: string;
    fields: Field[];
  };
};

export type QueryTreeNew = {
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
  query: QueryTreeNew;
  // Mutations etc.
};
