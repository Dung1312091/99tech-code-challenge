export interface ApiRequestConfig {
  params?: Record<string, string>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string,
  ) {
    super(message ?? `HTTP ${status}: ${statusText}`);
    this.name = "ApiError";
  }
}

export class ApiClient {
  constructor(private baseUrl = "") {}

  async get<T>(path: string, config?: ApiRequestConfig): Promise<T> {
    const url = this.buildUrl(path, config?.params);
    const res = await fetch(url, {
      method: "GET",
      headers: config?.headers,
      signal: config?.signal,
    });

    if (!res.ok) throw new ApiError(res.status, res.statusText);
    return res.json() as Promise<T>;
  }

  async post<T>(
    path: string,
    body?: unknown,
    config?: ApiRequestConfig,
  ): Promise<T> {
    const url = this.buildUrl(path, config?.params);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...config?.headers },
      body: body ? JSON.stringify(body) : undefined,
      signal: config?.signal,
    });

    if (!res.ok) throw new ApiError(res.status, res.statusText);
    return res.json() as Promise<T>;
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(path, this.baseUrl || undefined);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
      }
    }
    return url.toString();
  }
}

export const apiClient = new ApiClient();
