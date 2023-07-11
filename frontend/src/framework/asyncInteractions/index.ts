import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

const getHeaders = (
  additionalHeaders?: Partial<AxiosRequestHeaders>
): Partial<AxiosRequestHeaders> => {
  const token = localStorage.getItem("todoListToken");
  const headers = {
    Authorization: `Bearer ${token}` || "",
    ...additionalHeaders,
  };

  return headers;
};

export const apiGet = async <T>(
  url: string,
  axiosSettings?: Partial<AxiosRequestConfig>
): Promise<AxiosResponse<T>> => {
  const headers = getHeaders(
    axiosSettings?.headers as Partial<AxiosRequestHeaders>
  );
  return axios.get<T>(url, { ...axiosSettings, headers } as AxiosRequestConfig);
};

export const apiPut = async <T, K>(
  url: string,
  payload: T,
  axiosSettings?: AxiosRequestConfig
): Promise<AxiosResponse<K>> => {
  const headers = getHeaders(
    axiosSettings?.headers as Partial<AxiosRequestHeaders>
  );
  return axios.put<K>(url, payload, {
    ...axiosSettings,
    headers,
  } as AxiosRequestConfig);
};

export const apiPost = async <T, K>(
  url: string,
  payload: T,
  axiosSettings?: AxiosRequestConfig
): Promise<AxiosResponse<K>> => {
  const headers = getHeaders(
    axiosSettings?.headers as Partial<AxiosRequestHeaders>
  );
  return axios.post<K>(url, payload, {
    ...axiosSettings,
    headers,
  } as AxiosRequestConfig);
};

export const apiDelete = async <T>(
  url: string,
  axiosSettings?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const headers = getHeaders(
    axiosSettings?.headers as Partial<AxiosRequestHeaders>
  );
  return axios.delete<T>(url, {
    ...axiosSettings,
    headers,
  } as AxiosRequestConfig);
};
