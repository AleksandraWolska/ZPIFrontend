import { Item } from "../../../types";

export const items: Item[] = [
  {
    id: "1",
    attributes: {
      title: "Rock festival 2024",
      subtitle: "",
      description: "",
      image:
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    customAttributeList: [
      {
        id: "1",
        name: "Artist",
        value: "Ajronwejder",
      },
      {
        id: "2",
        name: "Genre",
        value: "Rock",
      },
      {
        id: "3",
        name: "Price",
        value: 200,
      },
      {
        id: "4",
        name: "Adults only",
        value: true,
      },
    ],
    amount: 500,
    schedule: {
      startDateTime: "2024-02-02T12:00:00Z",
    },
    active: true,
    availableAmount: 500,
  },
  {
    id: "2",
    attributes: {
      title: "Unforgettable pop music festival!",
      subtitle: "",
      description: "",
      image:
        "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    customAttributeList: [
      {
        id: "1",
        name: "Artist",
        value: "Maryla Rodowicz",
      },
      {
        id: "2",
        name: "Genre",
        value: "Pop",
      },
      {
        id: "3",
        name: "Price",
        value: 100,
      },
      {
        id: "4",
        name: "Adults only",
        value: false,
      },
    ],
    amount: 300,
    schedule: {
      startDateTime: "2024-02-03T12:00:00Z",
    },
    active: true,
    availableAmount: 500,
  },
];
