// TYPES FOR PAGE BUILDER

export type ParameterConfig = {
  name: string;
  type: string;
  isRequired: boolean;
  isFilterable: boolean;
  enablePossibleValues: boolean;
  possibleValues?: string[];
  showFirstScreen: boolean;
  showSecondScreen: boolean;
  units?: string; // if type==number
};

export type ItemConfig = {
  itemTitle: boolean;
  itemSubtitle: boolean;
  subItemTitle?: boolean;
  subitemSubtitle?: boolean;
  showItemDescription: boolean;
  commentSection: boolean;
  enableRating: boolean;
  showRatingFirstScreen: boolean;
  showRatingSecondScreen: boolean;
  showItemImageFirstScreen: boolean;
  showItemImageSecondScreen: boolean;
};

export type UserAppConfig = {
  companyName: string;
  welcomeTextLine1: string;
  welcomeTextLine2: string;
  logoSource: string; // Needs further specification
  showLogo: boolean;
  phoneNumber: string;
  email: string;
  enableFiltering: boolean;
  parameterMap: ParameterConfig[];
  reservationPrompts: unknown; // Needs further specification
};

export type CoreConfig = {
  simultaneous: boolean;
  uniqueness: boolean;
  flexibility: boolean;
  granularity: boolean;
  periodicity: boolean;
  specificReservation: boolean;
};

export type UserAppBuilderConfig = {
  coreConfig: CoreConfig;
  layoutConfig: UserAppConfig;
  itemConfig: ItemConfig;
};

//= =================================================
// TYPES FOR FETCHED DATA

export type FetchedJsonFirstScreen = {
  userapp_builder_config: UserAppBuilderConfig;
  fetched_data: {
    items: Item[];
  };
};

export type FetchedJsonSecondScreen = {
  userapp_builder_config: UserAppBuilderConfig;
  fetched_data: {
    item: Item;
  };
};

export type Comment = {
  id: number;
  userId: number;
  nickname: string;
  content: string;
  datetime: string;
};

export type Parameter = {
  name: string;
  value: string;
};
export type Item = {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  parameters?: Parameter[];
  subitemList?: SubItem[];
  commentList?: Comment[];
  mark?: number;
  availableAmount?: number;
  image?: string;
};

export type SubItem = {
  id: number;
  title: string;
  subtitle?: string;
  availableAmount?: number;
};

// export type UserAppConfig = {
//   coreConfig: {
//     simultaneous: boolean;
//     uniqueness: boolean;
//     flexibility: boolean;
//     granularity: boolean;
//     periodicity: boolean;
//     specificReservation: boolean;
//   };
//   layoutConfig: {
//     companyName: string; // Name of the company
//     welcomeTextLine1: string; // First line of the welcome text
//     welcomeTextLine2: string; // Second line of the welcome text
//     logoSource: string; // URL of the company's logo (needs further specification)
//     showLogo: boolean; // Whether to display the logo or not
//     phoneNumber: string; // Contact phone number
//     email: string; // Contact email
//     enableFiltering: boolean; // If filtering options should be enabled
//     parameterMap: {
//       name: string; // Name of the parameter
//       type: string; // Data type of the parameter (e.g., "string", "number")
//       isRequired: boolean; // If this parameter is mandatory
//       isFilterable: boolean; // If this parameter can be used for filtering
//       enablePossibleValues: boolean; // if false, field will be displayes as text input, if false - as select input
//       possibleValues?: string[]; // (optional - mainly for strings, backend should search through all values and return set with those values
//       showFirstScreen: boolean; // Display parameter on the first screen
//       showSecondScreen: boolean; // Display parameter on the second screen
//       units?: string; // Units, if type is "number"
//     }[];
//     reervationPrompts: unknown; // Prompt for reservations (needs further specification)
//   };
//   itemConfig: {
//     itemTitle: {
//       value: string; // The text value of the item title
//       show: boolean; // Whether to show the item title
//     };
//     itemSubtitle: {
//       value: string; // The text value of the item subtitle
//       show: boolean; // Whether to show the item subtitle
//     };
//     subItemTitle?: {
//       value: string; // The text value of the sub-item title
//       show: boolean; // Whether to show the sub-item title
//     };
//     subitemSubtitle?: {
//       value: string; // The text value of the sub-item subtitle
//       show: boolean; // Whether to show the sub-item subtitle
//     };
//     showItemDescription: boolean; // Whether to display the item's description
//     commentSection: boolean; // Whether a comment section is present
//     enableRating: boolean; // If the rating system is enabled
//     showRatingFirstScreen: boolean; // Display rating on the first screen
//     showRatingSecondScreen: boolean; // Display rating on the second screen
//     showItemImageFirstScreen: boolean; // Display item image on the first screen
//     showItemImageSecondScreen: boolean; // Display item image on the second screen
//   };
// };

export type FilterValues = {
  [key: string]: string | number | boolean;
};
