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
      title: "Wieczór z Anna Majewska",
      date: "2023-10-01T12:00:00Z",
      subtitle: "01.10.2023",
      availableAmount: 1,
    },
    {
      id: "2",
      title: "Wieczór z Anna Majewska",
      date: "2023-10-02T12:00:00Z",
      subtitle: "02.10.2023",
      availableAmount: 2,
    },
    {
      id: "3",
      title: "Wieczór z Anna Majewska",
      date: "2023-10-03T12:00:00Z",
      subtitle: "03.10.2023",
      availableAmount: 3,
    },
    {
      id: "4",
      title: "Wieczór z Anna Majewska",
      date: "2023-10-04T12:00:00Z",
      subtitle: "04.10.2023",
      availableAmount: 4,
    },
    {
      id: "5",
      title: "Wieczór z Anna Majewska",
      date: "2023-10-05T12:00:00Z",
      subtitle: "05.10.2023",
      availableAmount: 5,
    },
    {
      id: "6",
      title: "Wieczór z Anna Majewska",
      date: "2023-10-06T12:00:00Z",
      subtitle: "06.10.2023",
      availableAmount: 6,
    },
  ],
  mark: 4.5,
  image: "https://example.com/sample-computer.jpg",
};

export default dummyItem;
