import { ItemInfo } from "../../../../../types";
import { dummyAvailability } from "./dummyAvailability";

const dummyItemInfo: ItemInfo = {
  item: {
    id: "1",
    active: true,
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
    amount: 25,
    image: "https://example.com/sample-computer.jpg",
  },
  itemStatus: {
    availableAmount: 25,
    schedule: dummyAvailability,
    mark: 4.5,
  },
  subItemsInfo: [
    {
      subItem: {
        id: "1",
        title: "Accessories Bundle",
        subtitle: "Includes keyboard and mouse",
        amount: 2,
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 2,
      },
    },
    {
      subItem: {
        id: "2",
        title: "Extended Warranty",
        subtitle: "2-year warranty",
        amount: 5,
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 5,
      },
    },
    {
      subItem: {
        id: "3",
        title: "Software Package",
        subtitle: "Includes productivity software",
        amount: 3,
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 3,
      },
    },
    {
      subItem: {
        id: "4",
        title: "Monitor Upgrade",
        subtitle: "",
        amount: 2,
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 2,
      },
    },
    {
      subItem: {
        id: "5",
        title: "Additional Storage",
        subtitle: "1TB HDD upgrade",
        amount: 1,
      },
      subItemStatus: {
        schedule: "",
        availableAmount: 1,
      },
    },
  ],
};
export default dummyItemInfo;
