import { queryOptions } from "@tanstack/react-query";
import { fetchProduct, fetchProducts } from "@/lib/shopify";

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: () => fetchProducts(100),
});

export const productQuery = (handle: string) =>
  queryOptions({ queryKey: ["product", handle], queryFn: () => fetchProduct(handle) });
