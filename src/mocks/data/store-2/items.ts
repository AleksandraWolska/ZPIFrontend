import { Item } from "../../../types";

export const items: Item[] = [
  {
    id: "1",
    ratingCount: 3,
    attributes: {
      title: "Wizyta Dentysta Anna Majewska",
      subtitle: "w lokalizacji Wyszyńskiego 8",
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
    ],
    subItems: [
      {
        id: "1",
        title: "Wizyta Anna Majewska",
        subtitle: "01.02.2024",
        schedule: {
          startDateTime: "2024-02-01T09:00:00.000Z",
          endDateTime: "2024-02-01T10:00:00.000Z",
        },
        availableAmount: 0,
      },
      {
        id: "2",
        title: "Wizyta Anna Majewska",
        subtitle: "02.02.2024",
        schedule: {
          startDateTime: "2024-02-02T09:00:00.000Z",
          endDateTime: "2024-02-02T10:00:00.000Z",
        },
        availableAmount: 1,
      },
      {
        id: "3",
        title: "Wizyta Anna Majewska",
        subtitle: "03.02.2024",
        schedule: {
          startDateTime: "2022-02-03T09:00:00.000Z",
          endDateTime: "2022-02-03T10:00:00.000Z",
        },
        availableAmount: 1,
      },
      {
        id: "4",
        title: "Wizyta Anna Majewska",
        subtitle: "04.02.2024",
        schedule: {
          startDateTime: "2024-02-04T09:00:00.000Z",
          endDateTime: "2024-02-04T10:00:00.000Z",
        },
        availableAmount: 1,
      },
    ],
    active: true,
    mark: 4.5,
  },
  {
    id: "2",
    ratingCount: 5,
    attributes: {
      title: "Wizyta Okulista Kamil Kruk",
      subtitle: "w lokalizacji Zdalnie",
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
    ],
    subItems: [
      {
        id: "1",
        title: "Wizyta Kamil Kruk",
        subtitle: "01.02.2024",
        schedule: {
          startDateTime: "2024-02-01T09:00:00.000Z",
          endDateTime: "2024-02-01T10:00:00.000Z",
        },
        availableAmount: 1,
      },
      {
        id: "2",
        title: "Wizyta Kamil Kruk",
        subtitle: "02.02.2024",
        schedule: {
          startDateTime: "2024-02-02T09:00:00.000Z",
          endDateTime: "2024-02-02T10:00:00.000Z",
        },
        availableAmount: 1,
      },
      {
        id: "3",
        title: "Wizyta Kamil Kruk",
        subtitle: "03.02.2024",
        schedule: {
          startDateTime: "2024-02-03T09:00:00.000Z",
          endDateTime: "2024-02-03T10:00:00.000Z",
        },
        availableAmount: 1,
      },
      {
        id: "4",
        title: "Wizyta Kamil Kruk",
        subtitle: "04.02.2024",
        schedule: {
          startDateTime: "2024-02-04T09:00:00.000Z",
          endDateTime: "2024-02-04T10:00:00.000Z",
        },
        availableAmount: 1,
      },
    ],
    active: true,
    mark: 4.8,
  },
  {
    id: "3",
    ratingCount: 0,
    attributes: {
      title: "Wizyta Kardiolog Michał Michalski",
      subtitle: "w lokalizacji Nowowiejska 56",
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
    ],
    subItems: [
      {
        id: "1",
        title: "Wizyta Michał Michalski",
        subtitle: "01.02.2024",
        schedule: {
          startDateTime: "2024-02-01T09:00:00.000Z",
          endDateTime: "2024-02-01T10:00:00.000Z",
        },
        availableAmount: 1,
      },
      {
        id: "2",
        title: "Wizyta Michał Michalski",
        subtitle: "02.02.2024",
        schedule: {
          startDateTime: "2024-02-02T09:00:00.000Z",
          endDateTime: "2024-02-02T10:00:00.000Z",
        },
        availableAmount: 1,
      },
      {
        id: "3",
        title: "Wizyta Michał Michalski",
        subtitle: "03.02.2024",
        schedule: {
          startDateTime: "2024-02-03T09:00:00.000Z",
          endDateTime: "2024-02-03T10:00:00.000Z",
        },
        availableAmount: 1,
      },
      {
        id: "4",
        title: "Wizyta Michał Michalski",
        subtitle: "04.02.2024",
        schedule: {
          startDateTime: "2024-02-04T09:00:00.000Z",
          endDateTime: "2024-02-04T10:00:00.000Z",
        },
        availableAmount: 1,
      },
    ],
    active: true,
    mark: 4.6,
  },
  {
    id: "4",
    attributes: {
      title: "Wizyta Neurolog",
      subtitle: "w lokalizacji Pasaż Grunwaldzki",
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
    ],
    subItems: [
      {
        id: "1",
        title: "Wizyta Kamil Kruk",
        subtitle: "01.02.2024",
        schedule: {
          startDateTime: "2024-02-01T09:00:00.000Z",
          endDateTime: "2024-02-01T10:00:00.000Z",
        },
        availableAmount: 1,
      },
      {
        id: "2",
        title: "Wizyta Kamil Kruk",
        subtitle: "02.02.2024",
        schedule: {
          startDateTime: "2024-02-02T09:00:00.000Z",
          endDateTime: "2024-02-02T10:00:00.000Z",
        },
        availableAmount: 1,
      },
      {
        id: "3",
        title: "Wizyta Kamil Kruk",
        subtitle: "03.02.2024",
        schedule: {
          startDateTime: "2024-02-03T09:00:00.000Z",
          endDateTime: "2024-02-03T10:00:00.000Z",
        },
        availableAmount: 1,
      },
      {
        id: "4",
        title: "Wizyta Kamil Kruk",
        subtitle: "04.02.2024",
        schedule: {
          startDateTime: "2024-02-04T09:00:00.000Z",
          endDateTime: "2024-02-04T10:00:00.000Z",
        },
        availableAmount: 1,
      },
    ],
    active: true,
    mark: 4,
  },
];
