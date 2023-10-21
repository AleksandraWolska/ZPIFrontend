import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useItemSchemas from "./useItemSchemas";

function ItemList() {
  const schemas = useItemSchemas();

  return (
    <>
      <p>Length: {schemas.length}</p>
      <br />
      <br />

      {schemas.map((schema) => {
        return (
          <Card key={schema.item.id} sx={{ maxWidth: "800px", marginTop: 2 }}>
            <CardContent>
              <Typography>
                {schema.item.id} - {schema.item.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`edit/${schema.item.id}`}>Edit</Link>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}

export default ItemList;
