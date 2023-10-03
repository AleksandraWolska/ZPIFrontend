import { Item } from "../../../../../types";

const dummyItem: Item = {
  id: "1",
  title: "Cotygodniowe wieczory z kulturą: Anna Majewska",
  subtitle: "w lokalizacji Wyszyńskiego 8",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.",
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
  subItemList: [
    {
      id: "1",
      title: "Rząd 1 Miejsce 1",
      availableAmount: 1,
    },

    {
      id: "2",
      title: "Rząd 1 Miejsce 2",
      availableAmount: 1,
    },

    {
      id: "3",
      title: "Rząd 1 Miejsce 3",
      availableAmount: 1,
    },

    {
      id: "4",
      title: "Rząd 1 Miejsce 4",
      availableAmount: 1,
    },

    {
      id: "5",
      title: "Rząd 1 Miejsce 5",
      availableAmount: 1,
    },

    {
      id: "6",
      title: "Rząd 2 Miejsce 1",
      availableAmount: 1,
    },

    {
      id: "7",
      title: "Rząd 2 Miejsce 2",
      availableAmount: 1,
    },

    {
      id: "8",
      title: "Rząd 2 Miejsce 3",
      availableAmount: 1,
    },

    {
      id: "9",
      title: "Rząd 2 Miejsce 4",
      availableAmount: 1,
    },

    {
      id: "10",
      title: "Rząd 2 Miejsce 5",
      availableAmount: 1,
    },
  ],
  mark: 4.5,
  image: "https://example.com/sample-computer.jpg",
};

export default dummyItem;
