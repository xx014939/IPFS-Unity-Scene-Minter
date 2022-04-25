# IPFS-Unity-Scene-Minter
Mint Unity scenes as NFT's using IPFS, Pinata and Moralis. This scene minter is what we are currently using at Your Meta World. The basic idea is to

1. Create an Asst Bundle from our Unity scene
2. Pin an a Unity scene Asset Bundle to Pinata
3. Append this Pinata URL to your NFT's Metadata
4. Lazy mint this NFT on Rarible (using the Moralis Rarible plugin)

You can modify this as much or as little as you'd like to. For example, you don't need to pin your Asset Bundle to Pinata, you could upload it to NFT Storage or directly to IPFS. You can also change the NFT minter to not be a lazy minter and actually mint an NFT on the Ethereum Main Net.

## Create an Asset Bundle

Go to your Unity Package Manager, and install the "Bundle Browser"

After installation open up the browser, and drag and drop your Unity scene into it

After building your Asset Bundle navigate to the output directory and retrieve the file which has exactly the same name as your Unity scene. This will be the file that we will pin to Pinata.

## Pinning

The next step is to get our Asset Bundle on the IPFS network. We do this via a simple React app which can be viewed here --> https://silly-semifreddo-54d955.netlify.app/

We have included the our Axios code snippet inside of the "Pinata Pinner" folder of this Repo. You can also view the official Pinata documentation which is very similar here --> https://docs.pinata.cloud/

As mentioned previously, you do not need to pin your Asset Bundle to Pinata specifically. Any IPFS/Filecoin solution will do fine.

## Create Metadata and Mint

Our "Vanilla Minter" folder contains all of the code files you will need to lazy mint your Asset Bundle as an NFT on Rarible. The async function "submit()" handles the Metadata creation and the publishing of the NFT on Rarible.

We also send a POST request to our servers after the submit() function is complete, so we can store the Asset Bundles CID on our own servers as well and link this to the users wallet address. You can do this also, but the implementation will be highly dependant on your apps backend structure, so we have left this blank for you.
