export const jsonStringDetailPage = `{
    "data": {
      "storeConfig": {
        "core": {

          "granularity": true,
          "flexibility": false,
          "simultaneous": true,
          "uniqueness": false,
          "periodicity": true,
          "specificReservation": false
        
        },
        "itemCustomAttributes": [
          { "id": 1,
            "name": "Color",
            "dataType": "string",
            "isRequired": true,
            "isFilterable": true,
            "showMainPage": true,
            "showDetailsPage": true,
            "limitValues": true,
            "possibleValues": ["Red", "Blue", "Green"]
          },
          { "id": 2,
            "name": "Price",
            "dataType": "number",
            "isRequired": false,
            "isFilterable": true,
            "showMainPage": true,
            "showDetailsPage": true
          },
          { "id": 3,
            "name": "InStock",
            "dataType": "boolean",
            "isRequired": true,
            "isFilterable": true,
            "showMainPage": true,
            "showDetailsPage": true
          },
          { "id": 4,
            "name": "Brand",
            "dataType": "string",
            "isRequired": false,
            "isFilterable": true,
            "showMainPage": false,
            "showDetailsPage": true
          },
          { "id": 5,
            "name": "Rating",
            "dataType": "number",
            "isRequired": false,
            "isFilterable": false,
            "showMainPage": true,
            "showDetailsPage": true
          }
        ],
        "detailsPage": {
          "showRating": true,
          "showComments": true,
          "showItemDescription": true,
          "showSubitemTitle": true,
          "showSubitemSubtitle": true,
          "reservationConfirmationPrompt": "Thank you for your reservation!",
          "reservationFailurePrompt": "Sorry, reservation failed.",
          "reservationSummaryPrompt": "Review your reservation details before confirming."
        }
      },
      "item": {
        "id": 1,
        "title": "Sample Computer",
        "subtitle": "High-performance computer",
        "description": "This computer is perfect for all your computing needs.",
        "customAttributeList": [
          {
            "id":1,
            "name": "Color",
            "value": "Black"
          },
          {
            "id":2,
            "name": "Price",
            "value": "$999.99"
          },
          {
            "id":3,
            "name": "InStock",
            "value": "true"
          },
          {
            "id":4,
            "name": "Brand",
            "value": "Sample Brand"
          },
          {
            "id":5,
            "name": "Rating",
            "value": "4.7"
          }
        ],
        "subitemList": [
          {
            "id": 1,
            "title": "Accessories Bundle",
            "subtitle": "Includes keyboard and mouse",
            "availableAmount": 2
          },
          {
            "id": 2,
            "title": "Extended Warranty",
            "subtitle": "2-year warranty",
            "availableAmount": 5
          },
          {
            "id": 3,
            "title": "Software Package",
            "subtitle": "Includes productivity software",
            "availableAmount": 3
          },
          {
            "id": 4,
            "title": "Monitor Upgrade",
            "availableAmount": 2
          },
          {
            "id": 5,
            "title": "Additional Storage",
            "subtitle": "1TB HDD upgrade",
            "availableAmount": 1
          }
        ],
        "commentList": [
          {
            "id": 1,
            "userId": 101,
            "nickname": "TechGeek",
            "content": "Great computer, very fast!",
            "datetime": "2023-09-20T10:30:00"
          },
          {
            "id": 2,
            "userId": 102,
            "nickname": "ComputerWhiz",
            "content": "Impressive performance.",
            "datetime": "2023-09-19T15:45:00"
          },
          {
            "id": 3,
            "userId": 103,
            "nickname": "TechSavvy",
            "content": "Excellent build quality.",
            "datetime": "2023-09-18T09:20:00"
          },
          {
            "id": 4,
            "userId": 104,
            "nickname": "GadgetGuru",
            "content": "Good value for money.",
            "datetime": "2023-09-17T14:10:00"
          },
          {
            "id": 5,
            "userId": 105,
            "nickname": "ComputerNerd",
            "content": "Very satisfied with my purchase.",
            "datetime": "2023-09-16T17:55:00"
          }
        ],
        "mark": 4.5,
        "availableAmount": 25,
        "image": "https://example.com/sample-computer.jpg"
      }
    }
  }
  `;
