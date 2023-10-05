import { List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { ItemInfo, SubItemInfo } from "../../../../types";

type SubItemsListProps = {
  selectedItemInfo: ItemInfo;
  selectedSubItemsList: SubItemInfo[];
  toggleItemSelection: (subItem: SubItemInfo) => void;
};

function SubItemsList({
  selectedItemInfo,
  selectedSubItemsList,
  toggleItemSelection,
}: SubItemsListProps) {
  return (
    <Box>
      {selectedItemInfo && (
        <List>
          {selectedItemInfo.item.subItemInfoList?.map((subItemInfo) => (
            <ListItem
              button
              key={subItemInfo.subItem.id}
              onClick={() => toggleItemSelection(subItemInfo)}
              style={{
                backgroundColor: selectedSubItemsList.some(
                  (i) => i.subItem.id === subItemInfo.subItem.id,
                )
                  ? "#AACCFF"
                  : "white",
              }}
            >
              <ListItemText
                primary={subItemInfo.subItem.title}
                secondary={subItemInfo.subItem.subtitle}
                style={{
                  color: selectedSubItemsList.some(
                    (i) => i.subItem.id === subItemInfo.subItem.id,
                  )
                    ? "white"
                    : "black",
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default SubItemsList;
