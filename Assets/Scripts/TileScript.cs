using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TileScript : MonoBehaviour
{
    public enum TileType
    {
        Grass,
        FertilizedSoil,
        Planted,
    }
    public TileType tileType = TileType.Grass;


    public int sunValue = 0;
    public int waterValue = 0;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void fertilizeTile()
    {
        Debug.Log("Fertilizing tile");
        tileType = TileType.FertilizedSoil;
    }

    public void plantOnTile()
    {
        Debug.Log("Planting seed");
        tileType = TileType.Planted;
    }

    public void waterTile()
    {
        Debug.Log("Watering plant");
        waterValue++;
    }

    public void modifySunValue(int value)
    {
        sunValue += value;
    }


}
