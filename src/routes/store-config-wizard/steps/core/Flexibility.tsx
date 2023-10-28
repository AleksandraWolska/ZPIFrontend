/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../../types";
import { useStoreConfig } from "../../StoreConfigProvider";
import { calculateProgress } from "./utils";
import * as style from "../commonStyles";

function Flexibility({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { appendCoreAttribute } = useStoreConfig();
  const [showInfo, setShowInfo] = useState(false);
  return (
    <Box sx={style.outerFormBox}>
      <IconButton
        sx={style.backIcon}
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.OWNER;
          setActiveStep(prevStep);
        }}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        sx={style.infoIcon}
        size="small"
        onClick={() => setShowInfo(!showInfo)}
      >
        <InfoIcon />
      </IconButton>
      <Typography variant="h4" sx={style.titleForm}>
        Time frame flexibility
      </Typography>
      <Box margin="10px">
        <Typography sx={style.descriptionForm}>
          Select whether an item's reservation timeframe should be predetermined
          and fixed, or if the user has the flexibility to choose according to
          their preferences.
        </Typography>
        <Collapse in={showInfo} timeout="auto" unmountOnExit>
          <Box sx={style.infoCoreOuterContainer}>
            <Box sx={style.infoCoreBox}>
              <Typography sx={style.infoCoreText}>
                Flexible value means that the item can be reserved for a period
                chosen by user within specified time frames.
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={style.infoCoreBox}>
              <Typography sx={style.infoCoreText}>
                Fixed value indicates that the item has fixed start and end
                times set by an admin, and users can only sign up for the entire
                duration.
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
            appendCoreAttribute("flexibility", true);
            const nextStep = STORE_CONFIG_STEPS.GRANULARITY;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(STORE_CONFIG_STEPS.FLEXIBILITY, nextStep),
            );
          }}
        >
          Flexible
        </Button>
        <Button
          sx={style.choiceButton}
          type="button"
          variant="contained"
          onClick={() => {
            appendCoreAttribute("flexibility", false);
            const nextStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(STORE_CONFIG_STEPS.FLEXIBILITY, nextStep),
            );
          }}
        >
          Fixed
        </Button>
      </Box>
    </Box>
  );
}

export default Flexibility;
