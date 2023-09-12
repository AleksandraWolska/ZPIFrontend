export const jsonString = `
{
  "userapp_builder_config": {
    "core_config": {
      "simultaneousness": true,
      "uniqueness": false,
      "flexibility": false,
      "granularity": false,
      "cyclicity": true,
      "specific_reservation": false
    },

    "userapp_layout_config": {
      "comapany_name": "Tech Corp",
      "welcome_text_line1": "Welcome to our platform!",
      "welcome_text_line2": "Enjoy seamless reservations.",
      "logo_source": "https://example.com/logo.png",
      "logo_show": true,
      "contact_info": {
        "email": "contact@techcorp.com",
        "phone": "+1234567890"
      },
      "filtering": true,
      "parameter_map": [
        {
          "param_name": "Color",
          "param_type": "string",
          "param_is_required": true,
          "param_enable_filtering": true,
          "possible_values": ["Red", "Blue", "Green"],
          "param_show_first_screen": true,
          "param_show_second_screen": false
        }
      ],
      "reservation_prompts": {
        "prompt_message": "Are you sure?"
      }
    },
    "item_layout_config": {
      "item_title": {
        "value": "Another Gadget",
        "show": true,
        "is_long": false
      },
      "item_subtitle": {
        "value": "Special edition",
        "show": true,
        "is_long": false
      },
      "item_description": true,
      "comment_section": true,
      "mark_section": false,
      "mark_first_screen": true,
      "mark_second_screen": true,
      "mark_visibility": true,
      "item_image_show": true
    }
  },
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
            "name": "Material",
            "value": "Plastic"
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
            "value": "Blue"
          },
          {
            "name": "Material",
            "value": "Plastic"
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
