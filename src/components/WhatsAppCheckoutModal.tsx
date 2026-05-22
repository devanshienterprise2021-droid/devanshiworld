import React, { useState } from "react";
import { X, Send, Eye, ShieldCheck, Mail, AlertTriangle } from "lucide-react";
import { CartItem } from "../types";
import { MANUFACTURER_INFO } from "../data/toys";

interface WhatsAppCheckoutModalProps {
  cartItems: CartItem[];
  onClose: () => void;
  onClearCart: () => void;
}

export function WhatsAppCheckoutModal({
  cartItems,
  onClose,
  onClearCart,
}: WhatsAppCheckoutModalProps) {
  // Customer details
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [shippingMethod, setShippingMethod] = useState("Standard Ground (Free)");
  const [checkoutNotes, setCheckoutNotes] = useState("");
  
  // Dest number - initialized to default. Highly flexible for user testing!
  const [targetWhatsAppNumber, setTargetWhatsAppNumber] = useState(MANUFACTURER_INFO.whatsappNumber);

  const subtotal = cartItems.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );
  const taxRate = 0.05; // 5% Manufacturing GST/VAT rate
  const taxAmount = subtotal * taxRate;
  const shippingCost = shippingMethod.includes("Free") ? 0 : 800;
  const grandTotal = subtotal + taxAmount + shippingCost;

  // Build the prefilled WhatsApp order message
  const handleCompileAndSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim() || !customerPhone.trim() || !targetWhatsAppNumber.trim()) {
      return;
    }

    // Compose formatted text order
    let messageText = `🧸 *DEVANSHI WORLD - FACTORY DIRECT ORDER* 🧸\n`;
    messageText += `===================================\n`;
    messageText += `*Customer Details*:\n`;
    messageText += `• Buyer/Store Name: ${name.trim()}\n`;
    messageText += `• Primary Contact Phone: ${customerPhone.trim()}\n`;
    messageText += `• Shipping Address: ${address.trim()}\n`;
    messageText += `• Delivery Option: ${shippingMethod}\n`;
    messageText += `===================================\n\n`;
    messageText += `*Itemized Production Lines*:\n`;

    cartItems.forEach((item, index) => {
      const itemSubtotal = item.product.price * item.quantity;
      const itemTax = itemSubtotal * 0.05;
      const itemTotalWithTax = itemSubtotal + itemTax;

      messageText += `${index + 1}. *[${item.product.id}] ${item.product.name}*\n`;
      messageText += `   Quantity: ${item.quantity} units\n`;
      messageText += `   Unit Price: ₹${item.product.price.toFixed(2)}\n`;
      messageText += `   Price Subtotal: ₹${itemSubtotal.toFixed(2)}\n`;
      messageText += `   Tax (5%): ₹${itemTax.toFixed(2)}\n`;
      messageText += `   Line Total: ₹${itemTotalWithTax.toFixed(2)}\n`;
      if (item.giftWrapped) {
        messageText += `   🎁 _Biodegradable Wrap: Yes_\n`;
        if (item.giftMessage) {
          messageText += `   📝 _Wood Tag message: "${item.giftMessage}"_\n`;
        }
      }
      messageText += `\n`;
    });

    messageText += `===================================\n`;
    messageText += `*Gross Cart Subtotal:* ₹${subtotal.toFixed(2)}\n`;
    messageText += `*Production VAT (5%):* ₹${taxAmount.toFixed(2)}\n`;
    messageText += `*Shipping fees:* ${shippingCost === 0 ? "FREE" : `₹${shippingCost.toFixed(2)}`}\n`;
    messageText += `*GRAND TOTAL AFTER ALL LINES:* ₹${grandTotal.toFixed(2)}\n`;
    messageText += `===================================\n`;

    if (checkoutNotes.trim()) {
      messageText += `*Production Comments:* _${checkoutNotes.trim()}_\n\n`;
    }

    messageText += `🌱 _Thank you for choosing Devanshi World, Toy Manufacturers! We will review and authorize your final design schedule inside 24 hours._`;

    // Strip out non-numeric characters from the destination phone number for wa.me API specs.
    const cleanedTargetNumber = targetWhatsAppNumber.replace(/\D/g, "");

    // Direct url structure matching the user's secure Checkout to direct number requirement
    const whatsappUrl = `https://wa.me/${cleanedTargetNumber}?text=${encodeURIComponent(messageText)}`;

    // Open WhatsApp order portal
    window.open(whatsappUrl, "_blank");

    // Close the module and clear order to present successful transition
    onClearCart();
    onClose();
  };

  return (
    <div id="checkout-modal-root" className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-xs overflow-y-auto">
      
      <div 
        id="checkout-modal-card"
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl transition-all my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header summary */}
        <div className="flex h-16 items-center justify-between border-b border-stone-200 px-6 bg-white shrink-0">
          <div>
            <h3 className="text-base font-extrabold text-stone-900 font-sans">Devanshi World Checkout</h3>
            <p className="text-[10px] text-stone-500 font-medium uppercase tracking-wider">Send Order Quote via WhatsApp Messenger</p>
          </div>
          <button
            id="close-checkout"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-stone-100 text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body layout */}
        <form onSubmit={handleCompileAndSend} className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Target number selection (great for direct user-interactive workspace tests) */}
          <div className="rounded-xl bg-emerald-50 px-4 py-3.5 border border-emerald-100 space-y-1.5">
            <label className="block text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              Direct Toymaker WhatsApp Number
            </label>
            <p className="text-[11px] text-emerald-700 leading-normal">
              This is the target recipient phone number. We have prefilled it with our support number, but **you can change it to your own phone number** to test the pre-filled direct message directly on your own device!
            </p>
            <input
              type="text"
              required
              value={targetWhatsAppNumber}
              onChange={(e) => setTargetWhatsAppNumber(e.target.value)}
              placeholder="E.g. 15550199"
              className="w-full mt-1.5 px-3 py-1.5 text-xs rounded border border-emerald-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-stone-800 bg-white font-mono font-bold"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase text-stone-500 tracking-wider">Your Shipping Information</h4>

            {/* Customer name */}
            <div>
              <label className="block text-xs font-bold text-stone-700">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g. Emily Watson"
                className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-stone-800 bg-stone-50"
              />
            </div>

            {/* Customer Address */}
            <div>
              <label className="block text-xs font-bold text-stone-700">Shipping Delivery Address</label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street Address, City, State, ZIP code"
                className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-stone-800 bg-stone-50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Customer phone number */}
              <div>
                <label className="block text-xs font-bold text-stone-700">Your Phone Number</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="E.g. +1 555-0329"
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-stone-800 bg-stone-50"
                />
              </div>

              {/* Delivery Speed logic */}
              <div>
                <label className="block text-xs font-bold text-stone-700">Delivery Method</label>
                <select
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-stone-800 bg-stone-50"
                >
                  <option value="Standard Ground (Free)">Standard Ground Delivery (FREE)</option>
                  <option value="Express Courier (₹800.00)">Speedy Courier Delivery (₹800.00)</option>
                </select>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold text-stone-700">Custom Assembly or Hand-engraving Notes (Optional)</label>
              <input
                type="text"
                value={checkoutNotes}
                onChange={(e) => setCheckoutNotes(e.target.value)}
                placeholder="E.g. Please leave the parcel at the back deck if we are out"
                className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 text-stone-800 bg-stone-50 animate-none"
              />
            </div>
          </div>

          {/* Checkout Item Billing block */}
          <div className="mt-4 pt-4 border-t border-stone-100">
            <h4 className="text-xs font-black uppercase text-stone-500 tracking-wider mb-2.5 animate-none">Factory Production Lines & Financials</h4>
            
            {/* Scrollable Table for responsive viewports */}
            <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-xs">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-[10px] font-black uppercase text-stone-500 tracking-wider">
                    <th className="px-3 py-2.5 font-mono">Product Code</th>
                    <th className="px-3 py-2.5">Product Name</th>
                    <th className="px-3 py-2.5 text-center">Qty</th>
                    <th className="px-3 py-2.5 text-right">Price</th>
                    <th className="px-3 py-2.5 text-right">Tax (5%)</th>
                    <th className="px-3 py-2.5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {cartItems.map((item) => {
                    const itemSubtotal = item.product.price * item.quantity;
                    const itemTax = itemSubtotal * 0.05;
                    return (
                      <tr key={item.product.id} className="hover:bg-stone-50/50 transition-colors text-xs">
                        <td className="px-3 py-2.5 font-mono text-stone-500 font-bold">
                          {item.product.id}
                        </td>
                        <td className="px-3 py-2.5 font-sans font-semibold text-stone-800 max-w-[150px] truncate" title={item.product.name}>
                          {item.product.name}
                        </td>
                        <td className="px-3 py-2.5 font-mono font-bold text-center text-stone-900 bg-stone-50/40">
                          {item.quantity}
                        </td>
                        <td className="px-3 py-2.5 font-mono text-right text-stone-600">
                          ₹{item.product.price.toFixed(2)}
                        </td>
                        <td className="px-3 py-2.5 font-mono text-right text-amber-700">
                          +₹{itemTax.toFixed(2)}
                        </td>
                        <td className="px-3 py-2.5 font-mono text-right font-bold text-stone-900">
                          ₹{itemSubtotal.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Invoiced breakdown card right after database table design layout */}
            <div className="mt-3 rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2.5">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Final Untaxed Total (Gross):</span>
                  <span className="font-mono font-bold text-stone-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Taxes (5% Manufacturing VAT Column-applied):</span>
                  <span className="font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100/40">+₹{taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Shipping Cost ({shippingMethod.includes("Free") ? "Ground" : "Express"}):</span>
                  <span className="font-mono font-bold text-stone-800">{shippingCost === 0 ? "FREE" : `₹${shippingCost.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="border-t border-dashed border-stone-200 pt-2.5 flex justify-between items-center text-sm font-black text-emerald-800">
                <span className="uppercase tracking-wide">Grand Invoiced Total:</span>
                <span className="font-mono text-base">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Secure disclaimer info */}
          <div className="flex items-start gap-2 text-[11px] text-amber-800 bg-amber-50 p-3 rounded-lg border border-amber-100/50">
            <AlertTriangle className="h-4.5 w-4.5 shrink-0 text-amber-600 mt-0.5" />
            <p>
              Clicking below will invoke the standard WhatsApp Web or desktop/mobile application. Your compiled text contains complete details but **never stores banking card numbers online**. Order is placed entirely hands-on.
            </p>
          </div>

          {/* Push Order sending button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 px-6 py-3.5 font-bold text-white shadow-md hover:shadow-lg transition-all cursor-pointer text-sm"
          >
            <Send className="h-4 w-4" />
            <span>Transmit Order to WhatsApp</span>
          </button>

        </form>

      </div>
    </div>
  );
}
