import { StoreConfig } from "../../../types";

export const storeConfig: StoreConfig = {
  storeConfigId: "4",
  owner: {
    ownerId: "t4@test.com",
    name: "C4",
    logoSrc: "https://example.com/techrental-logo.png",
    phone: "+1 (123) 456-7890",
    email: "info@techrental.com",
    color: "green",
  },
  core: {
    flexibility: false,
    simultaneous: true,
    specificReservation: true,
  },
  customAttributesSpec: [
    {
      id: "1",
      name: "Lokalizacja",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
      limitValues: true,
      possibleValues: [
        "Zdalnie",
        "Wyszyńskiego 8",
        "Pasaż Grunwaldzki",
        "Nowowiejska 56",
      ],
    },
    {
      id: "2",
      name: "Typ lekarza",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
      limitValues: true,
      possibleValues: ["Dentysta", "Kardiolog", "Neurolog", "Okulista"],
    },
    {
      id: "3",
      name: "Staż pracy",
      dataType: "number",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
    },
    {
      id: "4",
      name: "NFZ",
      dataType: "boolean",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
    },
    {
      id: "5",
      name: "Nazwisko",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
      limitValues: true,
      possibleValues: ["Anna Majewska", "Kamil Kruk", "Michał Michalski"],
    },
    {
      id: "6",
      name: "Data",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
    },
  ],
  mainPage: {
    welcomeTextLine1:
      "Wydarzenia dla wielu osób, niecykliczne, rezerwacja miejsc",
    welcomeTextLine2: "Rent the latest computers and gadgets.",
    enableFiltering: true,
    showItemTitle: true,
    showItemSubtitle: true,
    showItemImg: true,
    showRating: true,
  },
  detailsPage: {
    showRating: false,
    showComments: false,
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
    isPrivate: false,
  },
};
