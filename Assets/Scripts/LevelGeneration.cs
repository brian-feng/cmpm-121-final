using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LevelGeneration : MonoBehaviour
{
    public int levelWidth;
    public int levelHeight;

    public GameObject[][] tileGrid;

    public GameObject grassTile;


    // Start is called before the first frame update
    void Start()
    {
        tileGrid = new GameObject[levelWidth][];
        for (int i = 0; i < levelWidth; i++)
        {
            tileGrid[i] = new GameObject[levelHeight];
        }
        generateInitialLevel();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void generateInitialLevel(){
        GameObject grassParent = GameObject.Find("Grass");
        for (int i = 0; i < levelWidth; i++)
        {
            for (int j = 0; j < levelHeight; j++)
            {
                GameObject cube = Instantiate(grassTile);
                cube.transform.position = transform.position + new Vector3(i, j, 0);
                cube.transform.parent = grassParent.transform;
                tileGrid[i][j] = cube;
            }
        }
        //Just to test the grid system. We will remove this later
        tileGrid[4][3].GetComponent<TileScript>().fertilizeTile();
    }





}
