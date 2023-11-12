import * as React from "react";
import {
  Unstable_NumberInput as NumberInput,
  NumberInputProps as BaseNumberInputProps,
} from "@mui/base/Unstable_NumberInput";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, alpha, styled } from "@mui/material";

interface NumberInputProps extends BaseNumberInputProps {
  disabled: boolean;
}

const CustomNumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <NumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon />,
          className: "increment",
          disabled: props.disabled,
        },
        decrementButton: {
          children: <RemoveIcon />,
          disabled: props.disabled,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

interface QuantityInputProps {
  onUserCountChange: (value: number) => void;
  value: number;
  disabled: boolean;
}

export default function QuantityInput({
  onUserCountChange,
  value = 1,
  disabled = false,
}: QuantityInputProps) {
  return (
    <Box>
      <Typography variant="overline" sx={{ margin: 0 }}>
        Count
      </Typography>
      <CustomNumberInput
        aria-label="Quantity Input"
        min={1}
        max={99}
        value={value}
        disabled={disabled}
        onChange={(_event, val) => {
          if (typeof onUserCountChange === "function") {
            onUserCountChange(val === undefined ? 1 : val);
          } else {
            console.error("onUserCountChange is not a function!");
          }
        }}
      />{" "}
    </Box>
  );
}

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledInputRoot = styled("div")(
  () => `
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-weight: 400;
  width: min-content;
  color: ${grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  // align-items: center;
`,
);

const StyledInput = styled("input")(
  ({ theme, disabled }) => `
  // font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 2;
  height: 40px;
  color: ${grey[900]};
  background: ${"#fff"};
  border: 1px solid ${grey[300]};
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${theme.palette.primary.main};
  }

  // &:focus {
  //   border-color: ${theme.palette.primary.main};
  // }

  &:focus-visible {

    outline: 0;
  }


  opacity: ${disabled ? "0.5" : "1"};
  cursor: ${disabled ? "not-allowed" : "initial"};
  pointer-events: ${disabled ? "none" : "auto"};

  &:hover {
    border-color: ${disabled ? "initial" : theme.palette.primary.main};
  }
`,
);

const StyledButton = styled("button")(
  ({ theme, disabled }) => `
  font-family: IBM Plex Sans, sans-serif;
  border: 1px solid ${grey[300]};
  color: ${grey[700]};
  background: transparent;
  width: 40px;
  height: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  border-radius: 4px 0 0 4px; // This applies the border-radius only to the left side
  &:hover {
    background: ${alpha(theme.palette.primary.main, 0.1)};
    border: 1px solid ${theme.palette.primary.main};
    cursor: pointer;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
    border-radius: 0 4px 4px 0; // This applies the border-radius only to the right side
  }
  opacity: ${disabled ? "0.5" : "1"};
  cursor: ${disabled ? "not-allowed" : "pointer"};
  pointer-events: ${disabled ? "none" : "auto"};

  &:hover {

  }
`,
);
