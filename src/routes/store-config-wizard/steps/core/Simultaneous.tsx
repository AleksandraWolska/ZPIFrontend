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
      </IconButton>{" "}
      <Typography variant="h4" sx={style.titleForm}>
        Simultaneous Access
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
          This field determines whether multiple users can be signed up for an
          item at the same time. It is crucial for managing the accessibility of
          your item.
        </Typography>
        <Collapse in={showInfo} timeout="auto" unmountOnExit>
          <Box sx={style.infoCoreOuterContainer}>
            <Box sx={style.infoCoreBox}>
              <Typography sx={style.infoCoreText}>
                Shared access should be chosen is want multiple individuals to
                access the item simultaneously. This is best suited for items
                that can be shared, like a public spaces.
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={style.infoCoreBox}>
              <Typography sx={style.infoCoreText}>
                Exclusive access should be chosen if you want allow only one
                user at the time to access the item, ensuring that the user has
                the item all to themselves.
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
          Shared
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
          Exclusive
        </Button>
      </Box>
    </Box>
  );
}

export default Simultaneous;
