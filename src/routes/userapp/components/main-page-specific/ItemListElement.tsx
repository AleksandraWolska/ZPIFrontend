import { Box, ListItemText } from "@mui/material";
import { Item } from "../../../../types";

import Ratings from "../shared/Ratings";
import ItemImage from "../shared/ItemImage";
import AttributesList from "./AttributesList";
import { MainPageConfig } from "../../types";

type ItemListElementProps = {
  item: Item;
  config: MainPageConfig;
};

function ItemListElement({ item, config }: ItemListElementProps) {
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
        opacity: item.status.availableAmount !== 0 ? 1 : 0.4,
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
        {item.attributes.image && <ItemImage url={item.attributes.image} />}
      </Box>

      {/* Text Information */}
      <Box flexGrow={1} marginRight={2}>
        <ListItemText
          primary={item.attributes.title}
          secondary={item.attributes.subtitle}
        />

        {config.mainPage && config.mainPage.showRating && item.status.mark && (
          <Ratings mark={item.status.mark} />
        )}
      </Box>

      {/* Attributes List */}
      <Box>
        <AttributesList
          attributesConfig={config.customAttributesSpec}
          itemAttributes={item.attributes.customAttributeList}
        />
      </Box>
    </Box>
  );
}

export default ItemListElement;
