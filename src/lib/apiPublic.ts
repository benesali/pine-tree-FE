// src/lib/apiPublic.ts
// clean public no token API fetcher
const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8080";


export async function apiPublic<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(String(res.status));
  }

  return res.json();
}
