export class ApiClient {
  static async get(endpoint: string, options?: RequestInit) {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  static async post(
    endpoint: string,
    data: Record<string, unknown>,
    options?: RequestInit
  ) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...options,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  static async put(
    endpoint: string,
    data: Record<string, unknown>,
    options?: RequestInit
  ) {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...options,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  static async patch(
    endpoint: string,
    data: Record<string, unknown>,
    options?: RequestInit
  ) {
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...options,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  static async delete(endpoint: string) {
    const response = await fetch(endpoint, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return true; // Assuming successful deletion returns true
  }
}
