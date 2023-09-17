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

// if (b.coreConfig.flexibility) {
//     // flexibility is true
//     if (b.coreConfig.uniqueness) {
//       if (b.coreConfig.simultaneous) {
//         setShowUserAmountChoice(true);
//         setShowFreeRangesUserInput(true);
//       } else {
//         setShowFreeRangesUserInput(true);
//       }
//     } else {
//       // uniqueness is false
//       if (b.coreConfig.simultaneous) {
//         setShowUserAmountChoice(true);
//         setShowCheckAvailabilityUserInput(true);
//       } else {
//         setShowCheckAvailabilityUserInput(true);
//       }
//     }
//   } else {
//     // flexibility is false
//     if (b.coreConfig.simultaneous) {
//       if (b.coreConfig.specificReservation) {
//         setShowSubItems(true);
//       } else {
//         if (b.coreConfig.periodicity) {
//           setShowSubItems(true);
//           setShowUserAmountChoice(true);
//         } else {
//           setShowUserAmountChoice(true);
//         }
//       }
//     }
//     if (b.coreConfig.periodicity) {
//       setShowSubItems(true);
//     } else {
//       //
//     }
//   }

// // =================================================================================== USER AMOUNT CHOICE
//   // simultaneousness=true, specific_reservation=false, cyclicity=false, flexibility=false
//   // simultaneousness=true, specific_reservation=false, cyclicity=true, flexibility=false
//   // simultaneousness=true, uniqueness=false, flexibility=true

//   const userAmountChoice = (
//     <Box>
//       <QuantityInput
//         disabled={showSubItemsList && selectedSubItemsList.length === 0}
//         value={userCount}
//         onUserCountChange={(value: number) => handleUserCountInputChange(value)}
//       />
//     </Box>
//   );
//   // =================================================================================== SHOW FREE RANGES USER INPUT
//   // simultaneousness=true, uniqueness=true, flexibility=true
//   // simultaneousness=false, uniqueness=true, flexibility=true
//   const freeRangesUserInput = <Box>freeRangesUserInput </Box>;
//   // =================================================================================== CHECK AVAILABILITY USER INPUT
//   // simultaneousness=true, uniqueness=false, flexibility=true
//   // simultaneousness=false, uniqueness=false, flexibility=true
//   const checkAvailabilityUserInput = (
//     <Box>checkAvailabilityUserInput</Box>
//   );

//   // ===================================================================================SUBITEMS LIST
//   // simultaneousness=true, specific_reservation=true, flexibility=false
//   // simultaneousness=true, specific_reservation=false, cyclicity=true, flexibility=false

//   const subItemsList = selectedItem && showSubItemsList && (
//     <SubItemsList
//       selectedItem={selectedItem}
//       showSubItemsList={showSubItemsList}
//       selectedSubItemsList={selectedSubItemsList}
//       toggleItemSelection={toggleItemSelection}
//     />
//   );

// const core = (
//     <Box>
//       {c.flexibility &&
//         ((c.uniqueness && !c.simultaneous) || !c.uniqueness) &&
//         freeRangesUserInput}
//       {c.flexibility &&
//         !c.uniqueness &&
//         c.simultaneous &&
//         checkAvailabilityUserInput}
//       {!c.flexibility &&
//         ((c.simultaneous && (c.specificReservation || c.periodicity)) ||
//           c.periodicity) &&
//         subItemsList}
//       {(c.flexibility && c.simultaneous) ||
//         (!c.flexibility &&
//           ((c.simultaneous && !c.specificReservation) ||
//             (!c.simultaneous && c.periodicity)) &&
//           userAmountChoice)}
//       {buttons}
//     </Box>
//   );
