export const jsonString = `
{
  "userapp_builder_config": {
    "coreConfig": {
      "flexibility": true,
      "simultaneous": true,
      "uniqueness": false,
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
    "item": {
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
        "commentList": [
          {
            "id": "1",
            "userId": "user001",
            "nickname": "JohnDoe",
            "content": "This is a sample comment.",
            "datetime": "2023-09-06T12:34:56Z"
          },
          {
            "id": "2",
            "userId": "user002",
            "nickname": "JaneDoe",
            "content": "I agree with the above!",
            "datetime": "2023-09-03T13:14:22Z"
          },
          {
            "id": "3",
            "userId": "user003",
            "nickname": "Charlie",
            "content": "I have a different perspective.",
            "datetime": "2023-09-03T13:14:22Z"
          }
        ],
        "subitemList": [
          {
            "id": 1,
            "title": "Sub Gadget A",
            "subtitle": "Type A",
            "availableAmount": 2
          },
          {
            "id": 2,
            "title": "Sub Gadget B",
            "subtitle": "Type B",
            "availableAmount": 3
          }
        ],
        "mark": 4.5,
        "availableAmount": 4
      }
    }
}`;
