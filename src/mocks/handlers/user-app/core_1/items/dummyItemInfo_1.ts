import { Item } from "../../../../../types";

const item: Item = {
  id: "1",
  attributes: {
    title: "Wizyta Dentysta Anna Majewska",
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
    image: "https://api.slingacademy.com/public/sample-photos/8.jpeg",
  },
  initialSettings: {
    amount: 1,
  },
  status: {
    active: true,
    availableAmount: 1,
    mark: 4.5,
  },
};
export default item;
