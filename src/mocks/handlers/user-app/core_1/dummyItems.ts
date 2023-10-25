import { Item } from "../../../../types";

export const items: Item[] = [
  {
    id: "1",
    attributes: {
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
      image: "https://api.slingacademy.com/public/sample-photos/2.jpeg",
    },
    initialSettings: {
      amount: 10,
    },
    status: {
      active: true,
      mark: 4.5,
      availableAmount: 10,
    },
  },
  {
    id: "2",
    attributes: {
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
      image: "https://api.slingacademy.com/public/sample-photos/5.jpeg",
    },
    initialSettings: {
      amount: 15,
    },
    status: {
      active: true,
      mark: 4.8,
      availableAmount: 15,
    },
  },
  {
    id: "3",
    attributes: {
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
      image: "https://api.slingacademy.com/public/sample-photos/3.jpeg",
    },
    initialSettings: {
      amount: 8,
    },
    status: {
      active: true,
      mark: 4.6,
      availableAmount: 8,
    },
  },
  {
    id: "4",
    attributes: {
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
      image: "https://api.slingacademy.com/public/sample-photos/4.jpeg",
    },
    initialSettings: {
      amount: 20,
    },
    status: {
      active: true,
      mark: 4,
      availableAmount: 20,
    },
  },
  {
    id: "5",
    attributes: {
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
      image: "https://api.slingacademy.com/public/sample-photos/5.jpeg",
    },
    initialSettings: {
      amount: 12,
    },
    status: {
      active: true,
      mark: 4.7,
      availableAmount: 12,
    },
  },
];

export default items;
