"use client";

// import Section from "@/entites/Section";
// import Title from "@/entites/Title";
// import NpayButton from "@/widget/portone/NpayButton";
// import Payment from "@/widget/portone/Payment";
// import PaymentProvider, { ProductProps } from "@/widget/portone/PaymentProvider";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Image from "next/image";
import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import {  useState } from "react";

// Create a client
const queryClient = new QueryClient();

async function fetchProducts(page: number) {
  const response = await fetch(`/api/products?page=${page}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function Home() {
  // const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [products, setProducts] = useState<
    {
      goodsNo: number;
      goodsName: string;
      goodsLinkUrl: string;
      thumbnail: string;
      displayGenderText: string;
      isSoldOut: boolean;
      normalPrice: number;
      price: number;
      saleRate: number;
      brand: string;
      brandName: string;
      brandLinkUrl: string;
      reviewCount: number;
      reviewScore: number;
      isOptionVisible: boolean;
      isAd: boolean;
      infoLabelList: [];
      imageLabelList: [];
      clickTrackers: [];
      impressionTrackers: [];
      snap: null;
      score: number;
    }[]
  >([]);

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
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-cols-3 gap-4">
        {products.map((item) => (
          <div key={item.goodsNo}>
            <div className="aspect-square bg-gray-100 relative">
              <Image
                src={item.thumbnail}
                alt={item.goodsName}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={true}
              />
              {item.isAd && (
                <span className="text-red-500 absolute bottom-0 left-0">AD</span>
              )}
            </div>
            <div className="text-gray-500 text-sm flex justify-between mt-2">
              <div>{item.brandName}</div>
              <div>
                <b className="text-red-500 font-bold">
                  ★ {(item?.reviewScore || 0).toLocaleString()}
                </b>
                ({(item?.reviewCount || 0).toLocaleString()})
              </div>
            </div>
            <div className="text-black font-bold line-clamp-2">
              {item.goodsName}
            </div>
            <div className="text-gray-500 text-sm">
              {(item?.price).toLocaleString()}{" "}
              {item.price !== item.normalPrice && (
                <span className="text-gray-500 line-through">
                  {item.normalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </QueryClientProvider>
  );

}
