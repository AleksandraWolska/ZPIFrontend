import { Box, Collapse, Divider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";

const InfoBox = styled(Box)(({ theme }) => ({
  width: "50%",
  padding: theme.spacing(2.5),
}));

const InfoText = styled(Typography)({
  textAlign: "center",
  opacity: ".7",
});

function CoreInfo({
  show,
  left,
  right,
}: {
  show: boolean;
  left: string;
  right: string;
}) {
  return (
    <Collapse in={show} timeout="auto" unmountOnExit>
      <Stack direction="row" justifyContent="space-between">
        <InfoBox>
          <InfoText>{left}</InfoText>
        </InfoBox>

        <Divider orientation="vertical" flexItem />

        <InfoBox>
          <InfoText>{right}</InfoText>
        </InfoBox>
      </Stack>
    </Collapse>
  );
}

export default CoreInfo;
