import React, { useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  ChevronDown, 
  Building, 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Baby, 
  Package, 
  Layers 
} from "lucide-react";
import { ManufacturerAbout } from "../types";
import { CATEGORIES_WITH_AGES } from "../data/toys";

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
  activeTab: "catalog" | "about" | "contact";
  setActiveTab: (tab: "catalog" | "about" | "contact") => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  manufacturerInfo: ManufacturerAbout;
  onScrollToCatalog?: () => void;
}

export function Navbar({
  cartItemsCount,
  onCartClick,
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  manufacturerInfo,
  onScrollToCatalog,
}: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveTab("catalog");
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onScrollToCatalog) {
      onScrollToCatalog();
    }
  };

  return (
    <header id="app-header" className="sticky top-0 z-40 w-full border-b border-stone-200 bg-stone-50/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Company Brand Logo & Name */}
          <div 
            id="site-logo"
            onClick={() => {
              setActiveTab("catalog");
              setSelectedCategory("All Toys");
            }}
            className="flex cursor-pointer items-center gap-2.5 group"
          >
            <div className="relative">
              <img
                src="/src/assets/images/devanshi_logo_1779446619755.png"
                alt="Devanshi World Logo"
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-full object-cover shadow-sm border border-stone-200 transition-transform group-hover:rotate-6 duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div>
              <span className="font-sans text-lg sm:text-xl font-black tracking-tight text-stone-900 flex items-center">
                Devanshi <span className="text-emerald-600 ml-1">World</span>
              </span>
              <span className="hidden sm:block text-[9px] font-black tracking-widest text-emerald-700 uppercase font-mono">
                TRUSTED QUALITY FOR EVERY HOME
              </span>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <nav id="main-navigation" className="hidden md:flex items-center gap-1">
            
            {/* Products Megamenu Dropdown Trigger */}
            <div className="relative">
              <button
                id="nav-products-dropdown-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`px-4 py-2 text-sm font-bold rounded-full flex items-center gap-1 transition-all ${
                  activeTab === "catalog" && selectedCategory !== "All Toys"
                    ? "bg-emerald-100 text-emerald-900"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Submenu Dropdown Overlays */}
              {dropdownOpen && (
                <div 
                  id="products-submenu-popover"
                  className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-stone-150 p-3.5 shadow-xl ring-1 ring-black/5"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="mb-2 pb-2 border-b border-stone-100">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest font-mono">
                      Explore Categories
                    </p>
                  </div>
                  <div className="space-y-1">
                    {CATEGORIES_WITH_AGES.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => handleCategorySelect(cat.name)}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 group hover:bg-emerald-50 ${
                          selectedCategory === cat.name ? "bg-stone-50" : ""
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors shrink-0">
                          {cat.name.includes("Wooden") ? (
                            <Package className="h-4 w-4" />
                          ) : cat.name.includes("Plastic") ? (
                            <Layers className="h-4 w-4" />
                          ) : (
                            <Sparkles className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-800 group-hover:text-emerald-900 transition-colors">
                            {cat.name}
                          </div>
                          <div className="text-[10px] text-stone-500 font-medium group-hover:text-emerald-700 transition-colors flex items-center gap-1 mt-0.5 font-mono">
                            <Baby className="h-3 w-3 shrink-0" />
                            <span>{cat.recommendedAge}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-stone-100 overflow-hidden">
                    <button
                      onClick={() => handleCategorySelect("All Toys")}
                      className="w-full text-center py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                    >
                      View All Dynamic Collection
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-catalog"
              onClick={() => handleCategorySelect("All Toys")}
              className={`px-4 py-2 text-sm font-extrabold rounded-full transition-colors ${
                activeTab === "catalog" && selectedCategory === "All Toys"
                  ? "bg-emerald-100/80 text-emerald-855"
                  : "text-stone-600 hover:text-stone-950 hover:bg-stone-100"
              }`}
            >
              All Toys
            </button>

            <button
              id="nav-about"
              onClick={() => {
                setActiveTab("about");
                setDropdownOpen(false);
              }}
              className={`px-4 py-2 text-sm font-extrabold rounded-full transition-colors ${
                activeTab === "about"
                  ? "bg-emerald-100/80 text-emerald-855"
                  : "text-stone-600 hover:text-stone-950 hover:bg-stone-100"
              }`}
            >
              About Us
            </button>

            <button
              id="nav-contact"
              onClick={() => {
                setActiveTab("contact");
                setDropdownOpen(false);
              }}
              className={`px-4 py-2 text-sm font-extrabold rounded-full transition-colors ${
                activeTab === "contact"
                  ? "bg-emerald-100/80 text-emerald-855"
                  : "text-stone-600 hover:text-stone-950 hover:bg-stone-100"
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Search bar inside header if on catalog tab */}
          <div className="flex-1 md:flex-initial max-w-xs relative hidden lg:block">
            {activeTab === "catalog" && (
              <div id="search-input-wrapper">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search toys by type/material..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-stone-200 bg-stone-100 focus:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-stone-800 transition-all font-sans font-medium"
                />
              </div>
            )}
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            
            {/* Mobile Navigation Toggle (Hamburger equivalent for simple toys apps) */}
            <button
              id="mobile-nav-toggle"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 text-stone-600 hover:text-stone-955 hover:bg-stone-100 rounded-xl transition-all border border-stone-200/50"
              title="Menu Options"
            >
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800">
                <Building className="h-4.5 w-4.5" />
                <span>Menu</span>
              </div>
            </button>

            {/* Shopping Cart button */}
            <button
              id="header-cart-button"
              onClick={onCartClick}
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-800 transition-all cursor-pointer shadow-xs border border-stone-200/40"
              aria-label="Open factory order wagon"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span 
                  id="cart-badge-count" 
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-extrabold text-stone-50 animate-pulse border-2 border-white"
                >
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Options Strip */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-stone-200/60 flex flex-col gap-2.5 animate-none">
            {/* Products category shortcut section */}
            <div className="bg-stone-100/50 rounded-xl p-2.5 border border-stone-150 space-y-2">
              <span className="text-[9px] font-black tracking-widest text-stone-500 uppercase font-mono block px-1">
                Products Submenus
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {CATEGORIES_WITH_AGES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategorySelect(cat.name)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 bg-white border border-stone-200 flex items-center justify-between text-xs font-bold text-stone-700"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {cat.recommendedAge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Tabs for Mobile */}
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  setSelectedCategory("All Toys");
                  setActiveTab("catalog");
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 text-center py-2 rounded-xl text-xs font-bold border transition-colors ${
                  activeTab === "catalog" && selectedCategory === "All Toys"
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-stone-600 border-stone-200"
                }`}
              >
                All Toys Collection
              </button>
              <button
                onClick={() => {
                  setActiveTab("about");
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 text-center py-2 rounded-xl text-xs font-bold border transition-colors ${
                  activeTab === "about"
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-stone-600 border-stone-200"
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => {
                  setActiveTab("contact");
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 text-center py-2 rounded-xl text-xs font-bold border transition-colors ${
                  activeTab === "contact"
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-stone-600 border-stone-200"
                }`}
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
