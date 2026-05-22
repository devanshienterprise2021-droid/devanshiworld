import React, { useState } from "react";
import { Trees, ShieldCheck, Sparkles, Heart, Mail, CheckCircle, Send } from "lucide-react";
import { MANUFACTURER_INFO } from "../data/toys";

export function AboutManufacturer() {
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryText, setInquiryText] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setInquiryName("");
    setInquiryEmail("");
    setInquiryText("");
    setTimeout(() => setSuccess(false), 4000);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Trees":
        return <Trees className="h-6 w-6 text-emerald-600" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-6 w-6 text-emerald-600" />;
      case "Sparkles":
        return <Sparkles className="h-6 w-6 text-emerald-600" />;
      case "Heart":
        return <Heart className="h-6 w-6 text-emerald-600" />;
      default:
        return <Sparkles className="h-6 w-6 text-emerald-600" />;
    }
  };

  return (
    <div id="about-manufacturer-workspace" className="py-12 bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Core Story Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              <Trees className="h-3.5 w-3.5 text-emerald-700" />
              <span>Family Owned Workshop & Joinery</span>
            </div>
            
            <h2 className="font-sans text-3xl font-extrabold text-stone-900 sm:text-4xl">
              {MANUFACTURER_INFO.storyHeading}
            </h2>
            
            <p className="text-base text-stone-600 font-sans leading-relaxed">
              {MANUFACTURER_INFO.history}
            </p>
            
            <p className="text-base text-stone-600 font-sans leading-relaxed">
              {MANUFACTURER_INFO.storyBody}
            </p>


          </div>

          {/* Side imagery / statement */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-emerald-800 text-white p-8 space-y-6">
              <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-full bg-emerald-700/60 blur-xl" />
              <div className="absolute bottom-5 left-5 -z-10 h-24 w-24 rounded-full bg-emerald-600/40 blur-xl" />
              
              <h3 className="text-xl font-bold font-sans">Our Green Pledge</h3>
              <p className="text-stone-100 text-sm leading-relaxed">
                "For every tree harvested to craft our heirloom toy blocks or catalog roadsters, we contribute 5x funding to direct replanting programs. Play shouldn't cost the forest's future."
              </p>

              <div className="space-y-3 pt-4 border-t border-emerald-700/80">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-300" />
                  <span className="text-xs font-semibold">100% Biodegradable & Compostable Parts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-300" />
                  <span className="text-xs font-semibold">Saliva proof certified under EN71-3 Standards</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-300" />
                  <span className="text-xs font-semibold">Carbon Neutral Workshop Shipping</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Values Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-sans text-2xl font-black text-stone-900">Why Families Trust Devanshi World</h3>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">The craft secrets behind every stack and cuddle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MANUFACTURER_INFO.values.map((v, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                    {getIconComponent(v.iconName)}
                  </div>
                  <h4 className="font-bold text-stone-900 text-base">{v.title}</h4>
                  <p className="text-stone-600 text-xs leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact/Query Form */}
        <div className="mx-auto max-w-2xl bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-sans text-2xl font-black text-stone-900">General Questions & Bulk Custom Orders</h3>
            <p className="text-xs text-stone-500">Need specific wood species or bulk custom monogram toys? Write us our artisans directly on mail.</p>
          </div>

          {success && (
            <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-100 text-emerald-800 text-center font-semibold text-xs leading-relaxed">
              ✨ Message Transmitted! Our head artisan will write back to you at your email address within 24 hours.
            </div>
          )}

          <form onSubmit={handleInquirySubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-500">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="Diana Vance"
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-stone-800 bg-stone-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-stone-500">Your Contact Email</label>
                <input
                  type="email"
                  required
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  placeholder="diana@example.com"
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-stone-800 bg-stone-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-stone-500">Custom Order Specifications & Inquiry Details</label>
              <textarea
                required
                rows={4}
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="E.g. We are building a Montessori preschool room and would love custom block laser engravings with our children's logo..."
                className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-stone-800 bg-stone-50"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-850 active:bg-stone-950 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Send Inquiry Mail</span>
            </button>
          </form>

          <div className="flex justify-center gap-6 pt-4 border-t border-stone-100 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4 text-emerald-600" />
              {MANUFACTURER_INFO.contactEmail}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
