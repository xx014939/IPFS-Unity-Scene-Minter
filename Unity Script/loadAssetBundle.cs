using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;

public class loadAssetBundle : MonoBehaviour
{
    public Button buttonOne;
    private AssetBundle myLoadedAssetBundle;
    private string[] scenePaths;

    // Empty Scene Asset bundle URL One --> https://pin.ski/3rwg7sT
    // Empty Scene Asset bundle URL Two --> https://yourmetaworld.mypinata.cloud/ipfs/QmW6kxYYhT4vLwKTeHkBvjAkgmvxvyoACQpdjwmy5Fx1bs

    void Start()
    {

        StartCoroutine(loadScenes("https://yourmetaworld.mypinata.cloud/ipfs/QmW6kxYYhT4vLwKTeHkBvjAkgmvxvyoACQpdjwmy5Fx1bs"));

        Button btn = buttonOne.GetComponent<Button>();
        btn.onClick.AddListener(consoleLog);
    }

    void consoleLog() {

        Debug.Log("Button has been clicked!");

        SceneManager.LoadScene("first_scene", LoadSceneMode.Single);
    }

    private IEnumerator loadScenes(string uri)
    {

        Debug.Log("Coroutine has started" + uri);

        UnityWebRequest www = UnityWebRequestAssetBundle.GetAssetBundle(uri);
        yield return www.SendWebRequest();

        if (www.isNetworkError)
        {
            Debug.Log(www.error);
        }
        else
        {
            AssetBundle bundle = DownloadHandlerAssetBundle.GetContent(www);
            Debug.Log("Success!");
        }
    }
}


