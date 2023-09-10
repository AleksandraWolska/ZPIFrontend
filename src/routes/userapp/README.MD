= HEADER ===============================
logo ? showLogo : showCompanyName

= FIRST SCREEN =========================

-- welcome texts ------------------------
    welcome_text_line1 ? 
    welcome_text_line2 ?

-- filters -----------------------------
    filtering ? {
        map through paramter map:
            param_enable_filtering ? {
                appendFilter(param_name, possible_values, type)
            }
    }

    [[FILTER BUTTON]]

-- items list --------------------------

    item_title ?
    item subtitle ?
    item_image ?
    mark_first_screen ?
    
    map through parameter map:
        param_show_first_screen


= SECOND SCREEN =========================

    item_title ?
    item subtitle ?
    item_image ?
    mark_second_screen ?

    map through parameter map:
        param_show_first_screen


    >>>>>>>>>>>>>>>>>>>>> CORE
    //Base is just RESERVE button

    !flexibility && !simultaneous ? {
        renderBase()
    }

    !flexibility && simultaneous && !specific_reservation && !cyclicity ? {
        addUserAmountChoice()
        renderBase()
    }

    !flexibility && simultaneous && !specific_reservation && cyclicity ? {
        renderSubitems(multiple_choice: specific_reservation) //itemy w innych datach jako subitemy
        addUserAmountChoice()
        renderBase()
    }

    !flexibility && simultaneous && specific_reservation ? {
        renderSubitems(multiple_choice: specific_reservation) //miejsca jako subitemy
        renderBase()
    }
    


    flexibility && uniqueness && simultaneous {
        addUserAmountChoice()
        renderFreeRangesUserInput()
        renderBase()
    ?

    flexibility && uniqueness && !simultaneous {
        renderFreeRangesUserInput()
        renderBase()
    }

    flexibility && !uniqueness && simultaneous {
        addUserAmountChoice()
        renderCheckAvailabilityUserInput()
        renderBase()
    }

    flexibility && !uniqueness && !simultaneous {
        renderCheckAvailabilityUserInput()
        renderBase()
    }
    <<<<<<<<<<<<<<<<<<<<<<<<<<


    comment_section ?































simultaneousness: boolean; // true for multiple registrations, false for single registration
uniqueness: boolean; // true for a distinct item, false for multiple indistinguishable items
flexibility: boolean; // true if user-defined time frames, false if admin-defined time frames
granularity: boolean; // true for specific intervals, false for any period, n/a if flexibility is false
cyclicity: boolean; // true for a master item with sub-items, false for individual items
breaks_included: boolean; // true if breaks are included, false otherwise
specific_reservation: boolean; // true if there are sub-items to reserve, false otherwise