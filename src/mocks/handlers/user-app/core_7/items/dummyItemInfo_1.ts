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
    image: "https://api.slingacademy.com/public/sample-photos/8.jpeg",
  },
  itemStatus: {
    availableAmount: 25,
    mark: 4.5,
    schedule: dummyAvailability,
  },
};
export default dummyItemInfo;
