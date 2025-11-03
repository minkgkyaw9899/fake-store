import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance } from './axiosInstance';

type RequestModel = {
  [key: string]: any;
};

export type ResponseModel<T> = {
  meta: {
    status: number;
    message: string;
  };
  data: T;
};

const postApi = async <T extends RequestModel, R>(
  url: string,
  reqData: T,
  config?: AxiosRequestConfig<T>,
) => {
  try {
    const response: AxiosResponse<
      ResponseModel<R>,
      T
    > = await axiosInstance.post(url, reqData, config);

    return response.data;
  } catch (err: unknown) {
    throw err;
  }
};

const getApi = async <R>(url: string, config?: AxiosRequestConfig<any>) => {
  try {
    const response: AxiosResponse<
      ResponseModel<R>,
      any
    > = await axiosInstance.get(url, config);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const updateApi = async <T extends RequestModel, R>(
  url: string,
  reqData: T,
  method: 'PATCH' | 'PUT' = 'PATCH',
  config?: AxiosRequestConfig<T>,
) => {
  try {
    let response: AxiosResponse<ResponseModel<R>>;
    switch (method) {
      case 'PATCH': {
        response = await axiosInstance.patch(url, reqData, config);
        return response.data;
      }
      case 'PUT': {
        response = await axiosInstance.put(url, reqData, config);
        return response.data;
      }
      default: {
        throw new Error('Unknown methods');
      }
    }
  } catch (err) {
    throw err;
  }
};

const deleteApi = async <R>(url: string, config?: AxiosRequestConfig<any>) => {
  try {
    const response: AxiosResponse<ResponseModel<R>> =
      await axiosInstance.delete(url, config);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const formDataApi = async <T extends FormData, R>(
  url: string,
  {
    body,
    method = 'post',
    config,
  }: {
    body: T;
    method: 'post' | 'patch' | 'put';
    config?: AxiosRequestConfig<T>;
  },
) => {
  try {
    const response: AxiosResponse<ResponseModel<R>, T> = await axiosInstance[
      method
    ](url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const httpClient = {
  get: getApi,
  post: postApi,
  update: updateApi,
  delete: deleteApi,
  formData: formDataApi,
};
