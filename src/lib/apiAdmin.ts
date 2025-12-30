// src/lib/apiAdmin.ts
// token protected API fetcher  
import { getToken } from "./auth";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8080";

export async function apiAdmin<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  if (!token) {
    throw new Error("401");
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(String(res.status));
  }

  return res.json();
}
