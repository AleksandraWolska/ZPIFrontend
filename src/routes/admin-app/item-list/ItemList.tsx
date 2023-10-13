import useItems from "./useItems";

function ItemList() {
  const items = useItems();

  return (
    <>
      <p>Length: {items.length}</p>
      <br />
      <br />

      {items.map((item) => {
        return (
          <div key={item.id}>
            {JSON.stringify(item)}
            <br />
            <br />
          </div>
        );
      })}
    </>
  );
}

export default ItemList;
