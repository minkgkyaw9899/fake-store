import { PaginationResponse } from '@/utils/getNextPageParam';
import { Product } from '../hooks/useGetProducts';
import { httpClient } from '@/utils/httpClient';
import { API_LIST } from '@/constants/apiList';

type ProductByCategoryResponse = PaginationResponse & {
  products: Product[];
};

export const getProductByCategory = async ({
  pageParam = 1,
  selectedCategory = '',
}) => {
  return await httpClient.get<ProductByCategoryResponse>(
    `${API_LIST.PRODUCTS_BY_CATEGORY}/${selectedCategory}?page=${pageParam}`,
  );
};
