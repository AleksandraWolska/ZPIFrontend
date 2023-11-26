import { useQuery } from "react-query";
import { getAccessToken } from "../../../../../auth/utils";
import { BACKEND_URL } from "../../../../../query";

const checkName = async (name: string): Promise<boolean> => {
  const token = getAccessToken();

  const res = await fetch(
    `${BACKEND_URL}/store-configs/nameCheck?name=${name}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.json();
};

const getCheckNameQuery = (name: string) => ({
  queryKey: ["nameCheck", name],
  queryFn: () => checkName(name),
  staleTime: 5,
});

function useCheckName(name: string) {
  const { data } = useQuery(getCheckNameQuery(name)) as { data: boolean };

  return data;
}

export default useCheckName;
