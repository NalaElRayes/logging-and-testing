import React, {useEffect, useState}from 'react'

function FetchAPI (){

const [data, setData] = useState([]);
    
const apiGet = () => {
fetch('./test.json')
  .then(response => response.json())
  .then((json) => {
    console.log(json);
    setData(json);
  });

};

useEffect(() =>{
    apiGet();
  }, []);



    return (
            <div>
                My API <br />

            <button onClick={apiGet}>Fetch API</button>
            <br /> 
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

            <div>
                <ul>
                    {data.map(item => 
                    <li>{item.title}</li>
                    )}
                </ul>
            </div>
            
            

            </div>
        )

}

export default FetchAPI

