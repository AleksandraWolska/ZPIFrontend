import NoPhotographyIcon from "@mui/icons-material/NoPhotography";

function ItemImage({ image, title }: { image: string; title: string }) {
  return image ? (
    <img
      src={image}
      alt={title}
      style={{
        minWidth: "100%",
        minHeight: "100%",
        margin: "auto",
        objectFit: "cover",
      }}
    />
  ) : (
    <NoPhotographyIcon sx={{ fontSize: "8rem" }} />
  );
}

export default ItemImage;
