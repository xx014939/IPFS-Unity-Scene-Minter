# IPFS-Unity-Scene-Minter
Mint Unity scenes as NFT's using IPFS, Pinata and Moralis. This scene minter is what we are currently using at Your Meta World. The basic idea is to

1. Create an Asst Bundle from our Unity scene
2. Pin an a Unity scene Asset Bundle to Pinata
3. Append this Pinata URL to your NFT's Metadata
4. Lazy mint this NFT on Rarible (using the Moralis Rarible plugin)
5. Pull this NFT into your Unity project at runtime dynamically

You can modify this as much or as little as you'd like to. For example, you don't need to pin your Asset Bundle to Pinata, you could upload it to NFT Storage or directly to IPFS. You can also change the NFT minter to not be a lazy minter and actually mint an NFT on the Ethereum Main Net.

## Create an Asset Bundle

Go to your Unity Package Manager, and install the "AssetBundle Browser"

<img src="/images/ab-package.PNG"/>

After installation open up the browser, and drag and drop your Unity scene into it

<img src="/images/ab-package2.PNG"/>

After building your Asset Bundle navigate to the output directory and retrieve the file which has exactly the same name as your Unity scene. This will be the file that we will pin to Pinata.

<img src="/images/ab-package3.PNG"/>

## Pinning

The next step is to get our Asset Bundle on the IPFS network. We do this via a simple React app which can be viewed here --> https://silly-semifreddo-54d955.netlify.app/

We have included the our Axios code snippet inside of the "Pinata Pinner" folder of this Repo. You can also view the official Pinata documentation which is very similar here --> https://docs.pinata.cloud/

As mentioned previously, you do not need to pin your Asset Bundle to Pinata specifically. Any IPFS/Filecoin solution will do fine.

## Create Metadata and Mint

Our "Vanilla Minter" folder contains all of the code files you will need to lazy mint your Asset Bundle as an NFT on Rarible. The async function "submit()" handles the Metadata creation and the publishing of the NFT on Rarible. This implementation is a modification of the Moralis Lazy Minter, and will require a Moralis server (free). More info can be found here --> https://moralis.io/how-to-lazy-mint-nfts/

We also send a POST request to our servers after the submit() function is complete, so we can store the Asset Bundles CID on our own servers as well and link this to the users wallet address. You can do this also, but the implementation will be highly dependant on your apps backend structure, so we have left this blank for you.

## Retrieve NFT inside of Unity at runtime

The only thing we need inside of Unity in order to load this NFT scene is the Asset Bundle URL we pinned in step 2. It's your choice how you'd like to pull this into your Unity project, Your Meta World makes a web request to our backend server and then sifts through our JSON for these URL's (example here --> https://github.com/xx014939/unity-code-scripts/blob/main/2DNFTLoader.cs), but you could also pass the URL in manually or via some type of UI inside of your Unity project.

After you have the URL, we have written a simple script (with two example URL's that you're welcome to use) inside of "Unity Script" folder. This script is intended to be integrated with a UI scene, so the user can switch scenes by clicking a button but can easily be adapted to another use case.

The most important part of the script is the "loadScenes()" function, which performs a UnityWebRequest in order to retrieve the Asset Bundle from the IPFS server. This loads in the background of your application, which saves time for when you actually do want to switch scenes.

When the user clicks the button initialised on line 22, the "consoleLog()" function will be called. This will log a message confirming the button has been pressed and switch scenes. We switch scenes using Unity's normal SceneManager. As the Asset Bundle has already been loaded in the background, we can treat it as a scene that is already inside of the project.

One important thing to note here is that the first argument of "LoadScene()" must be the name of the scene you're trying to load. So it's important to either always make sure that your Asset Bundles are of scenes with a particular name, or make sure that you first retrieve this name from one of your servers before calling the SceneManager.
