import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useState } from "react";

import { STORE_CONFIG_STEPS, StoreConfigStep } from "../../types";
import { useStoreConfig } from "../../StoreConfigProvider";
import { calculateProgress } from "./utils";
import * as style from "../commonStyles";

function Uniqueness({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { appendCoreAttribute, withdrawToCoreStep } = useStoreConfig();
  const [showInfo, setShowInfo] = useState(false);
  return (
    <Box sx={style.outerFormBox}>
      <IconButton
        sx={style.backIcon}
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
          withdrawToCoreStep(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.UNIQUENESS, prevStep),
          );
        }}
      >
        <ArrowBack />
      </IconButton>
      <Typography variant="h4" sx={style.titleForm}>
        Item Uniqueness
      </Typography>
      <IconButton
        sx={style.infoIcon}
        size="small"
        onClick={() => setShowInfo(!showInfo)}
      >
        <InfoIcon />
      </IconButton>
      <Box margin="10px">
        <Typography sx={style.descriptionCoreForm}>
          This option defines whether the item is a unique entity or if there
          are multiple indistinguishable items available for users.
        </Typography>
        <Collapse in={showInfo} timeout="auto" unmountOnExit>
          <Box sx={style.infoCoreOuterContainer}>
            <Box sx={style.infoCoreBox}>
              <Typography sx={style.infoCoreText}>
                You have one specific item of a type. This is best suited for
                unique items or services.
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={style.infoCoreBox}>
              <Typography sx={style.infoCoreText}>
                There are multiple, identical items available. This is best
                suited for items like chairs in a rental place.
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Box>
      <Box sx={style.choiceButtonContainer}>
        <Button
          sx={style.choiceButton}
          variant="contained"
          onClick={() => {
            appendCoreAttribute("uniqueness", true);
            setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC);
            setProgress(100);
          }}
        >
          yes
        </Button>
        <Button
          sx={style.choiceButton}
          type="button"
          variant="contained"
          onClick={() => {
            appendCoreAttribute("uniqueness", false);
            setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC);
            setProgress(100);
          }}
        >
          no
        </Button>
      </Box>
    </Box>
  );
}

export default Uniqueness;
