import { MainPageConfig } from "../../../../routes/userapp/types";

export const dummyMainPageConfig: MainPageConfig = {
  customAttributesSpec: [
    {
      id: "1",
      name: "Lokalizacja",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
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
};

export default dummyMainPageConfig;
