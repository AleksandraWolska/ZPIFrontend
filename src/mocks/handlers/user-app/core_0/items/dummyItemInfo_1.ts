import { ItemInfo } from "../../../../../types";

const dummyItem: ItemInfo = {
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
    image: "https://example.com/sample-computer.jpg",
    subItemInfoList: [
      {
        subItem: {
          id: "1",
          title: "Accessories Bundle",
          subtitle: "Includes keyboard and mouse",
        },
        subItemStatus: {
          availableAmount: 2,
        },
      },
      {
        subItem: {
          id: "2",
          title: "Extended Warranty",
          subtitle: "2-year warranty",
        },
        subItemStatus: {
          availableAmount: 5,
        },
      },
      {
        subItem: {
          id: "3",
          title: "Software Package",
          subtitle: "Includes productivity software",
        },
        subItemStatus: {
          availableAmount: 3,
        },
      },
      {
        subItem: {
          id: "4",
          title: "Monitor Upgrade",
          subtitle: "Upgrade to 4K monitor",
        },
        subItemStatus: {
          availableAmount: 2,
        },
      },
      {
        subItem: {
          id: "5",
          title: "Additional Storage",
          subtitle: "1TB HDD upgrade",
        },

        subItemStatus: {
          availableAmount: 1,
        },
      },
    ],
  },
  itemStatus: {
    availableAmount: 25,
    mark: 4.5,
  },
};

export default dummyItem;
