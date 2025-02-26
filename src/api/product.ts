export const fetchProduct = async (productId: string) => {
  const response = await fetch(`/api/products/${productId}`);
  const data:Product = await response.json();
  return data;
};

export const fetchProductDetail = async (productId: string) => {
  const response = await fetch(`/api/products/${productId}`);
  const data:ProductDetail = await response.json();
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

interface ProductDetail extends Product {
    price: number;
    stock: number;
    productInfo: string;
}
//👉 주로 유저에 따라 동적으로 변하는 데이터는 클라이언트에서 받아오는 것이 좋음.

//      🔹 CSR로 가져올 데이터 (클라이언트에서 API 요청)
// 1.	유저별 장바구니 상태
// •	사용자가 해당 상품을 장바구니에 담았는지 여부
// •	로그인한 유저의 개인 데이터이므로 CSR로 관리
// 2.	로그인한 유저의 구매 이력
// •	이 상품을 이전에 구매한 적 있는지 확인
// 3.	실시간 재고 정보 (빠르게 바뀌는 데이터)
// •	stock이 실시간으로 변동하는 경우 클라이언트에서 주기적으로 요청
// 4.	리뷰 목록 (페이징 또는 무한 스크롤)
// •	첫 5개 리뷰만 SSR에서 받아오고, 이후 리뷰는 CSR에서 Infinite Scroll로 가져오기
// 5.	상품 문의 및 답변 (Q&A)
// •	최신 질문을 클라이언트에서 요청하여 실시간 반영
// 6.	추천 상품 (유저 맞춤형)
// •	로그인한 유저의 관심사에 따라 개인화된 추천 상품을 CSR로 로드

interface Review {
  id: string;
  rating: number;
  comment: string;
}

