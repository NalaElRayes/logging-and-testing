import { useEffect, useState } from 'react'


export const useApiGet = () => {

    const [data, setData] = useState([]);

    const apiGet = () => {
        fetch('./test.json')
            .then(response => response.json())
            .then((json) => {
                console.log(json)
                setData(json);
            });

    };


    useEffect(() => {
        apiGet();
    }, []);

    return data;

}