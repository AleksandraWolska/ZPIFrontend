import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
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
          <Card key={item.id} sx={{ maxWidth: "800px", marginTop: 2 }}>
            <CardContent>
              <Typography>
                {item.id} - {item.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`edit/${item.id}`}>Edit</Link>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}

export default ItemList;
