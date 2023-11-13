import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
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
    <TableRow key={attributeConfig.name}>
      <TableCell
        component="th"
        scope="row"
        sx={{ borderBottom: "none", p: "5px", pr: "10px" }}
      >
        <Typography fontSize="1em">{attributeConfig.name}</Typography>
      </TableCell>
      <TableCell sx={{ borderBottom: "none", p: "5px" }}>
        <Typography fontSize="1em" fontWeight="bold">
          {displayValue}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

function AttributesList({
  itemAttributes,
  attributesConfig,
}: AttributesListProps) {
  return (
    <Table>
      <TableBody>
        {itemAttributes.map((itemAttribute) => {
          const currentAttrConfig = attributesConfig.find(
            (p) => p.name === itemAttribute.name,
          );
          if (!currentAttrConfig || !currentAttrConfig.showMainPage)
            return null;

          return renderParameter(currentAttrConfig, itemAttribute);
        })}
      </TableBody>
    </Table>
  );
}

export default AttributesList;
