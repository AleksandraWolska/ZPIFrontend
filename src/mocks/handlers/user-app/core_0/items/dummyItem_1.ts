import { Item } from "../../../../../types";

const dummyItem: Item = {
  id: "1",
  title: "Sample Computer",
  subtitle: "High-performance computer",
  description: "This computer is perfect for all your computing needs.",
  customAttributeList: [
    {
      id: "1",
      name: "Brand",
      value: "ASUS",
    },
    {
      id: "2",
      name: "Processor",
      value: "Intel Core i7",
    },
    {
      id: "3",
      name: "RAM",
      value: "16",
    },
    {
      id: "4",
      name: "Storage",
      value: "512GB SSD",
    },
    {
      id: "5",
      name: "Available",
      value: "true",
    },
  ],
  subItemList: [
    {
      id: "1",
      title: "Accessories Bundle",
      subtitle: "Includes keyboard and mouse",
      availableAmount: 2,
    },
    {
      id: "2",
      title: "Extended Warranty",
      subtitle: "2-year warranty",
      availableAmount: 5,
    },
    {
      id: "3",
      title: "Software Package",
      subtitle: "Includes productivity software",
      availableAmount: 3,
    },
    {
      id: "4",
      title: "Monitor Upgrade",
      availableAmount: 2,
    },
    {
      id: "5",
      title: "Additional Storage",
      subtitle: "1TB HDD upgrade",
      availableAmount: 1,
    },
  ],
  mark: 4.5,
  availableAmount: 25,
  image: "https://example.com/sample-computer.jpg",
};

export default dummyItem;
