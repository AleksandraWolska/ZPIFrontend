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

function Granularity({
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
      <Typography variant="h4" sx={style.titleForm}>
        Time Interval Restriction
      </Typography>
      <IconButton
        sx={style.backIcon}
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.FLEXIBILITY;
          withdrawToCoreStep(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.GRANULARITY, prevStep),
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

      <Box margin="10px">
        <Typography sx={style.descriptionCoreForm}>
          This setting decides the flexibility in the length of time an item can
          be reserved. Item can be booked for granular time intervals or allow
          user to freely choose reservation time ranges
        </Typography>
        <Collapse in={showInfo} timeout="auto" unmountOnExit>
          <Box sx={style.infoCoreOuterContainer}>
            <Box sx={style.infoCoreBox}>
              <Typography sx={style.infoCoreText}>
                Granular should be chosen if you want the item to be booked for
                multiplication of specific time intervals, like an hour.
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={style.infoCoreBox}>
              <Typography sx={style.infoCoreText}>
                Continuous shoulb be chosen if you want to allow reservations
                for any length of time. This offers more flexibility for the
                user.
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
            appendCoreAttribute("granularity", true);
            const nextStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(STORE_CONFIG_STEPS.GRANULARITY, nextStep),
            );
          }}
        >
          Granular
        </Button>
        <Button
          sx={style.choiceButton}
          type="button"
          variant="contained"
          onClick={() => {
            appendCoreAttribute("granularity", false);
            const nextStep = STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(STORE_CONFIG_STEPS.GRANULARITY, nextStep),
            );
          }}
        >
          Continuous
        </Button>
      </Box>
    </Box>
  );
}

export default Granularity;
