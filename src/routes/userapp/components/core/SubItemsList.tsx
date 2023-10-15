import { List, ListItem, ListItemText } from "@mui/material";
import { Box, useTheme } from "@mui/system";
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
  const theme = useTheme();
  return (
    <Box>
      {selectedItemInfo && (
        <List>
          {selectedItemInfo.item.subItemInfoList?.map((subItemInfo) => {
            const isAvailable = subItemInfo.subItemStatus.availableAmount !== 0;

            const isSelected = selectedSubItemsList.some(
              (i) => i.subItem.id === subItemInfo.subItem.id,
            );

            return (
              <ListItem
                key={subItemInfo.subItem.id}
                onClick={
                  isAvailable
                    ? () => toggleItemSelection(subItemInfo)
                    : undefined
                }
                style={{
                  cursor: isAvailable ? "pointer" : "default",
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
                    opacity: isAvailable ? 1 : 0.4,
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {/* Text Information */}
                  <Box flexGrow={1} marginRight={2}>
                    <ListItemText
                      primary={subItemInfo.subItem.title}
                      secondary={subItemInfo.subItem.subtitle}
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
