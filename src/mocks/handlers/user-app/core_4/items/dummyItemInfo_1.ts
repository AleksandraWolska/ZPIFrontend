import { ItemInfo } from "../../../../../types";

const dummyItemInfo: ItemInfo = {
  item: {
    id: "1",
    active: true,
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
    amount: 1,
    image: "https://example.com/sample-computer.jpg",
  },
  itemStatus: {
    availableAmount: 1,
    mark: 4.5,
  },
  subItemsInfo: [
    {
      subItem: {
        id: "1",
        title: "Rząd 1 Miejsce 1",
        amount: 1,
        subtitle: "subtitle",
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 1,
      },
    },
    {
      subItem: {
        id: "2",
        title: "Rząd 1 Miejsce 2",
        amount: 1,
        subtitle: "subtitle",
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 1,
      },
    },
    {
      subItem: {
        id: "3",
        title: "Rząd 1 Miejsce 3",
        amount: 1,
        subtitle: "subtitle",
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 1,
      },
    },
    {
      subItem: {
        id: "4",
        title: "Rząd 1 Miejsce 4",
        amount: 1,
        subtitle: "subtitle",
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 1,
      },
    },
    {
      subItem: {
        id: "5",
        title: "Rząd 1 Miejsce 5",
        amount: 1,
        subtitle: "subtitle",
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 1,
      },
    },
    {
      subItem: {
        id: "6",
        title: "Rząd 2 Miejsce 1",
        amount: 1,
        subtitle: "subtitle",
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 1,
      },
    },
    {
      subItem: {
        id: "7",
        title: "Rząd 2 Miejsce 2",
        amount: 1,
        subtitle: "subtitle",
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 1,
      },
    },
    {
      subItem: {
        id: "8",
        title: "Rząd 2 Miejsce 3",
        amount: 1,
        subtitle: "subtitle",
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 1,
      },
    },
    {
      subItem: {
        id: "9",
        title: "Rząd 2 Miejsce 4",
        amount: 1,
        subtitle: "subtitle",
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 1,
      },
    },
    {
      subItem: {
        id: "10",
        title: "Rząd 2 Miejsce 5",
        amount: 1,
        subtitle: "subtitle",
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 1,
      },
    },
  ],
};
export default dummyItemInfo;
