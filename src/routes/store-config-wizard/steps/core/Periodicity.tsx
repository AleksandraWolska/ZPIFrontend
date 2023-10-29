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

function Periodicity({
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
            storeConfig.core.simultaneous === false
              ? STORE_CONFIG_STEPS.SIMULTANEOUS
              : STORE_CONFIG_STEPS.SPECIFIC_RESERVATION;
          withdrawToCoreStep(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.PERIODICITY, prevStep),
          );
        }}
      >
        <ArrowBack />
      </IconButton>
      <Typography variant="h4" sx={style.titleForm}>
        Event Periodicity
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
          This field determines the cyclical nature of events or bookings.
        </Typography>
        <Collapse in={showInfo} timeout="auto" unmountOnExit>
          <Box sx={style.infoCoreOuterContainer}>
            <Box sx={style.infoCoreBox}>
              <Typography sx={style.infoCoreText}>
                Cyclical events are best suited for events that recur over time.
                User can view and book different instances of the same event.
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={style.infoCoreBox}>
              <Typography sx={style.infoCoreText}>
                Non cyclical events is best for one-time events or items. Each
                item is treated as a separate entity without any grouping.
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
            appendCoreAttribute("periodicity", true);
            setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC);
            setProgress(100);
          }}
        >
          Cyclic
        </Button>
        <Button
          sx={style.choiceButton}
          type="button"
          variant="contained"
          onClick={() => {
            appendCoreAttribute("periodicity", false);
            setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC);
            setProgress(100);
          }}
        >
          Noncyclic
        </Button>
      </Box>
    </Box>
  );
}

export default Periodicity;
