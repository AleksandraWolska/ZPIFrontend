/* eslint-disable react/no-unescaped-entities */
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

function AllowOverNight({
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
          const prevStep = STORE_CONFIG_STEPS.GRANULARITY;
          withdrawToCoreStep(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT, prevStep),
          );
        }}
      >
        <ArrowBack />
      </IconButton>

      <Typography variant="h4" sx={style.titleForm}>
        Overnight access
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
          Select whether user could have access to an item outside of open
          hours.
        </Typography>
        <Collapse in={showInfo} timeout="auto" unmountOnExit>
          <Box sx={style.infoCoreOuterContainer}>
            <Box sx={style.infoCoreBox}>
              <Typography sx={style.infoCoreText}>
                If yes, user can mantain access to an item outside of store pen
                hours. It's best suited for hotels, and multiday rental (eq.
                cars)
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={style.infoCoreBox}>
              <Typography sx={style.infoCoreText}>
                If no, user can only rent items for time frames within open
                hours of rental place
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
            appendCoreAttribute("allowOverNight", true);
            const nextStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT, nextStep),
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
            appendCoreAttribute("allowOverNight", false);
            const nextStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT, nextStep),
            );
          }}
        >
          false
        </Button>
      </Box>
    </Box>
  );
}

export default AllowOverNight;
