// type UserAppBuilderDataBackup = {
//   simultaneousness: boolean; // true for multiple registrations, false for single registration
//   uniqueness: boolean; // true for a distinct item, false for multiple indistinguishable items
//   flexibility: boolean; // true if user-defined time frames, false if admin-defined time frames
//   granularity: boolean; // true for specific intervals, false for any period, n/a if flexibility is false
//   cyclicity: boolean; // true for a master item with sub-items, false for individual items
//   breaks_included: boolean; // true if breaks are included, false otherwise
//   specific_reservation: boolean; // true if there are sub-items to reserve, false otherwise

//   userapp_layout: {
//     comapany_name: string;
//     welcome_text_line1: string;
//     welcome_text_line2: string;
//     logo: any; // The type depends on how you store the logo. It could be string (for a URL) or File, etc.
//     contact_info: any; // This needs further specification based on what "contact_info" holds.
//     filtering: boolean;
//     item_layout: {
//       item_title: {
//         value: string;
//         display: boolean;
//         isLong: boolean;
//       };
//       item_subtitle: {
//         value: string;
//         display: boolean;
//         isLong: boolean;
//       };
//       sub_item_title: {
//         value: string;
//         display: boolean;
//         isLong: boolean;
//       };
//       sub_item_subtitle: {
//         value: string;
//         display: boolean;
//         isLong: boolean;
//       };
//       parameter_map: Array<{
//         param_name: string;
//         param_type: string; // type of the parameter, you may need to specify further
//         param_is_required: boolean;
//         param_is_shown: boolean;
//         param_enable_filtering: boolean;
//         possible_values: string[]; // Depends on what values are acceptable
//       }>;
//       comment_section: boolean;
//       mark_section: boolean;
//       mark_visibility: boolean;
//       item_image: any; // Depends on how you're storing the image (e.g., string for URL, File for uploaded images)
//       reservation_prompts: any; // This needs further specification
//     };
//   };
// };
