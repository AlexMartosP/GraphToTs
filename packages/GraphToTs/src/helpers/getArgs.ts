import { Args, IntrospectionArgs } from "../types";
import getType from "./getType";

function getArgs(argTypes: IntrospectionArgs[]) {
  let args: Args[] = [];

  for (let i = 0; i < argTypes.length; i++) {
    const arg = argTypes[i];

    const argType = getType(arg.type);

    args.push({
      key: arg.name,
      ...argType,
    });
  }

  return args;
}

export default getArgs;
