// This is a simple React based Axios request to post a Unity scene Asset Bundle to your custom Pinata gateway.
// There are many ways to pin a file to Pinata or upload it directly to IPFS, NFT.storage, or other services.
// Please refer to their documentation to figure out the best way for your project.


import { useState } from 'react';
import FormData from 'form-data';
import axios from 'axios';

function App() {

  const [file, setFile] = useState()
  const [myipfsHash, setIPFSHASH] = useState('')
 

  const handleFile=async (fileToHandle) =>{

    

    console.log('starting')

    // initialize the form data
    const formData = new FormData()

    // append the file form data to 
    formData.append("file", fileToHandle)


    // Get these from your Pinata account
    const API_KEY = ''
    const API_SECRET = ''

    // Pinata API endpoint
    const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`

    const response = await axios.post(
      url,
      formData, // This should be the asset bundle. In our case we are retrieving from a file upload
      {
          maxContentLength: "Infinity",
          headers: {
              "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 
              'pinata_api_key': API_KEY,
              'pinata_secret_api_key': API_SECRET

          }
      }
  )

  console.log(response) // CID will be inside of response

  }
  

  return (
    <div className="App">
      <input type="file" onChange={(event)=>setFile(event.target.files[0])}/>
      <button onClick={()=>handleFile(file)}>Pin</button>
    </div>
  );
}

export default App;
