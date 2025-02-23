"use client";
import { use, useMemo } from "react";
import CategoryProducts from "@/components/CategoryProduct";
import { useGetCategoriesQuery } from "@/features/products/productsApi";

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);
  
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const currentCategory = useMemo(() => {
    return categories?.find(
      (cat) => cat.category_name.toLowerCase() === resolvedParams.category.toLowerCase()
    );
  }, [categories, resolvedParams]);

  const products = currentCategory?.products || [];

  return (
    <CategoryProducts 
      products={products} 
      categoryName={currentCategory?.category_name} 
    />
  );
}
