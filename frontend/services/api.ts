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
export async function deleteAsset(id: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/assets/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Delete failed");
}
// ---------------- Dashboard ----------------

export async function getDashboardSummary() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/dashboard/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail);
  }

  return result;
}

export async function getRecentActivities() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/dashboard/recent-activities`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail);
  }

  return result;
}

// ---------------- Current User ----------------

export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to fetch user");
  }

  return result;
}


// ===================== Maintenance =====================

// ---------------- Maintenance ----------------

export async function getMaintenance() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/maintenance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to fetch maintenance");
  }

  return result;
}

export async function createMaintenance(data: {
  asset_id: string;
  assigned_to: string;
  issue: string;
  description: string;
  priority: string;
  scheduled_date: string;
}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/maintenance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to create maintenance");
  }

  return result;
}

export async function deleteMaintenance(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/maintenance/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to delete maintenance");
  }

  return result;
}