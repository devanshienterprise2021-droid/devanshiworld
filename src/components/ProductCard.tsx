import React from "react";
import { Star, ShoppingBag, Info, ShieldAlert } from "lucide-react";
import { ToyProduct } from "../types";

interface ProductCardProps {
  key?: string | number;
  product: ToyProduct;
  onViewDetails: (product: ToyProduct) => void;
  onAddToCart: (product: ToyProduct) => void;
}

export function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-50 border-b border-stone-100">
        
        {/* Category Badge overlay */}
        <span className="absolute left-3 top-3 z-10 rounded-full bg-stone-900/80 px-2.5 py-0.5 text-[11px] font-semibold text-stone-50 backdrop-blur-xs uppercase tracking-wider">
          {product.category}
        </span>

        {/* Age limit badge */}
        <span className="absolute right-3 top-3 z-10 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-100 uppercase">
          {product.recommendedAge}
        </span>

        {/* Product main dynamic image */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => onViewDetails(product)}
          referrerPolicy="no-referrer"
        />

        {/* Out of stock tag */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs">
            <span className="rounded-md bg-stone-950 px-3 py-1 text-xs font-bold text-stone-100 uppercase tracking-wide">
              Restocking Soon
            </span>
          </div>
        )}
      </div>

      {/* Product Information Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Rating info */}
        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3.5 w-3.5 fill-current ${
                  i < Math.floor(product.rating) ? "text-amber-400" : "text-stone-200"
                }`} 
              />
            ))}
          </div>
          <span className="text-xs font-bold text-stone-500">{product.rating}</span>
          <span className="text-[11px] text-stone-400">({product.reviews.length || 3})</span>
        </div>

        {/* Product name & teaser */}
        <h3 
          onClick={() => onViewDetails(product)}
          className="font-sans text-base font-bold text-stone-900 hover:text-emerald-700 cursor-pointer line-clamp-1 transition-colors"
        >
          {product.name}
        </h3>
        
        <p className="mt-1 text-xs text-stone-500 font-sans line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Materials reference */}
        <div className="mt-2 text-[11px] text-stone-400 font-medium">
          Source: <span className="text-stone-600 font-sans font-semibold">{product.materials.split("&")[0].trim()}</span>
        </div>

        {/* Stock status indicator */}
        {isLowStock && (
          <p className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-red-600 animate-pulse">
            <ShieldAlert className="h-3 w-3" />
            Only {product.stock} left in stock!
          </p>
        )}

        {/* Bottom price and triggers */}
        <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t border-stone-100">
          <div>
            <span className="text-xs text-stone-400 block font-medium uppercase tracking-wider">Price</span>
            <span className="text-lg font-extrabold text-stone-900">
              ₹{product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-1.5">
            <button
              id={`view-details-${product.id}`}
              onClick={() => onViewDetails(product)}
              className="p-2 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-stone-200 hover:border-emerald-200 transition-all cursor-pointer"
              title="View product details"
            >
              <Info className="h-4.5 w-4.5" />
            </button>
            
            <button
              id={`add-to-cart-${product.id}`}
              disabled={isOutOfStock}
              onClick={() => onAddToCart(product)}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isOutOfStock
                  ? "bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200"
                  : "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-sm hover:shadow-md"
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
