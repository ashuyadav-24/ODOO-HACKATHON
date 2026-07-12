const API_URL = "http://127.0.0.1:8000";

// ---------------- Signup ----------------

export async function signup(data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Signup failed");
  }

  return result;
}

// ---------------- Login ----------------

export async function login(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Login failed");
  }

  localStorage.setItem("token", result.access_token);

  return result;
}

// ---------------- Assets ----------------

export async function getAssets() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/assets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to fetch assets");
  }

  return result;
}

export async function createAsset(data: any) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/assets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to create asset");
  }

  return result;
}
export async function getAsset(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/assets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed");

  return response.json();
}