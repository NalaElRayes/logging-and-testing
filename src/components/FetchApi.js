import React from 'react'

function FetchAPI (){

const apiGet = () => {
fetch('./test.json')
  .then(response => response.json())
  .then(json => console.log(json))

}



    return (
            <div>
                My API <br/>

                <button onClick={apiGet}>Fetch API</button>
            </div>
        )

}

export default FetchAPI

