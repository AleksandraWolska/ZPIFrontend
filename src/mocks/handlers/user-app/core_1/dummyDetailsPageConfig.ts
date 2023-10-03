import { DetailsPageConfig } from "../../../../routes/userapp/types";
import { dummyCustomAttributeSpec } from "./DummyCustomAttributesSpec";

export const dummyDetailsPageConfig: DetailsPageConfig = {
  customAttributesSpec: dummyCustomAttributeSpec,
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
    flexibility: false,
    simultaneous: false,
    uniqueness: false,
    periodicity: false,
    specificReservation: false,
  },
};

export default dummyDetailsPageConfig;
