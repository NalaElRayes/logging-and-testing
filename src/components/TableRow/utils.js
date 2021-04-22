

export const getColor = ({ type }) => {
  //const {severity} = item; 
  // const severity = item.severity;

  switch (type) {
    case "cons:info":
      return "blue"
    case "cons:warn":
      return "yellow"
    case "cons:error":
      return "red"
    case "cons:fatal":
      return "red"
    default:
      return ""
  }
}