import React, { useState, useMemo, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductCard } from "./components/ProductCard";
import { ProductDetailsModal } from "./components/ProductDetailsModal";
import { AboutManufacturer } from "./components/AboutManufacturer";
import { ContactUs } from "./components/ContactUs";
import { CartDrawer } from "./components/CartDrawer";
import { WhatsAppCheckoutModal } from "./components/WhatsAppCheckoutModal";
import { TOYS_CATALOG, MANUFACTURER_INFO } from "./data/toys";
import { ToyProduct, CartItem, ToyReview } from "./types";
import { Trees, Sparkles, Star, Package, Clock, ShieldCheck } from "lucide-react";

export default function App() {
  // Navigation & view states
  const [activeTab, setActiveTab] = useState<"catalog" | "about" | "contact">("catalog");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Product state containing deep catalog (allows live addition of reviews)
  const [catalog, setCatalog] = useState<ToyProduct[]>(TOYS_CATALOG);
  const [selectedProduct, setSelectedProduct] = useState<ToyProduct | null>(null);

  // Cart system states
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Toys");

  // React Ref to easily scroll to catalog from Hero triggers
  const catalogAnchorRef = useRef<HTMLDivElement>(null);

  // Dynamic Category Extraction
  const categoriesList = useMemo(() => {
    const list = new Set(catalog.map((p) => p.category));
    return ["All Toys", ...Array.from(list)];
  }, [catalog]);

  // Compute filtered toys list
  const filteredProducts = useMemo(() => {
    return catalog.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.materials.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Toys" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [catalog, searchTerm, selectedCategory]);

  // Adding items to cart safely
  const handleAddToCart = (product: ToyProduct, quantity: number = 50) => {
    const finalQuantity = quantity < 50 ? 50 : quantity;
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);

      if (existingIndex > -1) {
        // Exists already, increment quantity safely within limits of stock
        const newItems = [...prevItems];
        const newQuant = Math.min(
          newItems[existingIndex].quantity + finalQuantity,
          product.stock
        );
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newQuant,
        };
        return newItems;
      } else {
        // Add fresh item record
        return [...prevItems, { product, quantity: finalQuantity, giftWrapped: false, giftMessage: "" }];
      }
    });

    // Auto trigger slide out to present visual add feedback
    setIsCartOpen(true);
  };

  // Adjust quantities of item inside cart drawer
  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.product.id === productId) {
            const newQuantity = item.quantity + delta;
            // Enforce minimum 50 manufacturing batch limit if updated in cart
            const clampedQuantity = newQuantity < 50 ? 50 : newQuantity;
            // Prevent going over stock constraint
            const validatedQuantity = Math.min(clampedQuantity, item.product.stock);
            return { ...item, quantity: validatedQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity >= 50); // safety filter
    });
  };

  // Remove item completely
  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Toggle gift wrapping feature
  const handleToggleGiftWrap = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return { ...item, giftWrapped: !item.giftWrapped, giftMessage: !item.giftWrapped ? "" : item.giftMessage };
        }
        return item;
      })
    );
  };

  // Write tag message of gift wrapping
  const handleUpdateGiftMessage = (productId: string, message: string) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return { ...item, giftMessage: message };
        }
        return item;
      })
    );
  };

  // Add reviews to real-time custom product states
  const handleAddProductReview = (productId: string, reviewData: Omit<ToyReview, "id" | "date">) => {
    setCatalog((prevCatalog) => {
      return prevCatalog.map((toy) => {
        if (toy.id === productId) {
          const newReview: ToyReview = {
            id: `rev-${Date.now()}`,
            userName: reviewData.userName,
            rating: reviewData.rating,
            comment: reviewData.comment,
            date: new Date().toISOString().split("T")[0],
          };
          
          const updatedReviews = [newReview, ...toy.reviews];
          // Recalculate average star rating
          const avgRating = parseFloat(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );

          const updatedToy = {
            ...toy,
            reviews: updatedReviews,
            rating: avgRating,
          };
          
          // Keep details modal synchronized with newly submitted specs
          if (selectedProduct?.id === productId) {
            setSelectedProduct(updatedToy);
          }

          return updatedToy;
        }
        return toy;
      });
    });
  };

  const handleClearSack = () => {
    setCartItems([]);
  };

  // Focus-scroll helper to catalog category anchor point
  const handleScrollToGrid = () => {
    setActiveTab("catalog");
    setTimeout(() => {
      catalogAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Count items inside cart
  const cartBadgeCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  return (
    <div id="toycraft-application" className="min-h-screen flex flex-col bg-stone-50 text-stone-800 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Notification Announcement Banner */}
      <div id="promo-ticker" className="bg-emerald-800 text-stone-50 py-2 text-center text-xs font-semibold px-4 tracking-wide">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-1.5 flex-wrap">
          <Sparkles className="h-4.5 w-4.5 text-amber-300 shrink-0" />
          <span>Special Offer: Free handknotted wool tag card custom monogramming with direct checkout orders.</span>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar
        cartItemsCount={cartBadgeCount}
        onCartClick={() => setIsCartOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categoriesList}
        manufacturerInfo={MANUFACTURER_INFO}
      />

      {/* Content Canvas */}
      <main className="flex-1">
        {activeTab === "catalog" ? (
          <div id="catalog-view">
            {/* Playful Hero Intro banner with playroom image */}
            <Hero 
              onExploreClick={handleScrollToGrid}
              onAboutClick={() => setActiveTab("about")}
            />

            {/* Main Interactive Product Grid Section */}
            <div 
              ref={catalogAnchorRef} 
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-10"
            >
              
              {/* Headline block */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
                <div className="space-y-1">
                  <h2 className="font-sans text-3xl font-black text-stone-900">Explore Our Toys Collection</h2>
                  <p className="text-sm text-stone-500 font-sans">
                    Hand-finished in Oregon using safe water paints, pure milk colors, and sustainably-sourced hard timber.
                  </p>
                </div>

                {/* Categories filtering row */}
                <div className="flex flex-wrap gap-1.5">
                  {categoriesList.map((catName) => (
                    <button
                      key={catName}
                      id={`filter-button-${catName.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => setSelectedCategory(catName)}
                      className={`px-4 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer ${
                        selectedCategory === catName
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:text-stone-900"
                      }`}
                    >
                      {catName}
                    </button>
                  ))}
                </div>
              </div>

              {/* No toys matching search feedback */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-24 space-y-4 rounded-2xl border border-stone-200 bg-white">
                  <Package className="h-12 w-12 text-stone-300 mx-auto" />
                  <div>
                    <h3 className="text-stone-700 font-semibold text-base font-sans">No matching toys found</h3>
                    <p className="text-stone-400 text-xs mt-1">Try refining your keyword search terms or selecting another product category.</p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All Toys");
                    }}
                    className="px-4 py-2 rounded-full border border-stone-200 bg-stone-50 text-xs font-bold text-stone-600 hover:bg-stone-100 transition-all cursor-pointer"
                  >
                    Clear Filter
                  </button>
                </div>
              ) : (
                /* Dynamic Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredProducts.map((toy) => (
                    <ProductCard
                      key={toy.id}
                      product={toy}
                      onViewDetails={(prod) => setSelectedProduct(prod)}
                      onAddToCart={(prod) => handleAddToCart(prod, 1)}
                    />
                  ))}
                </div>
              )}

              {/* Bottom Quick Trust Badges row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-stone-200 text-center">
                <div className="p-4 rounded-xl hover:bg-stone-100/50 transition-colors space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center bg-emerald-100 text-emerald-800 rounded-full mx-auto">
                    <Trees className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">FSC Beechwood</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">Sourced only from select European tree-farming timber lots that replant to ensure permanent green growth.</p>
                </div>
                <div className="p-4 rounded-xl hover:bg-stone-100/50 transition-colors space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center bg-emerald-100 text-emerald-800 rounded-full mx-auto">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">Saliva-Safe Certified</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">Every piece undergoes dual milk-pigment sealing to resist toddler teeth marks and keep colors entirely harmless.</p>
                </div>
                <div className="p-4 rounded-xl hover:bg-stone-100/50 transition-colors space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center bg-emerald-100 text-emerald-800 rounded-full mx-auto">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">Lifetime Wood Warranty</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">Sanded to absolute solid joinery. We believe in family heirlooms, providing complimentary lifetime replacements.</p>
                </div>
              </div>

            </div>
          </div>
        ) : activeTab === "about" ? (
          /* Detailed About / Manufacturing custom workshop view */
          <AboutManufacturer />
        ) : (
          /* Contact Us Page View */
          <ContactUs />
        )}
      </main>

      {/* Slide Out Shopping Cart Drawer Cabinet */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onToggleGiftWrap={handleToggleGiftWrap}
        onUpdateGiftMessage={handleUpdateGiftMessage}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Direct checkout on WhatsApp module modal */}
      {isCheckoutOpen && (
        <WhatsAppCheckoutModal
          cartItems={cartItems}
          onClose={() => setIsCheckoutOpen(false)}
          onClearCart={handleClearSack}
        />
      )}

      {/* Core detailed single product modal backdrop space */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onAddReview={handleAddProductReview}
        />
      )}

      {/* Footer copyright notes */}
      <footer id="app-footer" className="bg-stone-900 text-stone-400 py-12 border-t border-stone-850">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div 
                onClick={handleScrollToGrid}
                className="flex items-center gap-2.5 group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src="/src/assets/images/devanshi_logo_1779446619755.png"
                    alt="Devanshi World Logo"
                    className="h-12 w-12 rounded-full object-cover shadow-md border-2 border-stone-800 transition-all duration-500 ease-out group-hover:scale-115 group-hover:rotate-[360deg] group-hover:border-emerald-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-stone-900 animate-pulse" />
                </div>
                <div>
                  <span className="font-sans text-base sm:text-lg font-black tracking-tight text-white block">
                    Devanshi <span className="text-emerald-500">World</span>
                  </span>
                  <span className="text-[9px] font-black tracking-widest text-emerald-500 uppercase font-mono block mt-0.5">
                    TRUSTED QUALITY FOR EVERY HOME
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-400 max-w-xs leading-normal">
                Directly manufactured children's wooden block sets, handcrafted knit plushies, sensory clocks, and premium educational learning curves. Crafted for deep creative discovery since 2012.
              </p>
            </div>
            <div>
              <h5 className="text-xs font-black text-stone-200 uppercase tracking-widest mb-3">Our Standards</h5>
              <ul className="text-xs space-y-1.5">
                <li>🌲 FSC Certified Natural Beechwood</li>
                <li>🥛 Saliva-Proof Organic Milk Pigments</li>
                <li>🧶 GOTS Certified Knit Egyptian Cotton</li>
                <li>🛡️ Compliant with EN71 European Safety Rules</li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-black text-stone-200 uppercase tracking-widest mb-3">Legal & Safe</h5>
              <p className="text-xs text-stone-400 leading-normal mb-2">
                All order details are safely transmitted directly to our factory order desk over direct and encryption secure WhatsApp Messenger channels.
              </p>
              <p className="text-[10px] text-stone-500">
                &copy; {new Date().getFullYear()} Devanshi World. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
