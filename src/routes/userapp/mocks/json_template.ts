export const jsonString = `
{
  "userapp_builder_config": {
    "coreConfig": {
      "flexibility": true,
      "simultaneous": true,
      "uniqueness": true,
      "periodicity": false,
      "specificReservation": false

    },
    "layoutConfig": {
      "companyName": "Tech Corp",
      "welcomeTextLine1": "Welcome to our platform!",
      "welcomeTextLine2": "Enjoy seamless reservations.",
      "logoSource": "https://example.com/logo.png",
      "showLogo": true,
      "email": "contact@techcorp.com",
      "phoneNumber": "+1234567890",
      "enableFiltering": true,
      "enablePossibleValues": true,
      "parameterMap": [
        {
          "name": "Color",
          "type": "string",
          "isRequired": true,
          "isFilterable": true,
          "possibleValues": ["Red", "Blue", "Green"],
          "showFirstScreen": true,
          "showSecondScreen": true
        },
        {
          "name": "kidsFriendly",
          "type": "boolean",
          "isRequired": true,
          "isFilterable": true,
          "showFirstScreen": true,
          "showSecondScreen": true
        },
        {
          "name": "width",
          "type": "number",
          "isRequired": true,
          "isFilterable": true,
          "showFirstScreen": true,
          "showSecondScreen": true,
          "units": "cm"
        }
      ],
      "reervationPrompts": {
        "prompt_message": "Are you sure?"
      }
    },
    "itemConfig": {
      "itemTitle": true,
      "itemSubtitle": true,
      "subItemTitle": true, 
      "subitemSubtitle": true,
   
      "showItemDescription": true,
      "commentSection": true,
      "enableRating": false,
      "showRatingFirstScreen": true,
      "showRatingSecondScreen": true,
      "showItemImageFirstScreen": true,
      "showItemImageSecondScreen": false 
    }
  }
  ,
  "fetched_data": {
    "items": [
      {
        "id": 1,
        "title": "Main Gadget",
        "subtitle": "Latest Edition",
        "description": "This is the latest edition of our popular Main Gadget.",
        "parameters": [
          {
            "name": "Color",
            "value": "Red"
          },
          {
            "name": "kidsFriendly",
            "value": false
          },
          {
            "name": "width",
            "value": 45
          }
        ],
        "mark": 4.5,
        "availableAmount": 4
      },
      {
        "id": 2,
        "title": "Secondary Gadget",
        "subtitle": "Previous Edition",
        "description": "The previous edition of our Secondary Gadget, still very much in demand.",
        "parameters": [
          {
            "name": "Color",
            "value": "Red"
          },
          {
            "name": "kidsFriendly",
            "value": true
          },
          {
            "name": "width",
            "value": 45
          }
        ],
        "mark": 4.0,
        "availableAmount": 2
      }
    ]
  }
}`;
