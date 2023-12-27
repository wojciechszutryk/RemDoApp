import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import {
  ACCESS_LINK_HEADER,
  SHARE_HASH_PARAM,
} from "linked-models/accessLink/accessLink.url";

const getAxiosSettings = (
  additionalSettings?: Partial<AxiosRequestHeaders>
): Partial<AxiosRequestHeaders> => {
  const hash = window.location.hash.substring(1); // Remove the '#' character
  const hashUrl = new URL(process.env.REACT_APP_URL! + hash);

  const searchParams = hashUrl.searchParams;
  const accessToken = searchParams.get(SHARE_HASH_PARAM);

  const settings = {
    withCredentials: true,
    // Cookie: document.cookie || "",
    ...additionalSettings,
    headers: {
      ...additionalSettings?.headers,
    },
  };

  if (accessToken) {
    settings.headers[ACCESS_LINK_HEADER] = accessToken;
  }

  return settings;
};

export const apiGet = async <T>(
  url: string,
  axiosSettings?: Partial<AxiosRequestConfig>
): Promise<AxiosResponse<T>> => {
  return axios.get<T>(url, {
    ...getAxiosSettings(axiosSettings),
  } as AxiosRequestConfig);
};

export const apiPut = async <T, K>(
  url: string,
  payload: T,
  axiosSettings?: AxiosRequestConfig
): Promise<AxiosResponse<K>> => {
  return axios.put<K>(url, payload, {
    ...getAxiosSettings(axiosSettings),
  } as AxiosRequestConfig);
};

export const apiPost = async <T, K>(
  url: string,
  payload: T,
  axiosSettings?: AxiosRequestConfig
): Promise<AxiosResponse<K>> => {
  console.log(getAxiosSettings(axiosSettings));

  return axios.post<K>(url, payload, {
    ...getAxiosSettings(axiosSettings),
  } as AxiosRequestConfig);
};

export const apiDelete = async <T>(
  url: string,
  axiosSettings?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axios.delete<T>(url, {
    ...getAxiosSettings(axiosSettings),
  } as AxiosRequestConfig);
};
