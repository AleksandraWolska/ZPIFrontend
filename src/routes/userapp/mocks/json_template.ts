export const jsonString = `
{
  "userapp_builder_config": {
    "coreConfig": {
      "simultaneous": true,
      "uniqueness": false,
      "flexibility": false,
      "granularity": false,
      "periodicity": true,
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
        "comment_list": [
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
        "subitem_list": [
          {
            "id": 1,
            "title": "Sub Gadget A",
            "subtitle": "Type A",
            "available_amount": 2
          },
          {
            "id": 2,
            "title": "Sub Gadget B",
            "subtitle": "Type B",
            "available_amount": 3
          }
        ],
        "free_amount": 20,
        "mark": 4.5,
        "available_amount": 4
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
        "comment_list": [
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
        "subitem_list": [
          {
            "id": 3,
            "title": "Sub Gadget C",
            "subtitle": "Type C",
            "available_amount": 4
          }
        ],
        "free_amount": 15,
        "mark": 4.0,
        "available_amount": 2
      }
    ]
  }
}`;
