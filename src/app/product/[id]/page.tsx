import { fetchProduct } from "@/api/product";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

const initialProduct = {
  title: "",
  description: "",
  ogTitle: "",
  ogImage: "",
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productId = context.params?.id as string;
  const queryClient = new QueryClient();

  const product = await fetchProduct(productId);
  await queryClient.prefetchQuery({
    queryKey: ["product", productId],
    queryFn: () => ({
      ...initialProduct,
      ...product,
    }),
    staleTime: 1000 * 60 * 5,  // 5분 동안은 새로고침해도 서버 요청 X
    gcTime: 1000 * 60 * 30,    // 30분 후 메모리에서 삭제
  });
  //  •	일반 상품 상세: staleTime: 5분, gcTime: 30분
  //  •	빠르게 변하는 데이터 (ex: 재고, 가격): staleTime: 1분, gcTime: 10분
  //  •	거의 변하지 않는 데이터 (ex: 브랜드, 설명): staleTime: 10~30분, gcTime: 1시간~24시간
  //  •	사용자별 데이터 (ex: 개인 할인): staleTime: 0, gcTime: 5~10분

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      product, // SEO용으로 개별 데이터 전달
    },
  };
};

const ProductDetail = dynamic(
  () => import("@/features/product/ProductDetail"),
  {
    ssr: false, // 서버 사이드 렌더링 방지 (클라이언트에서만 로드)
    loading: () => <p>Loading...</p>, // 로딩 중 표시할 UI
  }
);

export default function ProductPage({ product }: { product: any }) {
  return (
    <>
      <Head>
        {/* 기본 메타 태그 */}
        <title>{product.title}</title>
        <meta name="description" content={product.description} />

        {/* Open Graph (OG) 메타 태그 */}
        <meta property="og:title" content={product.ogTitle || product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.ogImage} />
        <meta property="og:type" content="product" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_URL}/product/${product.id}`}
        />

        {/* Twitter 메타 태그 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.ogTitle || product.title} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.ogImage} />

        {/* 기타 SEO 최적화 */}
        <meta
          name="keywords"
          content={`${product.name}, ${product.category}, ${product.brand}, 쇼핑`}
        />
        <meta name="author" content={product.brand} />
      </Head>

      <ProductDetail />
    </>
  );
}
