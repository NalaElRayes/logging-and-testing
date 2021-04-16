import React, {useEffect, useState}from 'react'

function FetchAPI (){

const [data, setData] = useState([]);
    
const apiGet = () => {
fetch('./data.json')
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
            <button onClick={apiGet}>Fetch API</button>
            <br /> 
            <pre>{JSON.stringify(data, null, 2)}</pre>

            {/* <div>
                <ul>
                    {data.map((item =>
                        <li><h4>Type:</h4> {item.type} <h4>Message:</h4> {item.message} <h4>Severity:</h4> {item.severity}</li>
                        
                    ))}
                </ul>
            </div> */}
         </div> 
        );

}

export default FetchAPI

