import { NewItemConfig } from "../../../routes/items/types";

export const dummyNewItemConfig: NewItemConfig = {
  core: {
    flexibility: false,
    granularity: false,
    simultaneous: true,
    uniqueness: false,
    specificReservation: false,
    periodicity: true,
  },
  customAttributesSpec: [
    {
      id: "1",
      name: "Brand",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
      limitValues: true,
      possibleValues: [
        "ASUS",
        "Apple",
        "Samsung",
        "Dell",
        "Custom",
        "Lenovo",
        "Acer",
        "HP",
      ],
    },
    {
      id: "2",
      name: "Processor",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
      limitValues: true,
      possibleValues: [
        "Intel Core i7",
        "Intel Core i5",
        "AMD Ryzen 7",
        "Intel Celeron",
        "Intel Xeon",
        "Qualcomm Snapdragon",
        "AMD Ryzen 9",
        "Intel Pentium",
      ],
    },
    {
      id: "3",
      name: "RAM",
      dataType: "number",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
    },
    {
      id: "4",
      name: "Storage",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
    },
    {
      id: "5",
      name: "Available",
      dataType: "boolean",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
    },
  ],
};
