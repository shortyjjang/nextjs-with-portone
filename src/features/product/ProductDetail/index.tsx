import { fetchProductDetail } from '@/api/product';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react'

export default function ProductDetail() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetail(id as string),
    staleTime: 1000 * 60 * 1,  // 1분 동안은 새로고침해도 서버 요청 X
    gcTime: 1000 * 60 * 10,    // 10분 후 메모리에서 삭제
  });
  return <div>
    <h1>{data?.title}</h1>
    <div>{data?.price}</div>
    <div dangerouslySetInnerHTML={{ __html: (data?.productInfo || "") }} />
  </div>;
}