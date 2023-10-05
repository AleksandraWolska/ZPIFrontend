import { MainPageConfig } from "../../../../routes/userapp/types";
import { dummyCustomAttributeSpec } from "./dummyCustomAttributesSpec";

export const dummyMainPageConfig: MainPageConfig = {
  customAttributesSpec: dummyCustomAttributeSpec,
  mainPage: {
    welcomeTextLine1: "Usługi nieunikalne, wiele osób na raz",
    welcomeTextLine2: "Weścia na usługi: korzystanie z sal nauki",
    enableFiltering: true,
    showItemTitle: true,
    showItemSubtitle: true,
    showItemImg: true,
    showRating: true,
  },
};

export default dummyMainPageConfig;
