import { MainPageConfig } from "../../../../routes/userapp/types";

export const dummyMainPageConfig: MainPageConfig = {
  customAttributesSpec: [
    {
      id: "1",
      name: "Brand",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
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
  mainPage: {
    welcomeTextLine1:
      "Wypozyczalnia dla itemów nieunikalnych - w bazie jest więcej niż 1 sztuka tożsamego itemu",
    welcomeTextLine2: "TBD think of usecase c7/c9 - biblioteka",
    enableFiltering: true,
    showItemTitle: true,
    showItemSubtitle: true,
    showItemImg: true,
    showRating: true,
  },
};

export default dummyMainPageConfig;
