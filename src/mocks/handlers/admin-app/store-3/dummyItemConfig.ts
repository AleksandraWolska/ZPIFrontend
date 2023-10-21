import { ItemConfig } from "../../../../routes/admin-app/types";

const dummyItemConfig: ItemConfig = {
  core: {
    flexibility: true,
    granularity: true,
    allowOverNight: true,
    simultaneous: false,
    uniqueness: true,
  },
  customAttributesSpec: [
    {
      id: "1",
      name: "Manufacturer",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
      limitValues: true,
      possibleValues: ["Mercedes", "Audi", "BMW"],
    },
    {
      id: "2",
      name: "Model",
      dataType: "string",
      isRequired: true,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
    },
    {
      id: "3",
      name: "Year",
      dataType: "number",
      isRequired: false,
      isFilterable: true,
      showMainPage: false,
      showDetailsPage: true,
    },
    {
      id: "4",
      name: "Passengers",
      dataType: "number",
      isRequired: false,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
    },
    {
      id: "5",
      name: "Power",
      dataType: "number",
      isRequired: false,
      isFilterable: true,
      showMainPage: false,
      showDetailsPage: true,
    },
    {
      id: "6",
      name: "Automatic",
      dataType: "boolean",
      isRequired: false,
      isFilterable: true,
      showMainPage: true,
      showDetailsPage: true,
    },
  ],
};

export default dummyItemConfig;
