import { useState } from "react";
import { Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";

function Granularity({
  granularity,
  setGranularity,
}: {
  granularity: number;
  setGranularity: (granularity: number) => void;
}) {
  const [granularityEnabled, setGranularityEnabled] = useState(granularity > 0);

  return (
    <Stack direction="row">
      <FormControlLabel
        control={
          <Checkbox
            checked={granularityEnabled}
            onChange={(e) => {
              const enabled = e.target.checked;

              if (!enabled) setGranularity(0);

              setGranularityEnabled(enabled);
            }}
          />
        }
        label="granularity enabled"
      />

      {granularityEnabled && (
        <TextField
          type="number"
          label="granularity"
          value={granularity}
          onChange={(e) => setGranularity(Number(e.target.value))}
        />
      )}
    </Stack>
  );
}

export default Granularity;
