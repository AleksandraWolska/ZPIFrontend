import { CustomAttributeSpec } from "../../../../types";

export const dummyCustomAttributeSpec: CustomAttributeSpec[] = [
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
];
