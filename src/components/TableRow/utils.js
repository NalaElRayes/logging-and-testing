export const getColor = ({ type, severity }) => {
  //const {severity} = item;
  // const severity = item.severity;

  if (type === "cons: info") {
    return "#87CEFA";
  }

  switch (severity) {
    case "info":
      return "#87CEFA";
    case "warning":
      return "yellow";
    case "error":
      return "#ff000080";
    case "fatal":
      return "#ff000080";
    default:
      return "";
  }
};
