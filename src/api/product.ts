export const fetchProduct = async (productId: string) => {
  const response = await fetch(`/api/products/${productId}`);
  const data:Product = await response.json();
  return data;
};

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  stock: number;
  title: string;
  ogImage: string;
  ogTitle: string;
  reviews: Review[];
  relatedProducts: Product[];
}

interface Review {
  id: string;
  rating: number;
  comment: string;
}


//	1.	상품 기본 정보
// •	id, name, price, description, category, brand, stock
// •	상품명, 가격, 설명, 카테고리 등 기본적인 상품 정보
// •	한 번 로딩되면 자주 바뀌지 않기 때문에 SSR 적합
// 2.	SEO 메타데이터
// •	title, meta description, og:image, og:title 등
// •	검색 엔진 최적화(SEO)를 위해 SSR이 필수
// 3.	상품 이미지 및 썸네일
// •	대형 이미지 파일은 미리 받아오면 사용자 경험(UX) 향상
// 4.	초기 리뷰 및 평점
// •	첫 5개 리뷰만 SSR로 미리 가져오고, 나머지는 CSR에서 무한 스크롤 적용
// 5.	관련 상품 목록 (추천 상품)
// •	같은 카테고리의 인기 상품 등
// 6.	재고 여부 (stock 정보)
// •	상품이 품절 상태인지 여부