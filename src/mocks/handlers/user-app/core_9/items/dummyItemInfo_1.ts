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
    subItemInfoList: [
      {
        subItem: {
          id: "1",
          title: "Accessories Bundle",
          subtitle: "Includes keyboard and mouse",
          amount: 2,
        },
        subItemStatus: {
          schedule: {
            startDateTime: "2021-09-20T09:00:00.000Z",
            endDateTime: "2021-09-20T10:00:00.000Z",
          },
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
          schedule: {
            startDateTime: "2021-09-20T09:00:00.000Z",
            endDateTime: "2021-09-20T10:00:00.000Z",
          },
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
          schedule: {
            startDateTime: "2021-09-20T09:00:00.000Z",
            endDateTime: "2021-09-20T10:00:00.000Z",
          },
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
          schedule: {
            startDateTime: "2021-09-20T09:00:00.000Z",
            endDateTime: "2021-09-20T10:00:00.000Z",
          },
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
          schedule: {
            startDateTime: "2021-09-20T09:00:00.000Z",
            endDateTime: "2021-09-20T10:00:00.000Z",
          },
          availableAmount: 1,
        },
      },
    ],
  },
  itemStatus: {
    schedule: dummyAvailability,
    availableAmount: 25,
    mark: 4.5,
  },
};
export default dummyItemInfo;
