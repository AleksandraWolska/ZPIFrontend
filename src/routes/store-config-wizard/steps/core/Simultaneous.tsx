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

function Simultaneous({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { storeConfig, appendCoreAttribute, withdrawToCoreStep } =
    useStoreConfig();
  const [showInfo, setShowInfo] = useState(false);
  return (
    <Box sx={style.outerFormBox}>
      <IconButton
        sx={style.backIcon}
        onClick={() => {
          const prevStep =
            storeConfig.core.allowOverNight !== undefined
              ? STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT
              : storeConfig.core.granularity !== undefined
              ? STORE_CONFIG_STEPS.GRANULARITY
              : STORE_CONFIG_STEPS.FLEXIBILITY;
          withdrawToCoreStep(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.SIMULTANEOUS, prevStep),
          );
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
        simultaneus
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
            appendCoreAttribute("simultaneous", true);
            const nextStep =
              storeConfig.core.flexibility === false
                ? STORE_CONFIG_STEPS.SPECIFIC_RESERVATION
                : STORE_CONFIG_STEPS.UNIQUENESS;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(STORE_CONFIG_STEPS.SIMULTANEOUS, nextStep),
            );
          }}
        >
          true
        </Button>
        <Button
          sx={style.choiceButton}
          type="button"
          variant="contained"
          onClick={() => {
            appendCoreAttribute("simultaneous", false);
            const nextStep =
              storeConfig.core.flexibility === false
                ? STORE_CONFIG_STEPS.PERIODICITY
                : STORE_CONFIG_STEPS.UNIQUENESS;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(STORE_CONFIG_STEPS.SIMULTANEOUS, nextStep),
            );
          }}
        >
          False
        </Button>
      </Box>
    </Box>
  );
}

export default Simultaneous;
