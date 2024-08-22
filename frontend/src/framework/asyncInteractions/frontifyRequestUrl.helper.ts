export const FRONTIFY_URL = (
  controlerUrl: string,
  routeUrl?: string,
  queryParams?: Record<string, string | number | undefined>
): string =>
  `${
    process.env.REACT_APP_API_URL || "no_API_URL_env_defined!"
  }${controlerUrl}${routeUrl || ""}${
    queryParams
      ? `?${new URLSearchParams(
          Object.entries(queryParams || {}).reduce(
            (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
            {}
          )
        ).toString()}`
      : ""
  }`;
