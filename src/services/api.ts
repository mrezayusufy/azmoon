const BASE_URL: string = "http://173.249.57.172:1403/api";
const CACHE_NAME: string = "ApiCache_v1"; // Cache name for versioning

export class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl = BASE_URL;
  }

  private async cacheFirst(request: Request): Promise<Response> {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
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
