import { useMemo } from 'react';
import { useGetProducts } from './useGetProducts';

export const useProductCategories = () => {
  const {
    data: products,
    isPending,
    error,
  } = useGetProducts({ subscribeOnFocusOnly: true });

  // unique category list
  const categories = useMemo(() => {
    if (!products) return [];
    const categoryList = products.map(item => item.category);
    return [...new Set(categoryList)];
  }, [products]);

  // products grouped by category
  const productsByCategory = useMemo(() => {
    if (!products) return {};
    const grouped: Record<string, typeof products> = {};
    for (const category of categories) {
      grouped[category] = products.filter(p => p.category === category);
    }
    return grouped;
  }, [products, categories]);

  return {
    categories,
    productsByCategory,
    isPending,
    error,
    allProducts: products,
  };
};
