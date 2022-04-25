// This is a simple Axios request to post a Unity scene Asset Bundle to your custom Pinata gateway.
// There are many ways to pin a file to Pinata or upload it directly to IPFS, NFT.storage, or other services.
// Please refer to their documentation to figure out the best way for your project.


// Your unique API codes for your gateway
const API_KEY = ''
const API_SECRET = ''

// Pinata API Endpoint
const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`

const response = await axios.post(
  url,
  formData, // Form data is the Asset Bundle file
  {
      maxContentLength: "Infinity",
      headers: {
          "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 
          'pinata_api_key': API_KEY,
          'pinata_secret_api_key': API_SECRET

      }
  }
)