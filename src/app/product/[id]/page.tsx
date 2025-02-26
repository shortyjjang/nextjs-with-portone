import { fetchProduct } from "@/api/product";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useParams } from "next/navigation";

const initialProduct = {
  title: "",
  description: "",
  ogTitle: "",
  ogImage: "",
  name: "",
  category: "",
  brand: "",
  id: "",
};
// SSR로 상품 데이터를 가져오기
export const getServerSideProps: GetServerSideProps = async (context) => {
    const productId = context.params?.id;
    const queryClient = new QueryClient();
  
    // 서버에서 데이터 미리 가져오기
    await queryClient.prefetchQuery({
      queryKey: ["product", productId],
      queryFn: () => fetchProduct(productId as string)
    });
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
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

export default function ProductPage() {
  const { id } = useParams();
  // 클라이언트에서 동일한 데이터 요청 (이미 캐시에 있음)
  const { data } = useQuery({
    queryKey: ["product", id], 
    queryFn: () => fetchProduct(id as string),
    staleTime: 1000 * 60 * 5 // 5분 동안은 fresh 상태 유지
  });
  
  const product = data || initialProduct;
  
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

      <ProductDetail product={product} />
    </>
  );
}
