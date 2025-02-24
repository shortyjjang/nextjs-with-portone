import React from "react";
import useSelectedItem, { ProductProps } from "@/store/selectedItem";
import LazyImage from "@/entites/LazyImage";

export default function ProductItem({ item }: { item: ProductProps }) {
  const { setSelectedItem } = useSelectedItem()
  return (
    <div>
      <div className="aspect-square bg-gray-100 relative">
        <LazyImage
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
        <button className="absolute bottom-1 right-1 px-3 py-1 bg-blue-500 text-white rounded-md" onClick={() => setSelectedItem({...item, quantity: 1})}>Buy</button>
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
      <div className="text-black font-bold line-clamp-2">{item.goodsName}</div>
      <div className="text-gray-500 text-sm">
        {(item?.price).toLocaleString()}{" "}
        {item.price !== item.normalPrice && (
          <span className="text-gray-500 line-through">
            {item.normalPrice.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}
