import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../remote/users";

export interface User {
  id: string;
  accountId: string;
  name: string;
  provider: string;
  createdAt: string;
  deletedAt: string;
  profileImageUrl: string;
}

export default function useUsers({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
}: {
  page: number;
  limit: number;
  sortBy: "name" | "createdAt" | "accountId";
  sortOrder: "asc" | "desc";
}) {
  return useQuery({
    queryKey: ["users", page, limit, sortBy, sortOrder],
    queryFn: () => getUsers({ page, limit, sortBy, sortOrder }),
  });
}
