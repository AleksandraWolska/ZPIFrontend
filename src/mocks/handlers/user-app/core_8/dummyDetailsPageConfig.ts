import { DetailsPageConfig } from "../../../../routes/userapp/types";

export const dummyDetailsPageConfig: DetailsPageConfig = {
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
  detailsPage: {
    showRating: true,
    showComments: true,
    showItemDescription: true,
    showSubItemTitle: true,
    showSubItemSubtitle: true,
    reservationConfirmationPrompt: "Thank you for your reservation!",
    reservationFailurePrompt: "Sorry, reservation failed.",
    reservationSummaryPrompt:
      "Review your reservation details before confirming.",
  },
  core: {
    granularity: true,
    flexibility: true,
    simultaneous: false,
    uniqueness: true,
    specificReservation: false,
    periodicity: false,
  },
};

export default dummyDetailsPageConfig;
