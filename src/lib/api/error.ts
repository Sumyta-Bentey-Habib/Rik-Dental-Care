export interface ApiErrorOptions {
  status?: number;
  code?: string;
  details?: unknown;
  cause?: unknown;
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details: unknown;

  constructor(message: string, options: ApiErrorOptions = {}) {
    super(message, { cause: options.cause });
    this.name = 'ApiError';
    this.status = options.status ?? 0;
    this.statusCode = options.status ?? 0;
    this.code = options.code ?? 'API_ERROR';
    this.details = options.details ?? null;
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};
