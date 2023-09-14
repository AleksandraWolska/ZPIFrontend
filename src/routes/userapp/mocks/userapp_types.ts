// TYPES FOR PAGE BUILDER

export type TextConfig = {
  value: string;
  show: boolean;
  is_long: boolean;
};

export type ParameterConfig = {
  param_name: string;
  param_type: string;
  param_is_required: boolean;
  param_enable_filtering: boolean;
  possible_values?: string[];
  param_show_first_screen: boolean;
  param_show_second_screen: boolean;
  units?: string; //if type==number
};

export type ItemLayoutConfig = {
  item_title: TextConfig;
  item_subtitle: TextConfig;
  sub_item_title?: TextConfig;
  sub_item_subtitle?: TextConfig;
  item_description: boolean;
  comment_section: boolean;
  mark_section: boolean;
  mark_first_screen: boolean;
  mark_second_screen: boolean;
  mark_visibility: boolean;
  item_image_show: boolean;
};

export type UserAppLayoutConfig = {
  comapany_name: string;
  welcome_text_line1: string;
  welcome_text_line2: string;
  logo_source: string; // Needs further specification
  logo_show: boolean;
  contact_info: string; // Needs further specification
  filtering: boolean;
  parameter_map: ParameterConfig[];
  item_layout: ItemLayoutConfig;
  reservation_prompts: unknown; // Needs further specification
};

export type CoreConfig = {
  simultaneousness: boolean;
  uniqueness: boolean;
  flexibility: boolean;
  granularity: boolean;
  cyclicity: boolean;
  specific_reservation: boolean;
};

export type UserAppBuilderConfig = {
  core_config: CoreConfig;
  userapp_layout_config: UserAppLayoutConfig;
  item_layout_config: ItemLayoutConfig;
};

//= =================================================
// TYPES FOR FETCHED DATA

export type FetchedJSON = {
  userapp_builder_config: UserAppBuilderConfig;
  fetched_data: {
    items: Item[];
  };
};

export type Comment = {
  id: string;
  userId: string;
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
  subitem_list?: SubItem[];
  comment_list?: Comment[];
  mark?: number;
  available_amount?: number;
  image?: string;
};

export type SubItem = {
  id: number;
  title: string;
  subtitle?: string;
  available_amount?: number;
};
