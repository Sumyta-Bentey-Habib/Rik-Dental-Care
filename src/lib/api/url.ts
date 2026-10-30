export type QueryParamValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryParamValue>;

const getApiBaseUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
  const cleanUrl = envUrl.replace(/\/$/, '');
  
  if (cleanUrl.endsWith('/api/v1')) {
    return cleanUrl;
  }
  if (cleanUrl.endsWith('/api')) {
    return `${cleanUrl}/v1`;
  }
  return `${cleanUrl}/api/v1`;
};

export const joinApiUrl = (path: string, query?: QueryParams): string => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return appendQuery(path, query);
  }

  const rootUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

  if (path.startsWith('/api/auth') || path.startsWith('api/auth')) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return appendQuery(`${rootUrl}${cleanPath}`, query);
  }

  const baseUrl = getApiBaseUrl();
  const normalizedPath = path.replace(/^\/?(api\/v1|v1)\/?/, '/').replace(/^\/?/, '/');
  const fullUrl = `${baseUrl}${normalizedPath}`;

  return appendQuery(fullUrl, query);
};

const appendQuery = (url: string, query?: QueryParams): string => {
  if (!query) return url;

  const searchParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  if (!queryString) return url;

  return url.includes('?') ? `${url}&${queryString}` : `${url}?${queryString}`;
};
