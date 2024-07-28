import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";

export const useFetchUser = (id: number | undefined) =>
  useQuery({
    queryKey: [`FETCH_USER_DETAILS${id}`],
    queryFn: () => fetchUsers(id),
    enabled: !!id,
  });
