import { ApiError } from './error';
import { joinApiUrl, QueryParams } from './url';

export interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  body?: BodyInit | null;
  json?: unknown;
  query?: QueryParams;
}

const parseJsonSafely = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (!text) return undefined;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

interface BackendErrorBody {
  statusCode?: number;
  message?: string;
  errorSources?: Array<{ path: string | number; message: string }>;
  code?: string;
  details?: unknown;
}

const parseErrorPayload = async (
  response: Response
): Promise<{ message: string; code: string; details: unknown }> => {
  const payload = await parseJsonSafely(response);

  if (payload && typeof payload === 'object') {
    const record = payload as BackendErrorBody;
    const message =
      typeof record.message === 'string' && record.message.trim().length > 0
        ? record.message
        : response.statusText || 'The request failed.';
    const code = typeof record.code === 'string' ? record.code : `HTTP_${response.status}`;
    const details = record.errorSources || record.details || null;

    return { message, code, details };
  }

  return {
    message: typeof payload === 'string' && payload.length > 0 ? payload : response.statusText || 'The request failed.',
    code: `HTTP_${response.status}`,
    details: null,
  };
};

const createRequestInit = (options: ApiRequestOptions = {}): RequestInit => {
  const { json, body, headers, credentials, ...rest } = options;

  if (json !== undefined && body !== undefined) {
    throw new Error('Use either json or body, not both.');
  }

  const requestHeaders = new Headers(headers);
  let requestBody = body;

  if (json !== undefined) {
    requestHeaders.set('Content-Type', 'application/json');
    requestBody = JSON.stringify(json);
  }

  if (!requestHeaders.has('Accept')) {
    requestHeaders.set('Accept', 'application/json');
  }

  return {
    ...rest,
    headers: requestHeaders,
    body: requestBody,
    credentials: credentials ?? 'include',
  };
};

export const apiRequest = async <T = unknown>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> => {
  const url = joinApiUrl(path, options.query);
  const requestInit = createRequestInit(options);

  let response: Response;
  try {
    response = await fetch(url, requestInit);
  } catch (error) {
    throw new ApiError('Unable to connect to the Rik Dental Care server.', {
      status: 0,
      code: 'NETWORK_ERROR',
      cause: error,
    });
  }

  if (!response.ok) {
    const errorPayload = await parseErrorPayload(response);
    throw new ApiError(errorPayload.message, {
      status: response.status,
      code: errorPayload.code,
      details: errorPayload.details,
    });
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const parsed = await parseJsonSafely(response);
  return parsed as T;
};
