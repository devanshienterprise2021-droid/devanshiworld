import React from "react";
import { Sparkles, ShieldCheck, Heart } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  onAboutClick: () => void;
}

export function Hero({ onExploreClick, onAboutClick }: HeroProps) {
  return (
    <div id="hero-banner" className="relative overflow-hidden bg-stone-100 py-16 sm:py-24">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-emerald-100 opacity-50 blur-3xl" />
      <div className="absolute bottom-0 left-10 -z-10 h-64 w-64 rounded-full bg-amber-100 opacity-40 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold text-emerald-800">
              <Sparkles className="h-3 w-3" />
              <span>Sustainably Sourced, Artisan Handcrafted</span>
            </div>
            
            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl md:text-6xl leading-[1.1]">
              Toys Born in the Forest, <br />
              <span className="text-emerald-600 block mt-1">Sanded for Safe Dreams</span>
            </h1>
            
            <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed max-w-xl">
              Welcome to Devanshi World. We create tactile, certified organic wooden and organic fiber plush toys that spark open-ended, sensory learning while respecting our natural forests. No high beep-beeps, no flashing screens—just pure, calm, timeless curiosity.
            </p>

            {/* Quick feature indicators */}
            <div className="grid grid-cols-2 gap-4 pb-4 sm:pb-6 border-b border-stone-200">
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-800">Non-Toxic & Saliva Safe</h4>
                  <p className="text-xs text-stone-500">Pure plant milk-paints & organic beeswax coatings</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Heart className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-800">FSC Certified Wood</h4>
                  <p className="text-xs text-stone-500">100% sustainable European Beech & Maple forests</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                id="hero-shop-now"
                onClick={onExploreClick}
                className="px-6 py-3 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Browse Shop Catalog
              </button>
              <button
                id="hero-our-process"
                onClick={onAboutClick}
                className="px-6 py-3 text-base font-semibold text-stone-700 bg-white hover:bg-stone-50 active:bg-stone-100 rounded-full border border-stone-200 shadow-sm transition-all cursor-pointer"
              >
                Discover Our Workshop
              </button>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-xl max-w-full lg:max-w-md xl:max-w-xl">
              {/* Note compliance on referrerPolicy="no-referrer" for all img tags as instructed in image generation skill */}
              <img
                src="/src/assets/images/hero_toys_banner_1779444982983.png"
                alt="Beautiful wooden playroom filled with bespoke artisan toys"
                className="object-cover w-full h-[320px] sm:h-[400px] hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/40 via-stone-900/10 to-transparent p-4 text-white">
                <p className="text-xs font-semibold tracking-wider uppercase text-emerald-300">Devanshi World Showcase Room</p>
                <p className="text-sm font-medium">100% premium wooden materials and child-development approved</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
