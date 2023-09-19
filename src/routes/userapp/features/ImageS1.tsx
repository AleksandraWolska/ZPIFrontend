import { Box } from "@mui/material";

type Props = {
  url: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ImageS1({ url }: Props) {
  return (
    <Box
      width={40}
      height={40}
      borderRadius="50%"
      bgcolor="blue"
      marginRight={2}
    />
  );
}

export default ImageS1;
