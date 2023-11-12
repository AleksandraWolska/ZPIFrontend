import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { CustomAttribute, CustomAttributeSpec } from "../../../../types";

type AttributesListProps = {
  itemAttributes: CustomAttribute[];
  attributesConfig: CustomAttributeSpec[];
};

const renderParameter = (
  attributeConfig: CustomAttributeSpec,
  itemAttribute: CustomAttribute,
  themeColor: string,
) => {
  let displayValue;

  switch (attributeConfig.dataType) {
    case "string":
      displayValue = itemAttribute.value;
      break;
    case "boolean":
      displayValue = itemAttribute.value ? <CheckIcon /> : <ClearIcon />;
      break;
    case "number":
      displayValue = `${itemAttribute.value} ${attributeConfig.units || ""}`;
      break;
    default:
      displayValue = itemAttribute.value;
  }

  return (
    <TableRow
      sx={{
        "&:nth-of-type(odd)": {
          backgroundColor: `${themeColor}`,
        },
      }}
      key={attributeConfig.name}
    >
      <TableCell component="th" scope="row" style={{ borderBottom: "none" }}>
        <Typography>{attributeConfig.name}</Typography>
      </TableCell>
      <TableCell style={{ borderBottom: "none" }}>
        <Typography fontWeight="bold">{displayValue}</Typography>
      </TableCell>
    </TableRow>
  );
};

function AttributesList({
  itemAttributes,
  attributesConfig,
}: AttributesListProps) {
  const theme = useTheme();
  return (
    <Table>
      <TableBody>
        {itemAttributes.map((itemAttribute) => {
          const currentAttrConfig = attributesConfig.find(
            (p) => p.name === itemAttribute.name,
          );
          if (!currentAttrConfig || !currentAttrConfig.showDetailsPage)
            return null;

          return renderParameter(
            currentAttrConfig,
            itemAttribute,
            alpha(theme.palette.primary.main, 0.2),
          );
        })}
      </TableBody>
    </Table>
  );
}

export default AttributesList;
