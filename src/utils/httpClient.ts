import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance } from './axiosInstance';

type RequestModel = {
  [key: string]: any;
};

export type ResponseModel = {
  [key: string]: any;
};

const postApi = async <T extends RequestModel, R extends ResponseModel>(
  url: string,
  reqData: T,
  config?: AxiosRequestConfig<T>,
) => {
  try {
    const response: AxiosResponse<R, T> = await axiosInstance.post(
      url,
      reqData,
      config,
    );

    return response.data;
  } catch (err: unknown) {
    throw err;
  }
};

const getApi = async <R extends ResponseModel>(
  url: string,
  config?: AxiosRequestConfig<any>,
) => {
  try {
    const response: AxiosResponse<R, any> = await axiosInstance.get(
      url,
      config,
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

const updateApi = async <T extends RequestModel, R extends ResponseModel>(
  url: string,
  reqData: T,
  method: 'PATCH' | 'PUT' = 'PUT',
  config?: AxiosRequestConfig<T>,
) => {
  try {
    let response: AxiosResponse<R>;
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

const deleteApi = async <R extends ResponseModel>(
  url: string,
  config: AxiosRequestConfig<any>,
) => {
  try {
    const response: AxiosResponse<R> = await axiosInstance.delete(url, config);
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
};
