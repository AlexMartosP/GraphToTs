import { typeNames } from "../constants";
import { IntrospectionTypeArray, ScalarTree } from "../types";

function generateScalars(scalarType: IntrospectionTypeArray): ScalarTree {
  const scalars: ScalarTree = {
    any: {
      key: "Any",
      tsType: "any",
      usageString: `${typeNames.SCALARS}["Any"]`,
    },
  };

  for (let i = 0; i < scalarType.length; i++) {
    const scalar = scalarType[i];

    switch (scalar.name) {
      case "Boolean":
        scalars[scalar.name] = {
          key: scalar.name,
          tsType: "boolean",
          usageString: `${typeNames.SCALARS}["${scalar.name}"]`,
        };
        break;
      case "Float":
      case "Int":
        scalars[scalar.name] = {
          key: scalar.name,
          tsType: "number",
          usageString: `${typeNames.SCALARS}["${scalar.name}"]`,
        };
        break;
      case "String":
      case "ID":
        scalars[scalar.name] = {
          key: scalar.name,
          tsType: "string",
          usageString: `${typeNames.SCALARS}["${scalar.name}"]`,
        };
        break;
      default:
        scalars[scalar.name] = {
          key: scalar.name,
          tsType: "any",
          usageString: `${typeNames.SCALARS}["${scalar.name}"]`,
        };
        break;
    }
  }

  return scalars;
}

export default generateScalars;
