using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerScript : MonoBehaviour
{

    public int moveDistance = 1;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        handleMovement();
    }


    public void handleMovement(){
        //Todo change so that we use the input map instead of hardcoding the keys
        if (Input.GetKeyDown("w"))
        {
            transform.position += new Vector3(0, moveDistance, 0);
        }
        else if (Input.GetKeyDown("s"))
        {
            transform.position += new Vector3(0, -moveDistance, 0);
        }
        else if (Input.GetKeyDown("a"))
        {
            transform.position += new Vector3(-moveDistance, 0, 0);
        }
        else if (Input.GetKeyDown("d"))
        {
            transform.position += new Vector3(moveDistance, 0, 0);
        }
    }


}
