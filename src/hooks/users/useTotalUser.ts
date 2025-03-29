import { useQuery } from "@tanstack/react-query";
import { getUserCount } from "../../remote/users";

export default function useTotalUser() {
  return useQuery({
    queryKey: ["user/count"],
    queryFn: () => getUserCount(),
  });
}
