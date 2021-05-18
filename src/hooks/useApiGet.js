import { useEffect, useState } from "react";

export const useApiGet = () => {
  const [data, setData] = useState([]);

  const apiGet = () => {
    fetch("./1bubbleHistory.json")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log("fetched data: " + data);
      })
      .catch(function (err) {
        console.log(err, " error");
      });
  };

  useEffect(() => {
    apiGet();
  }, []);

  return data;
};
