import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

const getAxiosSettings = (
  additionalSettings?: Partial<AxiosRequestHeaders>
): Partial<AxiosRequestHeaders> => {
  const settings = {
    withCredentials: true,
    // Cookie: document.cookie || "",
    ...additionalSettings,
  };

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
