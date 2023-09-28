// Mocks.tsx
import { useQuery } from "react-query";
import { mocksQuery } from "./mocksLoader";

function Mocks() {
  const { data, isError, isLoading } = useQuery(mocksQuery);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Mocks;
