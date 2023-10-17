import { DetailsPageConfig } from "../../../../routes/userapp/types";
import { dummyCustomAttributeSpec } from "./dummyCustomAttributesSpec";

export const dummyDetailsPageConfig: DetailsPageConfig = {
  customAttributesSpec: dummyCustomAttributeSpec,
  detailsPage: {
    showRating: false,
    showComments: false,
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
    simultaneous: true,
    uniqueness: false,
    periodicity: false,
    specificReservation: true,
  },
};

export default dummyDetailsPageConfig;
