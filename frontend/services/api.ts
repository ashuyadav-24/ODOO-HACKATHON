const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
type ApiError = { detail?: string };
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("assetflow_token") : null;
  const response = await fetch(`${API_URL}${path}`, { ...init, headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...init.headers } });
  if (!response.ok) { const error = (await response.json().catch(() => ({}))) as ApiError; throw new Error(error.detail ?? "Something went wrong. Please try again."); }
  return response.json() as Promise<T>;
}
export type AuthResponse = { access_token: string; token_type: string };
export const authApi = { login: (email: string, password: string) => request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }), signup: (payload: { name: string; email: string; password: string; role?: string }) => request<AuthResponse>("/auth/signup", { method: "POST", body: JSON.stringify(payload) }) };
export const healthApi = () => request<{ status: string }>("/health");
