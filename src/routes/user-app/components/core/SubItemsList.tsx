import { List, ListItem, ListItemText } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import { Item, SubItem } from "../../../../types";
import useStoreConfig from "../../wrapper/useStoreConfig";
import { shouldShowEnd } from "../../../../shared-components/utils";

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
  const { t } = useTranslation();

  const storeConfig = useStoreConfig();

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
                        isPast
                          ? `${t("user.components.core.past")} `
                          : !isAvailable
                          ? `${t("user.components.core.full")} `
                          : ""
                      }${subItem.title}${
                        storeConfig.core.periodicity
                          ? subItem.subtitle
                            ? ` -- ${subItem.subtitle}`
                            : ""
                          : ""
                      }
`}
                      secondary={`                      ${
                        storeConfig.core.periodicity
                          ? `${new Date(
                              subItem.schedule!.startDateTime,
                            ).toLocaleString()}${
                              shouldShowEnd(
                                subItem.schedule!.startDateTime,
                                subItem.schedule?.endDateTime,
                              )
                                ? ` - ${new Date(
                                    subItem.schedule!.endDateTime!,
                                  ).toLocaleString()}`
                                : ""
                            }`
                          : subItem.subtitle
                          ? ` ${subItem.subtitle}`
                          : ""
                      }`}
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
