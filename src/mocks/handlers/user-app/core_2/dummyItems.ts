import { Item } from "../../../../types";

export const dummyItems: Item[] = [
  {
    id: "1",
    title: "Wizyta Dentysta Anna Majewska",
    subtitle: "w lokalizacji Wyszyńskiego 8",
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
    ],
    mark: 4.5,
    availableAmount: 10,
    image: "https://example.com/gaming-laptop.jpg",
  },
  {
    id: "2",
    title: "Wizyta Okulista Kamil Kruk",
    subtitle: "w lokalizacji Zdalnie",
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
    ],
    mark: 4.8,
    availableAmount: 15,
    image: "https://example.com/macbook-pro.jpg",
  },
  {
    id: "3",
    title: "Wizyta Kardiolog Michał Michalski",
    subtitle: "w lokalizacji Nowowiejska 56",
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
    ],
    mark: 4.6,
    availableAmount: 8,
    image: "https://example.com/desktop-pc.jpg",
  },
  {
    id: "4",
    title: "Wizyta Neurolog",
    subtitle: "w lokalizacji Pasaż Grunwaldzki",
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
    ],
    mark: 4,
    availableAmount: 20,
    image: "https://example.com/chromebook.jpg",
  },
  {
    id: "5",
    title: "Wizyta Dentysta Anna Majewska",
    subtitle: "w lokalizacji Zdalnie",
    customAttributeList: [
      {
        id: "1",
        name: "Lokalizacja",
        value: "Zdalnie",
      },
      {
        id: "2",
        name: "Typ lekarza",
        value: "Dentysta",
      },
      {
        id: "3",
        name: "Staż pracy",
        value: 7,
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
    ],
    mark: 4.7,
    availableAmount: 12,
    image: "https://example.com/workstation-laptop.jpg",
  },
];

export default dummyItems;
