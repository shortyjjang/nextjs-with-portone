import { create } from "zustand";

export interface ProductProps {
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
  quantity: number;
  snap: null;
  score: number;
  options?: {
    optionQuantity: number;
    optionPrice: number;
    selectionCode: string;
    selections: {
      code: string;
      label: string;
      value: string;
    }[];
  }[];
}

const useSelectedItem = create<{
  selectedItem: ProductProps | null;
  setSelectedItem: (item: ProductProps | null) => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
  increaseQuantity: () =>
    set((state) => ({
      selectedItem: state.selectedItem ? {
        ...state.selectedItem,
        quantity: state.selectedItem?.quantity
          ? state.selectedItem.quantity + 1
          : 1,
      } : null,
    })),
  decreaseQuantity: () =>
    set((state) => ({
      selectedItem: state.selectedItem ? {
        ...state.selectedItem,
        quantity: state.selectedItem?.quantity
          ? state.selectedItem.quantity - 1
          : 1,
      } : null,
    })),
}));



export default useSelectedItem;
