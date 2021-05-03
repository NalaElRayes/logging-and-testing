export const getColor = ({ type }) => {
  //const {severity} = item;
  // const severity = item.severity;

  switch (type) {
    case "cons:info":
      return "#87CEFA";
    case "cons:warn":
      return "yellow";
    case "cons:error":
      return "#ff000080";
    case "cons:fatal":
      return "#ff000080";
    default:
      return "";
  }
};
