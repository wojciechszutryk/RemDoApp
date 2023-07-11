export const FRONTIFY_URL = (
  controlerUrl: string,
  routeUrl?: string,
  queryParams?: Record<string, string>,
): string => {
  const baseUrl = process.env.REACT_APP_API_URL || 'no_API_URL_env_defined!';

  return `${baseUrl}${controlerUrl}${routeUrl || ''}${
    queryParams ? `?${new URLSearchParams(queryParams).toString()}` : ''
  }`;
};
