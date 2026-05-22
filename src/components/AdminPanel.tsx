import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  LogOut, 
  Image as ImageIcon, 
  AlertCircle, 
  Clock, 
  Users, 
  CheckCircle,
  FileText,
  Package,
  Layers,
  Wrench,
  ChevronRight
} from "lucide-react";
import { ToyProduct, ToyReview } from "../types";

interface AdminPanelProps {
  catalog: ToyProduct[];
  onAddProduct: (product: ToyProduct) => void;
  onDeleteProduct: (id: string) => void;
  onLogout: () => void;
}

// Preset high-fidelity Unsplash toy image URLs to allow effortless instant insertion
const PRESET_TOY_IMAGES = [
  {
    name: "Geometric Wooden Blocks",
    url: "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=600&auto=format&fit=crop",
    category: "Wooden Toys"
  },
  {
    name: "Classic Wooden Train",
    url: "https://images.unsplash.com/photo-1545558014-868513582683?q=80&w=600&auto=format&fit=crop",
    category: "Wooden Toys"
  },
  {
    name: "Pastel Colored Arch Stack",
    url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop",
    category: "Wooden Toys"
  },
  {
    name: "Montessori Sensory Rings",
    url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop",
    category: "Plastic Toys"
  },
  {
    name: "Eco Stacking Beakers",
    url: "https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=600&auto=format&fit=crop",
    category: "Plastic Toys"
  },
  {
    name: "Precious Infant Activity Set",
    url: "https://images.unsplash.com/photo-1537655780520-1e392edd816a?q=80&w=600&auto=format&fit=crop",
    category: "Wooden Toys"
  },
  {
    name: "Vintage Toy Roadster Car",
    url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600&auto=format&fit=crop",
    category: "Wooden Toys"
  },
  {
    name: "Handcrafted Cotton Bear",
    url: "https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=600&auto=format&fit=crop",
    category: "Plastic Toys"
  },
  {
    name: "Metal Mechanical Gears Game",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
    category: "Metal Toys"
  }
];

export function AdminPanel({ catalog, onAddProduct, onDeleteProduct, onLogout }: AdminPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState<"list" | "create">("list");

  // Form states matching ToyProduct
  const [name, setName] = useState("");
  const [price, setPrice] = useState("25.00");
  const [category, setCategory] = useState("Wooden Toys");
  const [customCategory, setCustomCategory] = useState("");
  const [isCustomCategoryActive, setIsCustomCategoryActive] = useState(false);
  const [ageMin, setAgeMin] = useState("3");
  const [ageUnit, setAgeUnit] = useState<"Months" | "Years">("Years");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [materials, setMaterials] = useState("Premium Sustainable Oakwood");
  const [dimensions, setDimensions] = useState("10.5 x 4.0 w x 3.5 inches");
  const [stock, setStock] = useState("300");
  
  // Images system
  const [primaryImage, setPrimaryImage] = useState(PRESET_TOY_IMAGES[0].url);
  const [galleryUrl1, setGalleryUrl1] = useState("");
  const [galleryUrl2, setGalleryUrl2] = useState("");
  const [galleryUrl3, setGalleryUrl3] = useState("");

  // Features list
  const [featureInput1, setFeatureInput1] = useState("100% smooth non-toxic tactile shape");
  const [featureInput2, setFeatureInput2] = useState("Encourages motor-planning and sensory logic");
  const [featureInput3, setFeatureInput3] = useState("Sanded smooth with non-splinter beeswax polish");

  // Form messaging
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validation
    if (!name.trim()) {
      setErrorMsg("Please enter a descriptive product name.");
      return;
    }
    if (!description.trim()) {
      setErrorMsg("Please write a short introduction description.");
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setErrorMsg("Please specify a valid price above zero.");
      return;
    }

    const stockNum = parseInt(stock);
    if (isNaN(stockNum) || stockNum < 0) {
      setErrorMsg("Starting inventory batch must be 0 or higher.");
      return;
    }

    const ageNum = parseInt(ageMin);
    if (isNaN(ageNum) || ageNum < 0) {
      setErrorMsg("Age limit allocation must be a positive integer.");
      return;
    }

    // Determine target category
    const finalCategory = isCustomCategoryActive ? customCategory.trim() : category;
    if (!finalCategory) {
      setErrorMsg("Please specify a valid toy category.");
      return;
    }

    // Determine recommended age string
    const finalRecommendedAge = `${ageNum} ${ageUnit}+`;

    // Process gallery list
    const galleryArr = [primaryImage];
    if (galleryUrl1.trim()) galleryArr.push(galleryUrl1.trim());
    if (galleryUrl2.trim()) galleryArr.push(galleryUrl2.trim());
    if (galleryUrl3.trim()) galleryArr.push(galleryUrl3.trim());

    // Process bullet points features list
    const featuresArr = [];
    if (featureInput1.trim()) featuresArr.push(featureInput1.trim());
    if (featureInput2.trim()) featuresArr.push(featureInput2.trim());
    if (featureInput3.trim()) featuresArr.push(featureInput3.trim());

    // Build the new ToyProduct matching types.ts interface schema completely
    const newProduct: ToyProduct = {
      id: `mfg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: name.trim(),
      description: description.trim(),
      longDescription: (longDescription || description).trim(),
      features: featuresArr,
      price: priceNum,
      category: finalCategory,
      rating: 5.0, // newly engineered products start with immaculate factory rating
      image: primaryImage,
      images: galleryArr,
      stock: stockNum,
      dimensions: dimensions.trim() || "N/A",
      materials: materials.trim() || "Eco Friendly Materials",
      recommendedAge: finalRecommendedAge,
      isFeatured: true,
      reviews: [] // starts with zero reviews
    };

    // Add to state and save
    onAddProduct(newProduct);

    // Notify Success & Reset
    setSuccessMsg(`"${newProduct.name}" successfully designed, compiled and published to active factory lines!`);
    
    // Partially reset form
    setName("");
    setDescription("");
    setLongDescription("");
    setPrice("25.00");
    setStock("300");
    setGalleryUrl1("");
    setGalleryUrl2("");
    setGalleryUrl3("");
    
    // Scroll to top of panel or switch back to list
    setTimeout(() => {
      setSuccessMsg("");
      setActiveSubTab("list");
    }, 2500);
  };

  const handleSelectPreset = (url: string) => {
    setPrimaryImage(url);
  };

  return (
    <div id="admin-panel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Stats Ribbon bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-stone-900 text-stone-50 border border-stone-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2 rounded text-[10px] uppercase font-black tracking-widest bg-emerald-600 text-white font-mono shrink-0">
              Session Live
            </span>
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-black font-sans tracking-tight">
              Manufacturer Workspace
            </h1>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed font-sans max-w-xl">
            Register custom toy blueprints, manage materials inventories, review current active items, and update store parameters directly on active browser storage frameworks.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800 hover:border-stone-700 text-xs font-bold transition-all cursor-pointer shrink-0"
        >
          <LogOut className="h-4 w-4 text-stone-400" />
          <span>Exit Workspace</span>
        </button>
      </div>

      {/* Tabs navigation bar */}
      <div className="flex items-center border-b border-stone-200">
        <button
          onClick={() => setActiveSubTab("list")}
          className={`px-5 py-3 text-xs uppercase tracking-wider font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "list"
              ? "border-emerald-600 text-emerald-800 bg-emerald-50/20"
              : "border-transparent text-stone-500 hover:text-stone-850 hover:bg-stone-100/50"
          }`}
        >
          <Package className="h-4 w-4" />
          <span>Existing Blueprints ({catalog.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab("create")}
          className={`px-5 py-3 text-xs uppercase tracking-wider font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "create"
              ? "border-emerald-600 text-emerald-800 bg-emerald-50/20"
              : "border-transparent text-stone-500 hover:text-stone-850 hover:bg-stone-100/50"
          }`}
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Engineer New Toy</span>
        </button>
      </div>

      {/* Main rendering block */}
      {activeSubTab === "list" ? (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden animate-none">
          
          <div className="p-5 border-b border-stone-100 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-stone-850 uppercase tracking-wider font-mono">Toy Blueprints Catalog</h3>
              <p className="text-xs text-stone-500 mt-0.5">Below is the live list of models produced by the Rajkot facility.</p>
            </div>
            
            <button
              onClick={() => setActiveSubTab("create")}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer self-start sm:self-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Produce New Toy</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 text-[10px] font-black uppercase tracking-widest text-stone-500 border-b border-stone-200">
                  <th className="py-4.5 px-6">Model Preview</th>
                  <th className="py-4.5 px-6">Name & ID</th>
                  <th className="py-4.5 px-6">Category</th>
                  <th className="py-4.5 px-6 font-mono">Recommended Age</th>
                  <th className="py-4.5 px-6">Stock Status</th>
                  <th className="py-4.5 px-6 text-right">Wholesale Price</th>
                  <th className="py-4.5 px-6 text-center">Action Line</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-150 text-xs">
                {catalog.map((toy) => (
                  <tr key={toy.id} className="hover:bg-stone-50/80 transition-all">
                    
                    {/* Preview Image */}
                    <td className="py-3 px-6 whitespace-nowrap">
                      <div className="h-12 w-12 rounded-lg bg-stone-100 border border-stone-200 flex overflow-hidden shrink-0">
                        <img 
                          src={toy.image} 
                          alt="Toy thumbnail" 
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            // fallback on image error
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=200&auto=format&fit=crop";
                          }}
                        />
                      </div>
                    </td>

                    {/* Name & ID */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-stone-900 text-sm max-w-[240px] truncate">{toy.name}</div>
                      <div className="text-[10px] font-mono text-stone-400 mt-0.5">{toy.id}</div>
                    </td>

                    {/* Category tag */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="p-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700 border border-stone-200">
                        {toy.category}
                      </span>
                    </td>

                    {/* Age Restriction */}
                    <td className="py-4 px-6 whitespace-nowrap font-mono text-stone-600 font-bold">
                      {toy.recommendedAge}
                    </td>

                    {/* Stock level */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className={`h-2.5 w-2.5 rounded-full ${toy.stock > 100 ? "bg-emerald-500" : "bg-amber-500"}`} />
                        <span>{toy.stock} Units</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6 whitespace-nowrap text-right font-mono font-black text-stone-900 text-sm">
                      ₹{toy.price.toFixed(2)}
                    </td>

                    {/* Delete action wrapper */}
                    <td className="py-4 px-6 whitespace-nowrap text-center">
                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to permanently decommission and delete "${toy.name}" from active lines?`)) {
                            onDeleteProduct(toy.id);
                          }
                        }}
                        className="p-2 text-stone-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all cursor-pointer inline-flex"
                        title="Delete toy blueprint record"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {catalog.length === 0 && (
            <div className="text-center py-20 bg-white">
              <Package className="h-10 w-10 text-stone-300 mx-auto mb-2" />
              <p className="text-xs text-stone-500">No active blueprint entries detected in the database folder. Add one now!</p>
            </div>
          )}

        </div>
      ) : (
        /* Create product form layout card */
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden animate-none">
          
          <div className="p-5 border-b border-stone-100 bg-stone-50/50">
            <h3 className="text-sm font-bold text-stone-850 uppercase tracking-wider font-mono">Toy Design Blueprint Parameters</h3>
            <p className="text-xs text-stone-500 mt-0.5">Synthesize standard schema variables to build immediate fully operational React nodes.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
            
            {/* Status alerts */}
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
                <div className="font-semibold">{errorMsg}</div>
              </div>
            )}
            {successMsg && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="font-semibold">{successMsg}</div>
              </div>
            )}

            {/* Grid for Primary Details fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Toy Model Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Handmade Polished Maple Abacus Train"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans font-medium bg-stone-50 hover:bg-stone-100/50 focus:bg-white transition-all text-stone-800"
                />
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Wholesale Price (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-3 text-xs font-bold text-stone-400 font-mono">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 29.99"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono font-bold bg-stone-50 hover:bg-stone-100/50 focus:bg-white transition-all text-stone-900"
                  />
                </div>
              </div>

              {/* Category selector system */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                    Toy Category <span className="text-red-500">*</span>
                  </label>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomCategoryActive(!isCustomCategoryActive);
                      setCustomCategory("");
                    }}
                    className="text-[10px] uppercase font-bold text-emerald-800 hover:text-emerald-950 underline font-mono"
                  >
                    {isCustomCategoryActive ? "Choose Existing" : "+ Define Custom"}
                  </button>
                </div>

                {isCustomCategoryActive ? (
                  <input
                    type="text"
                    required
                    placeholder="e.g. Montessori Puzzles, Fabric Plushies"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full px-4.5 py-2.5 text-xs rounded-xl border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans font-medium bg-emerald-50/10 text-stone-850"
                  />
                ) : (
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans font-bold bg-stone-50 hover:bg-stone-100/50 focus:bg-white transition-all text-stone-700 cursor-pointer"
                  >
                    <option value="Wooden Toys">Wooden Toys Category</option>
                    <option value="Plastic Toys">Plastic Toys Category</option>
                    <option value="Metal Toys">Metal Toys Category</option>
                  </select>
                )}
              </div>

              {/* Age Restriction Allocation */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Allow Minimum Age Check <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    required
                    placeholder="e.g. 3"
                    value={ageMin}
                    onChange={(e) => setAgeMin(e.target.value)}
                    className="w-24 px-4.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono font-bold bg-stone-50 hover:bg-stone-100/50 focus:bg-white transition-all text-stone-900"
                  />
                  <select
                    value={ageUnit}
                    onChange={(e) => setAgeUnit(e.target.value as "Months" | "Years")}
                    className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans font-bold bg-stone-50 hover:bg-stone-100/50 focus:bg-white transition-all text-stone-700 cursor-pointer"
                  >
                    <option value="Months">Months Plus (+)</option>
                    <option value="Years">Years Plus (+)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Teaser Introduction */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                Short Preview Teaser Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="A gorgeous natural-wood educational companion facilitating tactile play..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans font-medium bg-stone-50 hover:bg-stone-100/50 focus:bg-white transition-all text-stone-800"
              />
              <span className="text-[10px] text-stone-400 block mt-1">
                Will be shown directly in the storefront grid deck card.
              </span>
            </div>

            {/* Extended Long Story */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                Detailed Product Narrative Story (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Write an expansive description about the benefits, developmental value, safety factors, and history of this toy..."
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className="w-full px-4.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans font-medium bg-stone-50 hover:bg-stone-100/50 focus:bg-white transition-all text-stone-800"
              />
            </div>

            {/* Hardware specifications details row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Materials */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Materials Sourced
                </label>
                <input
                  type="text"
                  placeholder="e.g. Solid Oakwood, beeswax organic coating"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none bg-stone-50 focus:bg-white text-stone-800"
                />
              </div>

              {/* Dimensions */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Dimensions / Size
                </label>
                <input
                  type="text"
                  placeholder="e.g. 12.0 x 3.5 w x 5.0 inches"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none bg-stone-50 focus:bg-white text-stone-800"
                />
              </div>

              {/* Stock */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Starting Shop Inventory
                </label>
                <input
                  type="number"
                  placeholder="300"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none bg-stone-50 focus:bg-white font-mono font-bold text-stone-900"
                />
              </div>

            </div>

            {/* Form list highlights */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                Product Core Feature Highlights (Form Bullets)
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                <input
                  type="text"
                  placeholder="Key highlight bullet 1"
                  value={featureInput1}
                  onChange={(e) => setFeatureInput1(e.target.value)}
                  className="px-4 py-2 text-xs rounded-xl border border-stone-200 bg-stone-100/40 text-stone-800"
                />
                <input
                  type="text"
                  placeholder="Key highlight bullet 2"
                  value={featureInput2}
                  onChange={(e) => setFeatureInput2(e.target.value)}
                  className="px-4 py-2 text-xs rounded-xl border border-stone-200 bg-stone-100/40 text-stone-800"
                />
                <input
                  type="text"
                  placeholder="Key highlight bullet 3"
                  value={featureInput3}
                  onChange={(e) => setFeatureInput3(e.target.value)}
                  className="px-4 py-2 text-xs rounded-xl border border-stone-200 bg-stone-100/40 text-stone-800"
                />
              </div>
            </div>

            {/* Preset Images and custom URL system */}
            <div className="border border-stone-200 rounded-2xl p-4.5 bg-stone-50/50 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                    <ImageIcon className="h-4.5 w-4.5 text-emerald-600" />
                    <span>Toy Media Representation (Images)</span>
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Pick one of our high-resolution stock presets below, or fill in any image address URLs directly.</p>
                </div>
              </div>

              {/* Grid presets container */}
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3.5">
                {PRESET_TOY_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(img.url)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 cursor-pointer ${
                      primaryImage === img.url ? "border-emerald-600 shadow-md ring-4 ring-emerald-500/10" : "border-stone-200"
                    }`}
                    title={img.name}
                  >
                    <img src={img.url} className="h-full w-full object-cover" alt="Preset Option" />
                    <div className="absolute inset-0 bg-black/10 hover:bg-transparent" />
                    {primaryImage === img.url && (
                      <div className="absolute bottom-1 right-1 rounded-full bg-emerald-600 text-stone-50 p-0.5 shadow-xs">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Primary input box */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-stone-500 tracking-wider font-mono">
                  Primary Toy Cover Image Address (URL)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/your-toy-url"
                  value={primaryImage}
                  onChange={(e) => setPrimaryImage(e.target.value)}
                  className="w-full px-4.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 font-mono text-stone-600 bg-white"
                />
              </div>

              {/* Additional gallery ones */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase text-stone-500 tracking-wider font-mono">
                  Additional Secondary Gallery Images (Optional URLs to populate item detail slide)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="url"
                    placeholder="Gallery URL 2"
                    value={galleryUrl1}
                    onChange={(e) => setGalleryUrl1(e.target.value)}
                    className="px-3.5 py-2 text-[11px] rounded-lg border border-stone-200 bg-white font-mono text-stone-600 text-xs"
                  />
                  <input
                    type="url"
                    placeholder="Gallery URL 3"
                    value={galleryUrl2}
                    onChange={(e) => setGalleryUrl2(e.target.value)}
                    className="px-3.5 py-2 text-[11px] rounded-lg border border-stone-200 bg-white font-mono text-stone-600 text-xs"
                  />
                  <input
                    type="url"
                    placeholder="Gallery URL 4"
                    value={galleryUrl3}
                    onChange={(e) => setGalleryUrl3(e.target.value)}
                    className="px-3.5 py-2 text-[11px] rounded-lg border border-stone-200 bg-white font-mono text-stone-600 text-xs"
                  />
                </div>
              </div>

            </div>

            {/* Action submit button */}
            <div className="flex gap-4.5 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Sparkles className="h-4.5 w-4.5 text-amber-300" />
                <span>Publish Blueprint to Active Lines</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setErrorMsg("");
                  setSuccessMsg("");
                  setActiveSubTab("list");
                }}
                className="px-5 py-3 rounded-xl border border-stone-200 hover:border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Cancel Formulation
              </button>
            </div>

          </form>

        </div>
      )}

    </div>
  );
}
