import { Product } from '@/app/home/hooks/useGetProducts';
import { API_LIST } from '@/constants/apiList';
import { httpClient } from '@/utils/httpClient';

export const getProductById = async (id: number) => {
  return await httpClient.get<Product>(`${API_LIST.PRODUCTS}/${id}`);
};
