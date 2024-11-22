using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HandManager : MonoBehaviour
{
    public List<GameObject> cardPrefabs;

    public Transform handPosition;
    public float handSpread = 7.5f;
    public float cardSpacing = -100f;
    public float verticalSpacing = 100f;
    public List<GameObject> cardsInHand = new List<GameObject>();

    private int handSize = 5;

    // Start is called before the first frame update
    void Start()
    {
        AddCardsToHand();
    }

    // Update is called once per frame
    void Update()
    {
        UpdateHandVisuals();
    }

    public void AddCardsToHand()
    {
        for (int i = 0; i < handSize; i++)
        {
            int rand = Random.Range(0, cardPrefabs.Count);

            GameObject newCard = Instantiate(cardPrefabs[rand], handPosition.position, Quaternion.identity, handPosition);
            cardsInHand.Add(newCard);
            UpdateHandVisuals();
        }
    }

    void UpdateHandVisuals()
    {
        int cardCount = cardsInHand.Count;
        for(int i = 0; i < cardCount; i++)
        {
            float rotationAngle = (handSpread * (i - (cardCount - 1) / 2f));
            cardsInHand[i].transform.localRotation = Quaternion.Euler(0f, 0f, rotationAngle);

            float horizontalOffset = (cardSpacing * (i - (cardCount - 1) / 2f));
            float normalizedPosition = (2f * i / (cardCount - 1) - 1f);
            float verticalOffset = (verticalSpacing * (1 - normalizedPosition * normalizedPosition));
            cardsInHand[i].transform.localPosition = new Vector3(horizontalOffset, verticalOffset, 0f);
        }
    }
}
