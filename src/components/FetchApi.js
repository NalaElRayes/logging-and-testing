import React, {useEffect, useState}from 'react'

function FetchAPI (){

const [data, setData] = useState([]);
const [search, setSearch] = useState(""); 
    
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
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

            <div>
                <h4>lets the first user write a message in the first conversation</h4>
                 
                 {/*Search field*/}
                 <input type ="text" placeholder="search here" onChange= {e=>{
                     setSearch(e.target.value)
                 }}>
                 </input>

                
                    {data
                    .filter((item)=>{
                        if (search == ""){
                            return item;
                        }else if (item.message.toLowerCase().includes(search.toLowerCase())){
                            return item;
                        }
                    })
                    .map((item =>
                    <p>Type: {item.type} Severity: {item.severity} Message: {item.message}</p>
                        
                        
                    ))}
                
            </div>
         </div> 
        );

}

export default FetchAPI

