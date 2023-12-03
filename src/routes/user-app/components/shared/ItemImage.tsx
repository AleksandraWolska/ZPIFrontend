type Props = {
  url: string;
};

function ItemImage({ url }: Props) {
  return (
    <img
      src={url}
      alt="item"
      style={{
        width: "100%",
        maxHeight: "100%",
        objectFit: "cover",
      }}
    />
  );
}

export default ItemImage;
