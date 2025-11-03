import { Product } from '@/app/home/hooks/useGetProducts';
import { API_LIST } from '@/constants/apiList';
import { httpClient } from '@/utils/httpClient';
import omit from 'lodash.omit';
import { ProductFormField } from '../schemas';

export type UpdateProductRequest = ProductFormField & {
  id: number;
  image?: {
    uri: string;
    type: string;
    name: string;
  };
};

export const updateProductById = async (reqData: UpdateProductRequest) => {
  const form = new FormData();

  const omittedReqData = omit(reqData, ['id', 'image']);

  Object.entries(omittedReqData).forEach(([key, value]) => {
    form.append(key, String(value));
  });

  if (reqData.image) {
    form.append('image', {
      type: reqData.image.type,
      name: reqData.image.name,
      uri: reqData.image.uri,
    });
  }

  return await httpClient.formData<typeof form, Product>(
    `${API_LIST.PRODUCTS}/${reqData.id}`,
    {
      body: form,
      method: 'patch',
    },
  );
};
