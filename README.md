# Next.js PortOne B2C Project

이 프로젝트는 포트원 결제와 주문형 네이버페이를 통합한 B2C 웹 애플리케이션입니다. 상태 관리는 `zustand`를 사용하여 구현되었습니다.

## 프로젝트 구조
src/
├── app/
│ ├── api/
│ │ └── [...pathname]/
│ │ └── route.ts
│ ├── payment/
│ │ └── page.tsx
│ ├── widget/
│ │ ├── portone/
│ │ │ └── PortoneButton.tsx
│ │ └── product/
│ │ ├── PaymentModal.tsx
│ │ └── ProductItem.tsx
│ ├── globals.css
│ ├── layout.tsx
│ ├── page.tsx
│ └── QueryProvider.tsx
├── entites/
│ ├── Section.tsx
│ ├── Select.tsx
│ ├── SubTitle.tsx
│ └── Title.tsx
├── lib/
│ └── payment/
│ ├── callback.ts
│ └── getOrderId.ts
├── store/
│ ├── auth.ts
│ ├── payParam.ts
│ └── selectedItem.ts
└── package.json

## 파일 설명

### `src/app/`

- **api/[...pathname]/route.ts**: API 라우트로, 상품 데이터를 제공하는 역할을 합니다.
- **payment/page.tsx**: 결제 페이지 컴포넌트로, 주문 정보를 표시하고 결제 기능을 제공합니다.
- **widget/portone/PortoneButton.tsx**: 포트원 결제 버튼 컴포넌트로, 결제 요청을 처리합니다.
- **widget/product/PaymentModal.tsx**: 결제 모달 컴포넌트로, 선택된 상품의 결제 정보를 입력받습니다.
- **widget/product/ProductItem.tsx**: 개별 상품 아이템을 표시하는 컴포넌트입니다.
- **globals.css**: 전역 스타일을 정의하는 CSS 파일입니다.
- **layout.tsx**: 애플리케이션의 레이아웃을 정의하는 컴포넌트입니다.
- **page.tsx**: 메인 페이지 컴포넌트로, 상품 목록을 표시합니다.
- **QueryProvider.tsx**: React Query의 `QueryClientProvider`를 설정하는 컴포넌트입니다.

### `src/entites/`

- **Section.tsx**: 섹션 레이아웃을 제공하는 컴포넌트입니다.
- **Select.tsx**: 커스텀 셀렉트 박스 컴포넌트입니다.
- **SubTitle.tsx**: 서브 타이틀을 표시하는 컴포넌트입니다.
- **Title.tsx**: 타이틀을 표시하는 컴포넌트입니다.

### `src/lib/payment/`

- **callback.ts**: 결제 콜백을 처리하는 함수입니다.
- **getOrderId.ts**: 주문 ID를 생성하는 함수입니다.

### `src/store/`

- **auth.ts**: 사용자 인증 정보를 관리하는 zustand 스토어입니다.
- **payParam.ts**: 결제 파라미터를 관리하는 zustand 스토어입니다.
- **selectedItem.ts**: 선택된 상품 정보를 관리하는 zustand 스토어입니다.

### `package.json`

- 프로젝트의 의존성과 스크립트를 정의하는 파일입니다.

## 사용 기술

- **Next.js**: React 기반의 프레임워크로, 서버 사이드 렌더링과 정적 사이트 생성을 지원합니다.
- **zustand**: 간단하고 직관적인 상태 관리 라이브러리입니다.
- **@tanstack/react-query**: 서버 상태를 관리하고 데이터 페칭을 최적화하는 라이브러리입니다.
- **포트원 결제**: 다양한 결제 수단을 지원하는 결제 솔루션입니다.
- **Tailwind CSS**: 유틸리티 기반의 CSS 프레임워크로, 빠른 스타일링을 지원합니다.

이 프로젝트는 포트원 결제와 네이버페이를 통합하여 사용자에게 원활한 결제 경험을 제공합니다. 각 컴포넌트와 모듈은 명확한 역할을 가지고 있으며, zustand를 통해 상태를 효율적으로 관리합니다.