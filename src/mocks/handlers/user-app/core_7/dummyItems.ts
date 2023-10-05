import { ItemInfo } from "../../../../types";

export const dummyItems: ItemInfo[] = [
  {
    item: {
      id: "1",
      active: true,
      title: "Gaming Laptop",
      subtitle: "High-performance gaming laptop",
      description: "",
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
      amount: 10,
      image: "https://example.com/gaming-laptop.jpg",
    },
    itemStatus: {
      mark: 4.5,
      availableAmount: 10,
    },
  },
  {
    item: {
      id: "2",
      active: true,
      title: "MacBook Pro",
      subtitle: "Apple MacBook Pro with Retina display",
      description: "",
      customAttributeList: [
        {
          id: "1",
          name: "Brand",
          value: "Apple",
        },
        {
          id: "2",
          name: "Processor",
          value: "Intel Core i5",
        },
        {
          id: "3",
          name: "RAM",
          value: 8,
        },
        {
          id: "4",
          name: "Storage",
          value: "256GB SSD",
        },
        {
          id: "5",
          name: "Available",
          value: true,
        },
      ],
      amount: 15,
      image: "https://example.com/macbook-pro.jpg",
    },
    itemStatus: {
      mark: 4.8,
      availableAmount: 15,
    },
  },
  {
    item: {
      id: "3",
      active: true,
      title: "Desktop PC",
      subtitle: "Powerful desktop computer for work or play",
      description: "",
      customAttributeList: [
        {
          id: "1",
          name: "Brand",
          value: "HP",
        },
        {
          id: "2",
          name: "Processor",
          value: "AMD Ryzen 7",
        },
        {
          id: "3",
          name: "RAM",
          value: 32,
        },
        {
          id: "4",
          name: "Storage",
          value: "1TB HDD",
        },
        {
          id: "5",
          name: "Available",
          value: true,
        },
      ],
      amount: 8,
      image: "https://example.com/desktop-pc.jpg",
    },
    itemStatus: {
      mark: 4.6,
      availableAmount: 8,
    },
  },
  {
    item: {
      id: "4",
      active: true,
      title: "Chromebook",
      subtitle: "Lightweight and affordable Chromebook",
      description: "",
      customAttributeList: [
        {
          id: "1",
          name: "Brand",
          value: "Samsung",
        },
        {
          id: "2",
          name: "Processor",
          value: "Intel Celeron",
        },
        {
          id: "3",
          name: "RAM",
          value: 4,
        },
        {
          id: "4",
          name: "Storage",
          value: "64GB eMMC",
        },
        {
          id: "5",
          name: "Available",
          value: true,
        },
      ],
      amount: 20,
      image: "https://example.com/chromebook.jpg",
    },
    itemStatus: {
      mark: 4,
      availableAmount: 20,
    },
  },
  {
    item: {
      id: "5",
      active: true,
      title: "Workstation Laptop",
      subtitle: "High-performance laptop for professionals",
      description: "",
      customAttributeList: [
        {
          id: "1",
          name: "Brand",
          value: "Dell",
        },
        {
          id: "2",
          name: "Processor",
          value: "Intel Xeon",
        },
        {
          id: "3",
          name: "RAM",
          value: 32,
        },
        {
          id: "4",
          name: "Storage",
          value: "1TB NVMe SSD",
        },
        {
          id: "5",
          name: "Available",
          value: true,
        },
      ],
      amount: 12,
      image: "https://example.com/workstation-laptop.jpg",
    },
    itemStatus: {
      mark: 4.7,
      availableAmount: 12,
    },
  },
];

export default dummyItems;
