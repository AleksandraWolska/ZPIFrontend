import { Item } from "../../../../types";

const dummyItems: Item[] = [
  {
    id: "1",
    active: true,
    title: "Office hours",
    subtitle: "",
    description: "",
    image: "",
    customAttributeList: [
      {
        id: "1",
        name: "Teacher",
        value: "John Doe",
      },
      {
        id: "2",
        name: "Target Students",
        value: "Bachelor",
      },
      {
        id: "3",
        name: "Topic",
        value: "Machine Learning",
      },
    ],
  },
  {
    id: "2",
    active: true,
    title: "Office hours",
    subtitle: "",
    description: "",
    image: "",
    customAttributeList: [
      {
        id: "1",
        name: "Teacher",
        value: "Jane Doe",
      },
      {
        id: "2",
        name: "Target Students",
        value: "Master",
      },
      {
        id: "3",
        name: "Topic",
        value: "Data Science",
      },
    ],
  },
];

export default dummyItems;
