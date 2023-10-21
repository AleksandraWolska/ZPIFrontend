import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useEnhancedItems from "./useEnhancedItems";

function ItemList() {
  const enhancedItems = useEnhancedItems();

  return (
    <>
      <p>Length: {enhancedItems.length}</p>
      <br />
      <br />

      {enhancedItems.map((enhancedItem) => {
        return (
          <Card
            key={enhancedItem.item.id}
            sx={{ maxWidth: "800px", marginTop: 2 }}
          >
            <CardContent>
              <Typography>
                {enhancedItem.item.id} - {enhancedItem.item.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`edit/${enhancedItem.item.id}`}>Edit</Link>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}

export default ItemList;
