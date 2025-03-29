import { User } from "../hooks/users/useUsers";
import { API_CONFIG, fetchWithAuth } from "./shared";

/** 회원 조회 */
export async function getUsers({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
}: {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}): Promise<User[]> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    sortOrder,
  });

  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/users?${params.toString()}`;

  const response = await fetchWithAuth(targetUrl, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("로그인 실패");
  }

  const data = await response.json();
  return data;
}
