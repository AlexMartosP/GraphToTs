type PrintTypeParams = {
  name: string;
  fieldsPrinter: () => string[];
  extendedTypes?: string[];
};

function printType({
  name,
  fieldsPrinter,
  extendedTypes = [],
}: PrintTypeParams) {
  let output = `export type ${name} = {\n`;

  const fields = fieldsPrinter();

  output += fields.join(", \n");

  if (extendedTypes.length > 0) {
    output += `\n} & ${extendedTypes.join(" & ")};\n`;
  } else {
    output += "\n};\n";
  }

  return output;
}

export default printType;
