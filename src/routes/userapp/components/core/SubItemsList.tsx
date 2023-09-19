import { List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { Item, SubItem } from "../../mocks/userapp_types";

type SubItemsListProps = {
  selectedItem: Item | null;
  selectedSubItemsList: SubItem[];
  toggleItemSelection: (subItem: SubItem) => void;
};

function SubItemsList({
  selectedItem,
  selectedSubItemsList,
  toggleItemSelection,
}: SubItemsListProps) {
  return (
    <Box>
      {selectedItem && (
        <List>
          {selectedItem.subitemList?.map((subItem) => (
            <ListItem
              button
              key={subItem.id}
              onClick={() => toggleItemSelection(subItem)}
              style={{
                backgroundColor: selectedSubItemsList.some(
                  (i) => i.id === subItem.id,
                )
                  ? "#AACCFF"
                  : "white",
              }}
            >
              <ListItemText
                primary={subItem.title}
                secondary={subItem.subtitle}
                style={{
                  color: selectedSubItemsList.some((i) => i.id === subItem.id)
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
