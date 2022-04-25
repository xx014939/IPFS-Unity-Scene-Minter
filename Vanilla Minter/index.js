/** Connect to Moralis server */
const serverUrl = "";
const appId = "";
Moralis.start({ serverUrl, appId });
let user = Moralis.User.current();

/** Add from here down */
async function login() {
    console.log('starting')
  if (!user) {
    console.log('starting1')
   try {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" })
      initApp();
   } catch(error) {
     console.log(error)
   }
  }
  else{
    console.log('starting2', user.get('ethAddress'))
    Moralis.enableWeb3();
    initApp();
  }
}


async function submit(){

    if (document.querySelector('#input_name').value != "") {
        document.querySelector('.patient').style.display = "block"
    } else {
        alert("Please fill out all form fields")
    }

    let metadata = {
        name: document.querySelector('#input_name').value,
        description: document.querySelector('#input_description').value,
        sceneURL: document.querySelector('#pinata_url').value
    }
    console.log(metadata);
    const jsonFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
    await jsonFile.saveIPFS();

    let metadataHash = jsonFile.hash();
    console.log(jsonFile.ipfs())
    let res = await Moralis.Plugins.rarible.lazyMint({
        chain: 'eth',
        userAddress: user.get('ethAddress'),
        tokenType: 'ERC721',
        tokenUri: 'ipfs://' + metadataHash,
        royaltiesAmount: 5, // 0.05% royalty. Optional
    })


    // The Metadata can also be sent to your own servers by adding in a POST request below


    // Signal to the user minting is complete
    document.querySelector('#success_message').innerHTML = 
        `NFT minted. <a href="https://rarible.com/token/${res.data.result.tokenAddress}:${res.data.result.tokenId}">View NFT`;
    document.querySelector('#success_message').style.display = "block";

    document.querySelector('.patient').style.display = "none"
    document.querySelector('.success').style.display = "block"
}


login();
