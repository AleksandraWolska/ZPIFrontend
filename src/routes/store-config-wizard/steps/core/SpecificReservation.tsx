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

function SpecificReservation({
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
            calculateProgress(
              STORE_CONFIG_STEPS.SPECIFIC_RESERVATION,
              prevStep,
            ),
          );
        }}
      >
        <ArrowBack />
      </IconButton>
      <Typography variant="h4" sx={style.titleForm}>
        Specific Reservation
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
          This field defines whether users can book specific parts of an item,
          eq. seats for a movie.
        </Typography>
        <Collapse in={showInfo} timeout="auto" unmountOnExit>
          <Box sx={style.infoCoreOuterContainer}>
            <Box sx={style.infoCoreBox}>
              <Typography sx={style.infoCoreText}>
                Select yes if you want users to reserve specific places or parts
                within an item. This is best suited for venues with specific
                seating.
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={style.infoCoreBox}>
              <Typography sx={style.infoCoreText}>
                Select no if you want the item or event to be treated as a
                whole, with no sub-item reservations possible.
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
            appendCoreAttribute("specificReservation", true);
            const nextStep = STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC;
            setActiveStep(nextStep);
            setProgress(100);
          }}
        >
          Yes
        </Button>
        <Button
          sx={style.choiceButton}
          type="button"
          variant="contained"
          onClick={() => {
            appendCoreAttribute("specificReservation", false);
            const nextStep = STORE_CONFIG_STEPS.PERIODICITY;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(
                STORE_CONFIG_STEPS.SPECIFIC_RESERVATION,
                nextStep,
              ),
            );
          }}
        >
          no
        </Button>
      </Box>
    </Box>
  );
}

export default SpecificReservation;
