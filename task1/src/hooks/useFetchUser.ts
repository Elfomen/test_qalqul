import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/users";

export const useFetchUser = (id: number | undefined) =>
  useQuery({
    queryKey: [`FETCH_USER_DETAILS${id}`],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });
