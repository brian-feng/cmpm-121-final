using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LevelGeneration : MonoBehaviour
{
    public int levelWidth;
    public int levelHeight;

    public GameObject grassTile;


    // Start is called before the first frame update
    void Start()
    {
        generateInitialLevel();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void generateInitialLevel(){
        GameObject grassParent = GameObject.Find("Grass");
        for (int i = levelWidth / 2 * -1; i < levelWidth / 2; i++)
        {
            for (int j = levelHeight / 2 * -1; j < levelHeight / 2; j++)
            {
                GameObject cube = Instantiate(grassTile);
                cube.transform.position = new Vector3(i, j, 0);
                cube.transform.parent = grassParent.transform;
            }
        }
    }





}
