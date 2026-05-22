import React, { useState } from "react";
import { X, Star, Calendar, MessageSquare, Plus, Minus, Milestone, ShoppingBag, ShieldCheck, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { ToyProduct, ToyReview } from "../types";

interface ProductDetailsModalProps {
  product: ToyProduct;
  onClose: () => void;
  onAddToCart: (product: ToyProduct, quantity: number) => void;
  onAddReview: (productId: string, review: Omit<ToyReview, "id" | "date">) => void;
}

export function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
  onAddReview,
}: ProductDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "reviews">("overview");
  const [quantity, setQuantity] = useState(50);

  // Gallery and Carousel selection states
  const prodImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // Custom Lightbox modal size view state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  
  // Custom dummy review state
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isOutOfStock = product.stock <= 0;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 50) {
      setQuantity((q) => q - 1);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    onAddReview(product.id, {
      userName: newName.trim(),
      rating: newRating,
      comment: newComment.trim(),
    });

    setNewName("");
    setNewComment("");
    setNewRating(5);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <div id="product-detail-modal-root" className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-xs overflow-y-auto">
      
      {/* Modal Container */}
      <div 
        id="modal-card-container"
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Absolute Close icon */}
        <button
          id="close-details-modal"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 shadow-sm transition-all cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Scroll Workspace */}
        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
            
            {/* Left Column: Image Showcase space */}
            <div className="flex flex-col gap-4 animate-none">
              
              {/* Main Image Container */}
              <div 
                id="main-detailed-image-wrapper"
                onClick={() => {
                  setLightboxIdx(activeImgIdx);
                  setLightboxOpen(true);
                }}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-50 cursor-pointer shadow-xs hover:border-emerald-500 transition-all"
                title="Click to view fixed-size interactive gallery"
              >
                <img
                  src={prodImages[activeImgIdx]}
                  alt={`${product.name} - View ${activeImgIdx + 1}`}
                  className="h-full w-full object-cover object-center transition-all group-hover:scale-[1.03] duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Trigger Tag for Lightbox */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-stone-700 shadow-sm border border-stone-150 flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="h-3 w-3 text-emerald-600 animate-none" />
                  <span>Interactive Full-Size</span>
                </div>

                {/* Left/Right Slide Overlay Arrows on Hover */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImgIdx((prev) => (prev === 0 ? prodImages.length - 1 : prev - 1));
                    }}
                    className="h-8 w-8 rounded-full bg-white/95 text-stone-700 flex items-center justify-center hover:bg-stone-100 hover:text-stone-900 active:scale-95 shadow-sm border border-stone-200 cursor-pointer transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImgIdx((prev) => (prev === prodImages.length - 1 ? 0 : prev + 1));
                    }}
                    className="h-8 w-8 rounded-full bg-white/95 text-stone-700 flex items-center justify-center hover:bg-stone-100 hover:text-stone-900 active:scale-95 shadow-sm border border-stone-200 cursor-pointer transition-all"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Lower Index dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-stone-900/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
                  {prodImages.map((_, i) => (
                    <span 
                      key={i} 
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        activeImgIdx === i ? "bg-white w-3" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails Gallery Strip */}
              <div id="product-thumbnails-strip" className="space-y-2">
                <div className="flex justify-between items-center px-0.5">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest font-mono">Product Gallery ({prodImages.length} Images)</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-mono uppercase tracking-wide">{activeImgIdx + 1} of {prodImages.length}</span>
                </div>
                
                {/* Scrollable Gallery list */}
                <div className="grid grid-cols-6 gap-2">
                  {prodImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveImgIdx(idx);
                      }}
                      className={`relative aspect-square w-full rounded-xl overflow-hidden border bg-stone-50 cursor-pointer transition-all hover:scale-105 ${
                        activeImgIdx === idx 
                          ? "border-emerald-600 ring-2 ring-emerald-100" 
                          : "border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`Thumbnail image ${idx + 1}`} 
                        className="h-full w-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Quality Seals */}
              <div className="rounded-xl bg-emerald-[20]/40 p-4 border border-emerald-100/50 space-y-2">
                <h4 className="text-xs font-extrabold text-emerald-800 uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  Workshop Quality Seals
                </h4>
                <ul className="text-xs text-stone-600 space-y-1 font-sans">
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <strong>100% Saliva Proof Paint:</strong> Won't chip or rub off
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <strong>Splinter-Free Guarantee:</strong> Hand-finished curves
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <strong>Chemical Safe:</strong> Free of VOCs, lead, and BPA
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Interactive control panel */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Category & Status */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="rounded-full bg-stone-100 px-3 py-0.5 text-xs font-semibold text-stone-600 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                    Age Suitability: {product.recommendedAge}
                  </span>
                </div>

                {/* Main Product Title */}
                <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
                  {product.name}
                </h2>

                {/* Rating display */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 fill-current ${
                          i < Math.floor(product.rating) ? "text-amber-400" : "text-stone-200"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-stone-700">{product.rating} / 5.0</span>
                  <span className="text-xs text-stone-400">({product.reviews.length} Verified Customer Reviews)</span>
                </div>

                {/* Pricing Block */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-stone-900">₹{product.price.toFixed(2)}</span>
                  {product.stock > 0 ? (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      In Stock & Ready to Ship
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100">
                      Temporarily Sold Out
                    </span>
                  )}
                </div>

                {/* Tab selectors for detailed specs */}
                <div className="mt-6 flex border-b border-stone-200">
                  <button
                    id="tab-overview"
                    onClick={() => setActiveTab("overview")}
                    className={`py-2 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                      activeTab === "overview"
                        ? "border-emerald-600 text-emerald-700"
                        : "border-transparent text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    id="tab-specs"
                    onClick={() => setActiveTab("specs")}
                    className={`py-2 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                      activeTab === "specs"
                        ? "border-emerald-600 text-emerald-700"
                        : "border-transparent text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    Features & Materials
                  </button>
                  <button
                    id="tab-reviews"
                    onClick={() => setActiveTab("reviews")}
                    className={`py-2 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                      activeTab === "reviews"
                        ? "border-emerald-600 text-emerald-700"
                        : "border-transparent text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    Reviews ({product.reviews.length})
                  </button>
                </div>

                {/* Tab content box */}
                <div className="mt-4 text-stone-600 text-sm font-sans min-h-[160px] leading-relaxed">
                  
                  {activeTab === "overview" && (
                    <div className="space-y-4">
                      <p>{product.longDescription}</p>
                      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-stone-100">
                        <div>
                          <span className="text-xs text-stone-400 block font-medium uppercase">Materials Used</span>
                          <span className="text-sm font-bold text-stone-800">{product.materials}</span>
                        </div>
                        <div>
                          <span className="text-xs text-stone-400 block font-medium uppercase">Dimensions</span>
                          <span className="text-sm font-bold text-stone-800">{product.dimensions}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "specs" && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-stone-800">What makes this toy unique:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="space-y-4">
                      {/* Reviews Log */}
                      {product.reviews.length === 0 ? (
                        <p className="text-stone-400 italic py-4">No reviews yet for this newly made batch. Be the first to write a review below!</p>
                      ) : (
                        <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2">
                          {product.reviews.map((rev) => (
                            <div key={rev.id} className="rounded-lg bg-stone-50 p-3 border border-stone-100">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-stone-800 text-xs">{rev.userName}</span>
                                <span className="text-[10px] text-stone-400 flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {rev.date}
                                </span>
                              </div>
                              <div className="flex text-amber-400 mb-1">
                                {[...Array(rev.rating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-current text-amber-400" />
                                ))}
                              </div>
                              <p className="text-xs text-stone-600 italic">"{rev.comment}"</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Review input block */}
                      <form onSubmit={handleReviewSubmit} className="mt-4 border-t border-stone-100 pt-4 space-y-3">
                        <h4 className="text-xs font-extrabold text-stone-800 uppercase tracking-widest flex items-center gap-1.5">
                          <MessageSquare className="h-4 w-4" />
                          Write a Customer Review
                        </h4>
                        
                        {submitSuccess && (
                          <div className="rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 text-center animate-pulse">
                            Review submitted securely! Thank you.
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-stone-500 uppercase">Your Name</label>
                            <input
                              type="text"
                              required
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              placeholder="Alex M."
                              className="w-full mt-1 px-3 py-1.5 text-xs rounded-md border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-stone-800 bg-stone-50"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-stone-500 uppercase">Star Rating</label>
                            <select
                              value={newRating}
                              onChange={(e) => setNewRating(Number(e.target.value))}
                              className="w-full mt-1 px-3 py-1.5 text-xs rounded-md border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-stone-800 bg-stone-50"
                            >
                              <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                              <option value="4">⭐⭐⭐⭐ Great</option>
                              <option value="3">⭐⭐⭐ Good</option>
                              <option value="2">⭐⭐ Fair</option>
                              <option value="1">⭐ Poor</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-500 uppercase">Comment</label>
                          <textarea
                            required
                            rows={2}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your child's play experience..."
                            className="w-full mt-1 px-3 py-1.5 text-xs rounded-md border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-stone-800 bg-stone-50"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-md transition-all uppercase cursor-pointer"
                        >
                          Publish Review
                        </button>
                      </form>
                    </div>
                  )}

                </div>
              </div>

              {/* Bottom Action Section */}
              <div className="mt-8 border-t border-stone-200 pt-6 flex flex-wrap items-center justify-between gap-4">
                
                {/* Quantity selector */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Quantity:</span>
                    <div className="flex items-center border border-stone-200 rounded-full bg-stone-50 px-1">
                      <button
                        type="button"
                        disabled={quantity <= 50 || isOutOfStock}
                        onClick={handleDecrement}
                        className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-stone-800">{quantity}</span>
                      <button
                        type="button"
                        disabled={quantity >= product.stock || isOutOfStock}
                        onClick={handleIncrement}
                        className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-100 uppercase tracking-wide">
                    Production Min Batch Check: 50/item
                  </span>
                </div>

                {/* Confirm Add To Cart */}
                <button
                  id="modal-confirm-add-to-cart"
                  disabled={isOutOfStock}
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all cursor-pointer text-sm ${
                    isOutOfStock
                      ? "bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200"
                      : "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white"
                  }`}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add {quantity} to Shopping Cart</span>
                </button>

              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Overlay for uniform, fixed max dimensions */}
      {lightboxOpen && (
        <div 
          id="product-image-lightbox"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-950/85 p-4 backdrop-blur-md animate-none"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Main Container of fixed, max user friendly dimensions */}
          <div 
            id="lightbox-container-box"
            className="w-full max-w-[550px] bg-white rounded-2xl flex flex-col shadow-2xl relative p-4 border border-stone-200 animate-none overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Info bar */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-150 mb-3">
              <div>
                <h4 className="text-xs font-black text-stone-900 uppercase tracking-widest font-mono">
                  Interactive Viewer
                </h4>
                <p className="text-[10px] text-stone-500 font-medium">
                  {product.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="h-8 w-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center cursor-pointer transition-all active:scale-95 text-xs font-sans"
                title="Close Preview"
              >
                ✕
              </button>
            </div>

            {/* Bounded Fixed Max-Size Image Container */}
            <div className="w-full h-[380px] sm:h-[420px] rounded-xl bg-stone-100 flex items-center justify-center overflow-hidden relative border border-stone-150 p-2 select-none">
              <img
                src={prodImages[lightboxIdx]}
                alt={`${product.name} item high-res review`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-xs pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* Prev icon inside */}
              <button
                type="button"
                onClick={() => setLightboxIdx((prev) => (prev === 0 ? prodImages.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-xs text-stone-800 flex items-center justify-center hover:bg-white active:scale-95 shadow-md border border-stone-150 cursor-pointer transition-all"
                title="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Next icon inside */}
              <button
                type="button"
                onClick={() => setLightboxIdx((prev) => (prev === prodImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-xs text-stone-800 flex items-center justify-center hover:bg-white active:scale-95 shadow-md border border-stone-150 cursor-pointer transition-all"
                title="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Bounded Controls & Thumbnails for Lightbox */}
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-stone-600 font-mono px-1">
                <span className="uppercase tracking-wider">Thumbnail Shortcuts</span>
                <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-150">
                  Image {lightboxIdx + 1} of {prodImages.length}
                </span>
              </div>

              {/* Grid of exactly 5-7 images */}
              <div className="grid grid-cols-6 gap-1.5">
                {prodImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setLightboxIdx(index)}
                    className={`aspect-square w-full rounded-lg overflow-hidden border transition-all ${
                      lightboxIdx === index
                        ? "border-emerald-600 ring-2 ring-emerald-100 scale-95"
                        : "border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt="Mini preview"
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>

              <div className="text-center pt-2">
                <p className="text-[10px] text-stone-400 font-medium">
                  💡 This viewer handles high-res products into a secure, device-friendly fixed standard bounding container.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
