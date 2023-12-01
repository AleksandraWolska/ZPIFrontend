import { StoreConfig } from "../../../types";

export const storeConfig: StoreConfig = {
  storeConfigId: "8",
  owner: {
    ownerId: "t8@test.com",
    name: "C8",
    logoSrc: "https://example.com/techrental-logo.png",
    phone: "+1 (123) 456-7890",
    email: "info@techrental.com",
    color: "red",
  },
  core: {
    flexibility: true,
    granularity: false,
    allowOverNight: true,
    simultaneous: false,
    uniqueness: true,
  },
  customAttributesSpec: [
    {
      id: "1",
      name: "Brand",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
      limitValues: true,
      possibleValues: [
        "ASUS",
        "Apple",
        "Samsung",
        "Dell",
        "Custom",
        "Lenovo",
        "Acer",
        "HP",
      ],
    },
    {
      id: "2",
      name: "Processor",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
      limitValues: true,
      possibleValues: [
        "Intel Core i7",
        "Intel Core i5",
        "AMD Ryzen 7",
        "Intel Celeron",
        "Intel Xeon",
        "Qualcomm Snapdragon",
        "AMD Ryzen 9",
        "Intel Pentium",
      ],
    },
    {
      id: "3",
      name: "RAM",
      dataType: "number",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
    },
    {
      id: "4",
      name: "Storage",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
    },
    {
      id: "5",
      name: "Available",
      dataType: "boolean",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
    },
  ],
  mainPage: {
    welcomeTextLine1:
      "Wypozyczalnia dla itemów unikalnych, jedna osoba na raz ",
    welcomeTextLine2: "Sprzęty, samochody, pokoje nauki, stoliki",
    enableFiltering: true,
    showItemTitle: true,
    showItemSubtitle: true,
    showItemImg: true,
    showRating: true,
  },
  detailsPage: {
    showRating: true,
    showComments: true,
    showItemDescription: true,
    showSubItemTitle: true,
    showSubItemSubtitle: true,
    reservationConfirmationPrompt: "Thank you for your reservation!",
    reservationFailurePrompt: "Sorry, reservation failed.",
    reservationSummaryPrompt:
      "Review your reservation details before confirming.",
  },
  authConfig: {
    requiredPersonalData: ["name", "phone", "age"],
    confirmationRequired: true,
  },
};
