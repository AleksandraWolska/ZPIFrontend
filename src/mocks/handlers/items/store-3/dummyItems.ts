import { Item } from "../../../../types";

const dummyItems: Item[] = [
  {
    id: "1",
    active: true,
    title: "Audi A4",
    subtitle: "",
    description: "",
    image: "",
    customAttributeList: [
      {
        id: "1",
        name: "Manufacturer",
        value: "Audi",
      },
      {
        id: "2",
        name: "Model",
        value: "A4",
      },
      {
        id: "3",
        name: "Year",
        value: "2022",
      },
      {
        id: "4",
        name: "Passengers",
        value: "5",
      },
      {
        id: "5",
        name: "Power",
        value: "150",
      },
      {
        id: "6",
        name: "Automatic",
        value: "true",
      },
    ],
  },
  {
    id: "2",
    active: true,
    title: "Mercedes C",
    subtitle: "",
    description: "",
    image: "",
    customAttributeList: [
      {
        id: "1",
        name: "Manufacturer",
        value: "Mercedes",
      },
      {
        id: "2",
        name: "Model",
        value: "C",
      },
      {
        id: "3",
        name: "Year",
        value: "2023",
      },
      {
        id: "4",
        name: "Passengers",
        value: "5",
      },
      {
        id: "5",
        name: "Power",
        value: "200",
      },
      {
        id: "6",
        name: "Automatic",
        value: "true",
      },
    ],
  },
];

export default dummyItems;
