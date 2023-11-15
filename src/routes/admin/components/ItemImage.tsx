import NoPhotographyIcon from "@mui/icons-material/NoPhotography";

function ItemImage({ image, title }: { image: string; title: string }) {
  return image ? (
    <img
      src={image}
      alt={title}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  ) : (
    <NoPhotographyIcon sx={{ fontSize: "8rem" }} />
  );
}

export default ItemImage;
