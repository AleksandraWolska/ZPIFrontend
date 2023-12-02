import { Box, Typography } from "@mui/material";
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
      sx={{
        padding: 2,
        bgcolor: "white",
        boxShadow: 3,
        borderRadius: "10px",
        display: "flex",
        width: "100%",
        cursor: "pointer",
        alignItems: "center",
        "@media (max-width: 800px)": {
          flexDirection: "column",
        },
      }}
    >
      {/* Image Box */}
      <Box
        sx={{
          borderRadius: "10%",
          marginRight: 2,
          maxWidth: "20%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          "@media (max-width: 800px)": {
            maxWidth: "100%",
            marginRight: 0,
            marginBottom: 2,
          },
        }}
      >
        {item.attributes.image && <ItemImage url={item.attributes.image} />}
      </Box>

      {/* Text Information */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          "@media (max-width: 800px)": {
            flexDirection: "column",
          },
        }}
      >
        <Box flexGrow={1} marginRight={2}>
          <Typography variant="h5">{item.attributes.title}</Typography>
          <Typography>{item.attributes.subtitle}</Typography>

          {config.mainPage && config.mainPage.showRating && item.mark && (
            <Ratings mark={item.mark} ratingCount={item.ratingCount} />
          )}
        </Box>

        {/* Attributes List */}
        <Box
          sx={{
            width: "30%",
            "@media (max-width: 1100px)": {
              width: "40%",
            },
            "@media (max-width: 800px)": {
              width: "100%",
            },
          }}
        >
          <AttributesList
            attributesConfig={config.customAttributesSpec}
            itemAttributes={item.customAttributeList}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ItemListElement;
