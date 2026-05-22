import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  CheckCircle,
  HelpCircle,
  MessageSquare,
  Building,
  ArrowLeft,
  Headphones,
  Check
} from "lucide-react";
import { MANUFACTURER_INFO } from "../data/toys";

export function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedMsg, setSubmittedMsg] = useState("");
  const [submittedTime, setSubmittedTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmittedName(name);
      setSubmittedEmail(email);
      setSubmittedMsg(msg);
      
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      setSubmittedTime(`${hours}:${minutes} ${ampm}`);

      setSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMsg("");
    setSuccess(false);
  };

  return (
    <div id="contact-us-page-container" className="py-12 bg-stone-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Contact Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            <Building className="h-3.5 w-3.5" />
            <span>Connect with Devanshi World</span>
          </div>
          <h1 className="font-sans text-3xl font-extrabold text-stone-900 sm:text-4xl tracking-tight">
            Contact Our Manufacturing Headquarters
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Have questions about catalog pricing, bespoke wooden finishes, minimum order quantities (MOQ), or custom shipments? Reach out to our dedicated support office in India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card Grid */}
          <div className="lg:col-span-5 space-y-6">
            
            <h2 className="text-lg font-bold text-stone-900 mb-2">Our Official Contact Details</h2>
            
            {/* Phone */}
            <a 
              href="tel:+919712174855" 
              className="block p-5 bg-white rounded-2xl border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-100 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-stone-400 tracking-wider font-mono">Factory & Checkout Hotline</p>
                  <p className="text-base font-extrabold text-stone-900 font-mono group-hover:text-emerald-700 transition-colors">+91 9712174855</p>
                  <p className="text-xs text-stone-500">Call or WhatsApp direct messages regarding bulk toy quotas.</p>
                </div>
              </div>
            </a>

            {/* Email */}
            <a 
              href="mailto:devanshi.enterprise2021@gmail.com" 
              className="block p-5 bg-white rounded-2xl border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-100 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-stone-400 tracking-wider font-mono">Email Correspondence</p>
                  <p className="text-sm sm:text-base font-extrabold text-stone-900 group-hover:text-emerald-700 transition-colors">devanshi.enterprise2021@gmail.com</p>
                  <p className="text-xs text-stone-500">Expect a comprehensive official catalog proposal within 1 business day.</p>
                </div>
              </div>
            </a>

            {/* Address */}
            <div className="p-5 bg-white rounded-2xl border border-stone-200 hover:border-emerald-550 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <MapPin className="h-5 w-5" />
                </div>
                 <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-stone-400 tracking-wider font-mono">Workshop & Office Location</p>
                  <p className="text-sm font-extrabold text-stone-900 leading-relaxed font-sans">
                    201-202, Possible Triangle,<br />
                    Mavdi By Pass,<br />
                    Rajkot-360004, Gujarat, India
                  </p>
                  <p className="text-xs text-stone-500">
                    Sourced materials and direct batch-dispatch logistics are managed directly from this facility.
                  </p>
                </div>
              </div>
            </div>

            {/* Operating hours */}
            <div className="p-5 bg-stone-100 rounded-2xl border border-stone-200/60">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-stone-500" />
                <div>
                  <h4 className="text-xs font-extrabold text-stone-800">Support Hours</h4>
                  <p className="text-xs text-stone-600">Monday - Saturday (9:00 AM to 7:00 PM)</p>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Form Segment */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            
            {!success ? (
              <>
                <div className="space-y-2">
                  <h3 className="font-sans text-xl font-bold text-stone-900">Direct Inquiries Form</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Provide details about your shop, customized toy requirements, or order quantities. Our specialists will coordinate and finalize quotes.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500">Your Full Name / Company Desk</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E.g., Devanshi Importers"
                      className="w-full mt-1.5 px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-stone-800 bg-stone-50/70"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500">Email Address for Correspondence</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="distributor@devanshimail.com"
                      className="w-full mt-1.5 px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-stone-800 bg-stone-50/70"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500">Custom Production Specs, Core Quantities or Toys of Interest</label>
                    <textarea
                      required
                      rows={4}
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="Detail your requirements here, including custom logos or delivery timelines..."
                      className="w-full mt-1.5 px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-stone-800 bg-stone-50/70"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-850 active:bg-stone-950 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? "Transmitting..." : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Secure Manufacturing Inquiry</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500">
                  <span className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded">
                    <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Immediate Support: +91 9712174855</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Minimum Order Qty Check: 50 items</span>
                  </span>
                </div>
              </>
            ) : (
              /* Success Panel modeled directly after the user's provided dashboard layout */
              <div id="inquiry-success-panel" className="space-y-6">
                
                {/* Visual success ticket layout */}
                <div className="bg-emerald-50/40 rounded-2xl border border-emerald-100/80 p-5 sm:p-6 space-y-5 shadow-xs relative overflow-hidden">
                  
                  {/* Absolute subtle background sparkles */}
                  <div className="absolute top-2 right-2 w-12 h-12 bg-emerald-100/20 rounded-full blur-xl pointer-events-none"></div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Left text & lists column */}
                    <div className="md:col-span-7 space-y-4">
                      
                      {/* Top success badge */}
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="h-4 w-4 stroke-[3]" />
                        </div>
                        <div>
                          <h3 className="text-base font-extrabold text-emerald-950 font-sans leading-tight">
                            Successfully received your inquiry!
                          </h3>
                          <p className="text-xs text-emerald-800 font-medium">
                            They will contact us shorty.
                          </p>
                        </div>
                      </div>

                      <hr className="border-emerald-100/80" />

                      {/* Info channels stack list */}
                      <div className="space-y-3.5 bg-white/70 rounded-xl p-3 border border-emerald-50">
                        {/* We Will Contact You Shortly */}
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <Headphones className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-stone-900 leading-tight">
                              We Will Contact You Shortly
                            </p>
                            <p className="text-[10px] text-stone-500 leading-normal">
                              Our team will get in touch with you soon path-forward.
                            </p>
                          </div>
                        </div>

                        {/* Support Hours */}
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                            <Clock className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-stone-900 leading-tight">
                              Support Hours
                            </p>
                            <p className="text-[10px] text-stone-500 leading-normal">
                              We reply between 9:00 AM to 7:00 PM.
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right beautiful SVG illustration column */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center relative bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/40">
                      
                      {/* Green spark arcs above */}
                      <div className="absolute top-2 flex gap-1 items-center justify-center opacity-80 scale-75">
                        <span className="w-1 h-3 bg-emerald-500 rounded-full rotate-[-25deg] origin-bottom animate-bounce"></span>
                        <span className="w-1.5 h-4 bg-emerald-400 rounded-full animate-pulse"></span>
                        <span className="w-1 h-3 bg-emerald-500 rounded-full rotate-[25deg] origin-bottom animate-bounce"></span>
                      </div>

                      {/* Golden open envelope */}
                      <svg viewBox="0 0 120 100" className="w-32 h-24 drop-shadow-sm">
                        {/* Shadow base */}
                        <ellipse cx="60" cy="85" rx="40" ry="6" fill="#10b981" opacity="0.08" />

                        {/* Envelope Back & Inside paper sliding up */}
                        <rect x="20" y="35" width="80" height="45" rx="4" fill="#fef08a" />
                        
                        {/* Sliding white document */}
                        <g className="animate-bounce" style={{ animationDuration: '3s' }}>
                          <rect x="26" y="15" width="68" height="36" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                          {/* Checked green circle on paper */}
                          <circle cx="60" cy="30" r="10" fill="#10b981" />
                          <path d="M55 30 l3 3 l6 -6" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </g>

                        {/* Envelope Open Lip */}
                        <polygon points="20,35 60,60 100,35" fill="#fef3c7" opacity="0.9" />
                        
                        {/* Front flaps overlay */}
                        <polygon points="20,35 20,80 60,60" fill="#fde047" />
                        <polygon points="100,35 100,80 60,60" fill="#fde047" />
                        <polygon points="20,80 60,54 100,80" fill="#facc15" />
                      </svg>

                      {/* Spark / Star detail elements on layout boundary */}
                      <div className="absolute bottom-5 right-4 text-emerald-600 animate-spin" style={{ animationDuration: '10s' }}>★</div>
                      
                      {/* Timestamp as per user's picture layout bottom corner card */}
                      <span className="text-[10px] font-mono text-stone-400 bg-white/70 px-2 py-0.5 rounded-full border border-stone-100 shadow-3xs mt-2 self-end">
                        {submittedTime || "1:37 pm"}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Back to form action button */}
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-stone-50 text-stone-700 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4 text-stone-500" />
                  <span>Send Another Direct Inquiry</span>
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
