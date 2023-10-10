function generateScalars(scalarsData: any) {
  let scalarsType = "type Scalars = {\n";

  for (let i = 0; i < scalarsData.length; i++) {
    const scalar = scalarsData[i];

    switch (scalar.name) {
      case "Boolean":
        scalarsType += `${scalar.name}: boolean`;
        break;
      case "Float":
      case "Int":
        scalarsType += `${scalar.name}: number`;
        break;
      case "String":
      case "ID":
        scalarsType += `${scalar.name}: string`;
        break;
      default:
        scalarsType += `${scalar.name}: any`;
        break;
    }

    if (i === scalarsData.length - 1) {
      scalarsType += "\n}";
    } else {
      scalarsType += ",\n";
    }
  }

  return scalarsType;
}

export default generateScalars;
