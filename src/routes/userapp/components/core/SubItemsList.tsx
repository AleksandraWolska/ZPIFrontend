import { List, ListItem, ListItemText } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { Item, SubItem } from "../../../../types";

type SubItemsListProps = {
  selectedItem: Item;
  selectedSubItemsList: SubItem[];
  toggleItemSelection: (subItem: SubItem) => void;
};

function SubItemsList({
  selectedItem,
  selectedSubItemsList,
  toggleItemSelection,
}: SubItemsListProps) {
  const theme = useTheme();
  return (
    <Box>
      {selectedItem && (
        <List>
          {selectedItem.subItems?.map((subItem) => {
            const isAvailable = subItem.availableAmount !== 0;
            const isPast =
              subItem.schedule?.startDateTime &&
              new Date(subItem.schedule.startDateTime) < new Date();

            const isSelected = selectedSubItemsList.some(
              (i) => i.id === subItem.id,
            );

            return (
              <ListItem
                key={subItem.id}
                onClick={
                  isAvailable && !isPast
                    ? () => toggleItemSelection(subItem)
                    : undefined
                }
                style={{
                  cursor: isAvailable && !isPast ? "pointer" : "default",
                }}
              >
                <Box
                  padding={2}
                  bgcolor={isSelected ? theme.palette.primary.main : "white"}
                  boxShadow={3}
                  borderRadius="10px"
                  display="flex"
                  width="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  style={{
                    opacity: isAvailable && !isPast ? 1 : 0.4,
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {/* Text Information */}
                  <Box flexGrow={1} marginRight={2}>
                    <ListItemText
                      primary={`${
                        isPast ? "[PAST] " : !isAvailable ? "[FULL] " : ""
                      }${subItem.title}`}
                      secondary={subItem.subtitle}
                      style={{
                        color: "black",
                      }}
                    />
                  </Box>
                </Box>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}

export default SubItemsList;
