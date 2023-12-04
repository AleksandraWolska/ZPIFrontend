import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/system";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import ItemFormProvider, { useItemForm } from "../item-form/ItemFormProvider";
import useItemToBeEdited from "./useItemToBeEdited";
import GeneralInfo from "../item-form/GeneralInfo";
import CustomAttributes from "../item-form/CustomAttributes";
import { askForSubItems, askForSubItemSchedule, validateItem } from "../utils";
import SubItems from "../item-form/SubItems";
import { Core } from "../../../../types";
import Stepper from "../item-form/Stepper";
import Schedule from "../item-form/schedule/Schedule";
import useEditItem from "./useEditItem";
import useStoreConfig from "../../store/useStoreConfig";

function EditItem() {
  const itemToBeEdited = useItemToBeEdited();

  return (
    <ItemFormProvider initialItem={itemToBeEdited}>
      <EditForm />
    </ItemFormProvider>
  );
}

function EditForm() {
  const { t } = useTranslation();

  const storeConfig = useStoreConfig();
  const { item } = useItemForm();
  const editItem = useEditItem();
  const navigate = useNavigate();

  const steps = getSteps(storeConfig.core);

  const isValid = validateItem(item, storeConfig);

  return (
    <Container>
      <Box
        sx={{
          maxWidth: "1000px",
          width: "90vw",
          boxShadow: "1px 1px 5px 2px rgba(0, 0, 0, .2)",
          borderRadius: "15px",
          padding: 1.25,
          margin: "auto",
        }}
      >
        <Stepper steps={steps} />

        <Box sx={{ pl: 4, pr: 4 }}>
          <Button
            sx={{ padding: 2 }}
            fullWidth
            disabled={!isValid}
            onClick={() => {
              editItem.mutate(item, {
                onSuccess: () => {
                  navigate("../..", { relative: "path" });
                },
              });
            }}
          >
            {t("admin.items.edit.save")}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

const getSteps = (core: Core) => {
  const steps = [];

  steps.push({
    label: "General Info",
    component: <GeneralInfo />,
  });
  steps.push({
    label: "Custom Attributes",
    component: <CustomAttributes />,
  });
  if (askForSubItems(core))
    steps.push({
      label: "Sub Items",
      component: <SubItems />,
    });
  if (core.flexibility === false && !askForSubItemSchedule(core))
    steps.push({
      label: "Schedule",
      component: <Schedule />,
    });

  return steps;
};

export default EditItem;
