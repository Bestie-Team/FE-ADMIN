import { API_CONFIG } from "./shared";

/** 로그인 */
export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();

  const targetUrl = `${baseUrl}/auth/login`;
  const response = await fetch(targetUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error fetching users: ${response.statusText}`);
  }
  if (response.status === 201) {
    return "로그인 성공";
  }
}
