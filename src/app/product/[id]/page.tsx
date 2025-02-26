import { fetchProduct } from "@/api/product";
import ProductDetail from "@/features/product/ProductDetail";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
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
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      product, // SEO용으로 개별 데이터 전달
    },
  };
};

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
