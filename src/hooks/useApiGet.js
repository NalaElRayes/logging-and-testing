import { useEffect, useState } from 'react'


export const useApiGet = () => {

    const [data, setData] = useState([]);
     
    const apiGet = () => {
        fetch('./test.json')
            .then(response => response.json())
            .then((json) => {
                console.log(json)
                setData(json);
            }).catch(
                function(err){
                  console.log(err, ' error')
                });

    };


    useEffect(() => {
        apiGet();
    }, []);

    return data;

}