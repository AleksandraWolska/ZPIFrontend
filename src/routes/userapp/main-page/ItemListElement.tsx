import { Box, ListItemText } from "@mui/material";
import { ItemInfo } from "../../../types";

import Ratings from "../features/Ratings";
import ItemImage from "../features/ItemImage";
import AttributesList from "./AttributesList";
import { MainPageConfig } from "../types";

type ItemListElementProps = {
  itemInfo: ItemInfo;
  config: MainPageConfig;
};

function ItemListElement({ itemInfo, config }: ItemListElementProps) {
  return (
    <Box
      padding={2}
      bgcolor="white"
      boxShadow={3}
      borderRadius="10px"
      display="flex"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      style={{
        opacity: itemInfo.itemStatus.availableAmount !== 0 ? 1 : 0.4,
      }}
    >
      {/* Image Box */}
      <Box
        borderRadius="10%"
        marginRight={2}
        maxWidth="20%"
        overflow="hidden"
        display="flex"
        alignItems="center"
      >
        {itemInfo.item.image && <ItemImage url={itemInfo.item.image} />}
      </Box>

      {/* Text Information */}
      <Box flexGrow={1} marginRight={2}>
        <ListItemText
          primary={itemInfo.item.title}
          secondary={itemInfo.item.subtitle}
        />

        {config.mainPage &&
          config.mainPage.showRating &&
          itemInfo.itemStatus.mark && (
            <Ratings mark={itemInfo.itemStatus.mark} />
          )}
      </Box>

      {/* Attributes List */}
      <Box>
        <AttributesList
          attributesConfig={config.customAttributesSpec}
          itemAttributes={itemInfo.item.customAttributeList}
        />
      </Box>
    </Box>
  );
}

export default ItemListElement;
