import { ItemConfig } from "../../../../routes/admin-app/types";

const dummyItemConfig: ItemConfig = {
  core: {
    flexibility: true,
    granularity: true,
    simultaneous: false,
    uniqueness: true,
  },
  customAttributesSpec: [
    {
      id: "1",
      name: "Teacher",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
    },
    {
      id: "2",
      name: "Target Students",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
      limitValues: true,
      possibleValues: ["Bachelor", "Master"],
    },
    {
      id: "3",
      name: "Topic",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
      limitValues: true,
      possibleValues: [
        "Machine Learning",
        "Data Science",
        "Natural Language Processing",
        "Computer Vision",
      ],
    },
  ],
};

export default dummyItemConfig;
