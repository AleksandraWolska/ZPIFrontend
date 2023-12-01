import { Item } from "../../../types";

export const items: Item[] = [
  {
    id: "1",
    attributes: {
      title: "Spotkanie z kulturą: Anna Majewska",
      subtitle: "01.10.2023 w lokalizacji Wyszyńskiego 8",
      description: "",
      image: "https://api.slingacademy.com/public/sample-photos/2.jpeg",
    },
    customAttributeList: [
      {
        id: "1",
        name: "Lokalizacja",
        value: "Wyszyńskiego 8",
      },
      {
        id: "2",
        name: "Typ lekarza",
        value: "Dentysta",
      },
      {
        id: "3",
        name: "Staż pracy",
        value: 5,
      },
      {
        id: "4",
        name: "NFZ",
        value: true,
      },
      {
        id: "5",
        name: "Nazwisko",
        value: "Anna Majewska",
      },
      {
        id: "6",
        name: "Data",
        value: "2024-02-01T12:00:00Z",
      },
    ],
    amount: 10,
    schedule: {
      startDateTime: "2024-02-01T12:00:00Z",
    },
    active: true,
    mark: 4.5,
    availableAmount: 10,
  },
  {
    id: "2",
    attributes: {
      title: "Spotkanie z kulturą: Kamil Kruk",
      subtitle: "02.10.2023 w lokalizacji Zdalnie",
      description: "",
      image: "https://api.slingacademy.com/public/sample-photos/5.jpeg",
    },
    customAttributeList: [
      {
        id: "1",
        name: "Lokalizacja",
        value: "Zdalnie",
      },
      {
        id: "2",
        name: "Typ lekarza",
        value: "Okulista",
      },
      {
        id: "3",
        name: "Staż pracy",
        value: 10,
      },
      {
        id: "4",
        name: "NFZ",
        value: false,
      },
      {
        id: "5",
        name: "Nazwisko",
        value: "Kamil Kruk",
      },
      {
        id: "6",
        name: "Data",
        value: "2024-02-02T12:00:00Z",
      },
    ],
    amount: 5,
    schedule: {
      startDateTime: "2022-02-02T12:00:00Z",
    },
    active: true,
    mark: 4.8,
    availableAmount: 5,
  },
  {
    id: "3",
    attributes: {
      title: "Spotkanie z kulturą: Michał Michalski",
      subtitle: "03.10.2023 w lokalizacji Nowowiejska 56",
      description: "",
      image: "https://api.slingacademy.com/public/sample-photos/3.jpeg",
    },
    customAttributeList: [
      {
        id: "1",
        name: "Lokalizacja",
        value: "Nowowiejska 56",
      },
      {
        id: "2",
        name: "Typ lekarza",
        value: "Kardiolog",
      },
      {
        id: "3",
        name: "Staż pracy",
        value: 15,
      },
      {
        id: "4",
        name: "NFZ",
        value: true,
      },
      {
        id: "5",
        name: "Nazwisko",
        value: "Michał Michalski",
      },
      {
        id: "6",
        name: "Data",
        value: "2024-02-03T12:00:00Z",
      },
    ],
    amount: 20,
    schedule: {
      startDateTime: "2024-02-03T12:00:00Z",
    },
    active: true,
    mark: 4.6,
    availableAmount: 20,
  },
  {
    id: "4",
    attributes: {
      title: "Spotkanie z kulturą: ",
      subtitle: "04.10.2023 w lokalizacji Pasaż Grunwaldzki",
      description: "",
      image: "https://api.slingacademy.com/public/sample-photos/4.jpeg",
    },
    customAttributeList: [
      {
        id: "1",
        name: "Lokalizacja",
        value: "Pasaż Grunwaldzki",
      },
      {
        id: "2",
        name: "Typ lekarza",
        value: "Neurolog",
      },
      {
        id: "3",
        name: "Staż pracy",
        value: 3,
      },
      {
        id: "4",
        name: "NFZ",
        value: true,
      },
      {
        id: "5",
        name: "Nazwisko",
        value: "Kamil Kruk",
      },
      {
        id: "6",
        name: "Data",
        value: "2024-02-04T12:00:00Z",
      },
    ],
    amount: 20,
    schedule: {
      startDateTime: "2024-02-04T12:00:00Z",
    },
    active: true,
    mark: 4,
    availableAmount: 20,
  },
];
