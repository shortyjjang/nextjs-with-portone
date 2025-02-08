"use client";

import useSelectedItem, { ProductProps } from "@/store/selectedItem";
import PaymentModal from "@/widget/product/PaymentModal";
import ProductItem from "@/widget/product/ProductItem";
import {
  useQuery,
} from "@tanstack/react-query";
import React, { useState, useEffect } from "react";


export default function Home() {
  const { selectedItem } = useSelectedItem();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [products, setProducts] = useState<ProductProps[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: async () => {
      if (totalPages <= currentPage) return [];
      const request = await fetch(`/api/product?page=${currentPage}`).then(
        (res) => res.json()
      );
      setTotalPages(request.total_pages);
      return request.lists;
    },
    staleTime: 5000,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setProducts((prevProducts) => [...prevProducts, ...(data || [])]);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((item) => (
        <ProductItem key={item.goodsNo} item={item} />
      ))}
      <button onClick={() => setCurrentPage(currentPage + 1)}>더보기</button>
      {selectedItem && <PaymentModal />}
    </div>
  );
}
