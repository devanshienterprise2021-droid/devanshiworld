import React from "react";
import { X, Trash2, Plus, Minus, Gift, Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onToggleGiftWrap: (productId: string) => void;
  onUpdateGiftMessage: (productId: string, message: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onToggleGiftWrap,
  onUpdateGiftMessage,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );

  const totalItemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 flex justify-end bg-stone-900/60 backdrop-blur-xs">
      
      {/* Drawer Panel Body */}
      <div 
        id="cart-drawer-panel"
        className="h-full w-full max-w-md bg-stone-50 shadow-2xl flex flex-col justify-between translate-x-0 transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header segment */}
        <div className="flex h-16 items-center justify-between border-b border-stone-200 px-6 bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-extrabold text-stone-900">Your Toy Sack</h2>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-100">
              {totalItemsCount}
            </span>
          </div>
          <button
            id="close-cart-drawer"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-stone-100 text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable list sector */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-stone-700 text-base">Your cart is currently empty</h3>
                <p className="text-stone-500 text-xs max-w-xs mt-1">Explore our premium catalog of wooden blocks, trains, plush toys, and balance boards to start building memories.</p>
              </div>
              <button
                id="cart-continue-shopping"
                onClick={onClose}
                className="mt-2 px-6 py-2.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-full border border-emerald-200 transition-all cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.product.id} 
                  id={`cart-item-${item.product.id}`}
                  className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs space-y-3"
                >
                  <div className="flex gap-3">
                    {/* Item Thumbnail */}
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-stone-100 bg-stone-50 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-stone-850 text-sm line-clamp-1">{item.product.name}</h4>
                      <p className="text-[10px] text-stone-400 font-semibold uppercase">{item.product.category}</p>
                      <p className="font-semibold text-stone-800 text-sm mt-1">
                        ₹{item.product.price.toFixed(2)} <span className="text-stone-400 font-normal">each</span>
                      </p>
                    </div>

                    {/* Delete tag */}
                    <button
                      id={`remove-cart-item-${item.product.id}`}
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                      title="Remove product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Quantity controls & dynamic subtotal */}
                  <div className="flex items-center justify-between border-t border-stone-100 pt-3">
                    <div className="flex items-center border border-stone-200 rounded-full bg-stone-50 px-1">
                      <button
                        disabled={item.quantity <= 50}
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                        title="Decrease quantity (Min 50 Qty)"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-stone-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 block font-medium">Subtotal</span>
                      <span className="font-bold text-stone-950 text-sm font-sans">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Eco Gift wrapping checkbox block */}
                  <div className="border-t border-dashed border-stone-100 pt-3 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.giftWrapped || false}
                        onChange={() => onToggleGiftWrap(item.product.id)}
                        className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500/20"
                      />
                      <span className="text-xs text-stone-600 font-medium flex items-center gap-1">
                        <Gift className="h-3.5 w-3.5 text-emerald-600" />
                        Pack in free biodegradable wooden holiday wrap
                      </span>
                    </label>

                    {item.giftWrapped && (
                      <div className="space-y-1">
                        <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Write Handwritten wood tag details:</span>
                        <input
                          type="text"
                          maxLength={120}
                          value={item.giftMessage || ""}
                          onChange={(e) => onUpdateGiftMessage(item.product.id, e.target.value)}
                          placeholder="E.g. To Liam! Happy 2nd Birthday! Love Grandma"
                          className="w-full px-2 py-1 text-xs rounded border border-emerald-200 focus:border-emerald-500 focus:outline-none text-stone-700 bg-emerald-50/40"
                        />
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer billing summary & secure WhatsApp launch button */}
        {cartItems.length > 0 && (
          <div className="border-t border-stone-200 bg-white p-6 space-y-4 shadow-md">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-stone-500">
                <span>Cart Subtotal</span>
                <span className="font-bold text-stone-800">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500">
                <span>Artisan Premium Gifting Wraps</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500">
                <span>Shipping Fees & Taxes</span>
                <span className="italic text-[10px] text-stone-400">Calculated in Direct Order checkout</span>
              </div>
              <div className="border-t border-stone-100 pt-2 flex justify-between text-sm">
                <span className="font-bold text-stone-900">Total Items Sum</span>
                <span className="font-black text-emerald-800 text-lg">₹{subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Quality assurance seal */}
            <div className="bg-stone-50 rounded-lg p-2.5 border border-stone-100 text-[11px] text-stone-500 flex items-start gap-2 leading-relaxed">
              <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Checkout is 100% Secure.</strong> Order details are transmitted directly to our head artisan's WhatsApp terminal for manual validation and confirmation. No bank cards are exposed!
              </span>
            </div>

            {/* Trigger Checkout Modal */}
            <button
              id="proceed-to-checkout"
              onClick={onCheckout}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Instant WhatsApp Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
