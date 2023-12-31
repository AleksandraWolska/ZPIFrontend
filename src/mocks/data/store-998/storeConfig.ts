import { StoreConfig } from "../../../types";

export const storeConfig: StoreConfig = {
  storeConfigId: "cypress-test-store-1",
  owner: {
    ownerId: "cypress@test.com",
    name: "Cypress Test Store 1",
    logoSrc: "",
    phone: "",
    email: "",
    color: "blue",
  },
  core: {
    flexibility: false,
    simultaneous: true,
    specificReservation: false,
    periodicity: false,
  },
  customAttributesSpec: [
    {
      id: "1",
      name: "Artist",
      dataType: "string",
      isRequired: true,
      isFilterable: false,
      showMainPage: true,
      showDetailsPage: true,
    },
    {
      id: "2",
      name: "Genre",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
      limitValues: true,
      possibleValues: ["Jazz", "Rock", "Pop"],
    },
    {
      id: "3",
      name: "Price",
      dataType: "number",
      isRequired: false,
      isFilterable: false,
      showMainPage: true,
      showDetailsPage: true,
    },
    {
      id: "4",
      name: "Adults only",
      dataType: "boolean",
      isRequired: false,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
    },
  ],
  mainPage: {
    welcomeTextLine1: "Best concerts!",
    welcomeTextLine2: "Reserve tickets now!",
    enableFiltering: true,
    showItemTitle: true,
    showItemSubtitle: true,
    showItemImg: true,
    showRating: true,
  },
  detailsPage: {
    showRating: true,
    showComments: true,
    showItemDescription: true,
    showSubItemTitle: true,
    showSubItemSubtitle: true,
    reservationConfirmationPrompt:
      "Are you sure that you want to reserve this ticket?",
    reservationFailurePrompt:
      "Something went wrong while reserving your ticket.",
    reservationSummaryPrompt: "You have reserved your ticket.",
  },
  authConfig: {
    requiredPersonalData: ["Name", "Phone"],
    confirmationRequired: true,
  },
};
