import { ItemInfo } from "../../../../../types";

const dummyItemInfo: ItemInfo = {
  item: {
    id: "1",
    active: true,
    title: "Wizyta Dentysta Anna Majewska",
    subtitle: "w lokalizacji Wyszyńskiego 8",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.",
    subItemInfoList: [
      {
        subItem: {
          id: "1",
          title: "Wizyta Anna Majewska",
          subtitle: "01.10.2023",
          amount: 1,
        },
        subItemStatus: {
          schedule: "2023-10-01T12:00:00Z",
          availableAmount: 1,
        },
      },
      {
        subItem: {
          id: "2",
          title: "Wizyta Anna Majewska",
          subtitle: "02.10.2023",
          amount: 2,
        },
        subItemStatus: {
          schedule: "2023-10-02T12:00:00Z",
          availableAmount: 2,
        },
      },
      {
        subItem: {
          id: "3",
          title: "Wizyta Anna Majewska",
          subtitle: "03.10.2023",
          amount: 3,
        },
        subItemStatus: {
          schedule: "2023-10-03T12:00:00Z",
          availableAmount: 3,
        },
      },
      {
        subItem: {
          id: "4",
          title: "Wizyta Anna Majewska",
          subtitle: "04.10.2023",
          amount: 4,
        },
        subItemStatus: {
          schedule: "2023-10-04T12:00:00Z",
          availableAmount: 4,
        },
      },
      {
        subItem: {
          id: "5",
          title: "Wizyta Anna Majewska",
          subtitle: "05.10.2023",
          amount: 5,
        },
        subItemStatus: {
          schedule: "2023-10-05T12:00:00Z",
          availableAmount: 5,
        },
      },
      {
        subItem: {
          id: "6",
          title: "Wizyta Anna Majewska",
          subtitle: "06.10.2023",
          amount: 6,
        },
        subItemStatus: {
          schedule: "2023-10-06T12:00:00Z",
          availableAmount: 6,
        },
      },
    ],
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
};
export default dummyItemInfo;
