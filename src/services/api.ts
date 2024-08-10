const BASE_URL: string = import.meta.env.VITE_API_URL as string;
const CACHE_NAME: string = "ApiCache_v1"; // Cache name for versioning

export class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl = BASE_URL;
  }

  private async cacheFirst(request: Request): Promise<Response> {
     
    try {
      const networkResponse = await fetch(request);
       
      return networkResponse;
    } catch (error) {
      return new Response("Network error", { status: 500 });
    }
  }

  async get(endpoint: string): Promise<any> {
    const request = new Request(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
    });
    const response = await this.cacheFirst(request);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  async post(endpoint: string, data: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
}
