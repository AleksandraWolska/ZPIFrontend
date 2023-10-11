import { ItemInfo } from "../../../../types";

export const dummyItems: ItemInfo[] = [
  {
    item: {
      id: "1",
      active: true,
      title: "Wizyta Dentysta Anna Majewska",
      subtitle: "w lokalizacji Wyszyńskiego 8",
      description: "",
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
      amount: 10,
      image: "https://example.com/gaming-laptop.jpg",
    },
    itemStatus: {
      mark: 4.5,
      availableAmount: 10,
    },
  },
  {
    item: {
      id: "2",
      active: true,
      title: "Wizyta Okulista Kamil Kruk",
      subtitle: "w lokalizacji Zdalnie",
      description: "",
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
      amount: 15,
      image: "https://example.com/macbook-pro.jpg",
    },
    itemStatus: {
      mark: 4.8,
      availableAmount: 15,
    },
  },
  {
    item: {
      id: "3",
      active: true,
      title: "Wizyta Kardiolog Michał Michalski",
      subtitle: "w lokalizacji Nowowiejska 56",
      description: "",
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
      amount: 8,
      image: "https://example.com/desktop-pc.jpg",
    },
    itemStatus: {
      mark: 4.6,
      availableAmount: 8,
    },
  },
  {
    item: {
      id: "4",
      active: true,
      title: "Wizyta Neurolog",
      subtitle: "w lokalizacji Pasaż Grunwaldzki",
      description: "",
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
      amount: 20,
      image: "https://example.com/chromebook.jpg",
    },
    itemStatus: {
      mark: 4,
      availableAmount: 20,
    },
  },
  {
    item: {
      id: "5",
      active: true,
      title: "Wizyta Dentysta Anna Majewska",
      subtitle: "w lokalizacji Zdalnie",
      description: "",
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
      amount: 12,
      image: "https://example.com/workstation-laptop.jpg",
    },
    itemStatus: {
      mark: 4.7,
      availableAmount: 12,
    },
  },
];

export default dummyItems;
