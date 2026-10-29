import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, Banknote, MessageCircle, AlertCircle, ArrowRight, Lock, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatPKR, isValidPakistaniPhone, generateOrderNumber } from '../utils/currency';
import { CITIES_PAKISTAN, BRAND } from '../config/constants';
import { orderService } from '../config/appwrite';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';

export default function Checkout() {
  const { items, subtotal, shippingFee, discount, total, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form State
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [customCity, setCustomCity] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-obsidian-950 flex flex-col items-center justify-center text-center p-4">
        <h2 className="font-serif text-2xl font-bold text-ivory-100 mb-2">Your Bag is Empty</h2>
        <p className="text-xs text-gray-400 mb-6">Add fragrances to your bag before proceeding to checkout.</p>
        <Link to="/shop" className="bg-gold-500 text-obsidian-950 px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-wider">
          Explore Fragrances
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!customerName.trim()) {
      setErrorMessage('Please provide your full legal name.');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setErrorMessage('Please provide a valid email address for order tracking.');
      return;
    }
    if (!isValidPakistaniPhone(customerPhone)) {
      setErrorMessage('Please enter a valid Pakistani mobile number (e.g. 0300-1234567 or 03XXXXXXXXX).');
      return;
    }
    const finalCity = city === 'Other' ? customCity.trim() : city;
    if (!finalCity) {
      setErrorMessage('Please select or specify your delivery city.');
      return;
    }
    if (!shippingAddress.trim() || shippingAddress.trim().length < 8) {
      setErrorMessage('Please provide a complete street address, house/apartment number, and area.');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderNumber = generateOrderNumber();
      const orderPayload = {
        orderNumber,
        userId: user?.id || null,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim().toLowerCase(),
        customerPhone: customerPhone.trim(),
        city: finalCity,
        shippingAddress: shippingAddress.trim(),
        orderNotes: orderNotes.trim(),
        items: items.map(i => ({
          id: i.id,
          name: i.name,
          size: i.selectedSize,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        subtotal,
        shippingFee,
        discount,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending_verification',
      };

      const createdOrder = await orderService.create(orderPayload);
      clearCart();
      showToast(`Order ${createdOrder.orderNumber} placed successfully!`, 'success');
      navigate(`/order-confirmation/${createdOrder.orderNumber}`);
    } catch (err) {
      console.error('Order placement failed:', err);
      setErrorMessage('Could not record order in the database. Please check connection and try again.');
      showToast('Order placement failed. Please verify details.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Secure Checkout"
        description="Complete your AURA SUBLIME order with complimentary delivery and Cash on Delivery across Pakistan."
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Shopping Bag', href: '/cart' },
              { label: 'Secure Checkout' }
            ]}
          />

          <div className="my-8 pb-4 border-b border-gold-500/15">
            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-1">
              Final Step
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase tracking-tight">
              Client & Delivery Concierge
            </h1>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Delivery Details & Payment */}
            <div className="lg:col-span-2 space-y-8">
              {/* Client Information */}
              <div className="bg-obsidian-900 border border-gold-500/20 p-6 sm:p-8 rounded-2xl space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-gold-500/15">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 text-xs font-bold flex items-center justify-center">1</span>
                  <h2 className="font-serif text-base font-bold text-ivory-50 uppercase tracking-wider">
                    Recipient Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Daniyal Sheikh"
                      className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-xs text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                      Mobile Number (Pakistan) *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 0300-1234567"
                      className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-xs text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400"
                      required
                    />
                    <span className="text-[10px] text-gray-500">For courier dispatch notifications & tracking SMS</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. daniyal.sheikh@example.com"
                    className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-xs text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    required
                  />
                  <span className="text-[10px] text-gray-500">Order confirmation receipt will be sent here</span>
                </div>
              </div>

              {/* Delivery Destination */}
              <div className="bg-obsidian-900 border border-gold-500/20 p-6 sm:p-8 rounded-2xl space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-gold-500/15">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 text-xs font-bold flex items-center justify-center">2</span>
                  <h2 className="font-serif text-base font-bold text-ivory-50 uppercase tracking-wider">
                    Delivery Address (Pakistan)
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                      City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                    >
                      {CITIES_PAKISTAN.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {city === 'Other' && (
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                        Specify Your City *
                      </label>
                      <input
                        type="text"
                        value={customCity}
                        onChange={(e) => setCustomCity(e.target.value)}
                        placeholder="Enter your town / city in Pakistan"
                        className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                        required
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                    Street Address & House / Flat Number *
                  </label>
                  <textarea
                    rows="3"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="e.g. House 42, Street 8, Phase 5 DHA, Lahore"
                    className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-xs text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                    Order Delivery Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Call before delivery, deliver in afternoon"
                    className="w-full bg-obsidian-850 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-xs text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-obsidian-900 border border-gold-500/20 p-6 sm:p-8 rounded-2xl space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-gold-500/15">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 text-xs font-bold flex items-center justify-center">3</span>
                  <h2 className="font-serif text-base font-bold text-ivory-50 uppercase tracking-wider">
                    Select Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-gold-400 bg-gold-500/15 ring-1 ring-gold-400/50'
                        : 'border-obsidian-750 bg-obsidian-850 hover:border-gold-500/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-gold-500 mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-semibold text-ivory-100">
                          Cash on Delivery (Nationwide COD)
                        </span>
                        <Banknote className="w-4 h-4 text-gold-400" />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Pay cash directly to the TCS / Leopards courier rider when your luxury package arrives at your doorstep.
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-gold-400 bg-gold-500/15 ring-1 ring-gold-400/50'
                        : 'border-obsidian-750 bg-obsidian-850 hover:border-gold-500/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="accent-gold-500 mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-semibold text-ivory-100">
                          Direct Bank Transfer / Raast
                        </span>
                        <CreditCard className="w-4 h-4 text-gold-400" />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Transfer directly via Meezan Bank or Standard Chartered. Account details and reference will be provided upon confirmation.
                      </p>
                    </div>
                  </label>

                  {/* WhatsApp Assisted */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'whatsapp'
                        ? 'border-gold-400 bg-gold-500/15 ring-1 ring-gold-400/50'
                        : 'border-obsidian-750 bg-obsidian-850 hover:border-gold-500/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="whatsapp"
                      checked={paymentMethod === 'whatsapp'}
                      onChange={() => setPaymentMethod('whatsapp')}
                      className="accent-gold-500 mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-semibold text-ivory-100">
                          WhatsApp-Assisted Ordering
                        </span>
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Connect directly with our private concierge to verify bottle batches, request customized packaging, or coordinate payment.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Place Order */}
            <div className="space-y-6">
              <div className="bg-obsidian-900 border border-gold-500/20 p-6 rounded-2xl space-y-6 sticky top-24 shadow-2xl">
                <h3 className="font-serif text-lg font-bold text-ivory-50 uppercase tracking-wider pb-4 border-b border-gold-500/15">
                  Order Summary ({items.length} Fragrances)
                </h3>

                {/* Items preview list */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt=""
                        className="w-12 h-14 object-cover rounded bg-obsidian-950 border border-gold-500/20 shrink-0"
                      />
                      <div className="flex-1 text-xs">
                        <div className="font-serif font-semibold text-ivory-100 truncate">{item.name}</div>
                        <div className="text-[10px] text-gray-400">{item.selectedSize} × {item.quantity}</div>
                      </div>
                      <div className="text-xs font-semibold text-gold-300 font-serif">
                        {formatPKR(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Table */}
                <div className="space-y-2 text-xs text-gray-300 pt-4 border-t border-obsidian-800">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-ivory-100 font-medium">{formatPKR(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-gold-400 font-medium">
                      <span>Privilege Voucher Discount</span>
                      <span>-{formatPKR(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Courier (Pakistan)</span>
                    <span className="text-ivory-100 font-medium">
                      {shippingFee === 0 ? <strong className="text-gold-400 uppercase font-semibold">Free</strong> : formatPKR(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-ivory-50 pt-3 border-t border-obsidian-800">
                    <span className="font-serif">Total Payable</span>
                    <span className="text-gold-300 font-serif text-lg">{formatPKR(total)}</span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold-gradient hover:opacity-95 text-obsidian-950 font-semibold py-4 px-6 rounded-lg text-xs uppercase tracking-luxury flex items-center justify-center gap-2 shadow-2xl transition-all disabled:opacity-50"
                >
                  <Lock className="w-4 h-4 text-obsidian-950" />
                  <span>{isSubmitting ? 'Securing Flacon...' : `Confirm Order — ${formatPKR(total)}`}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  <span>256-bit Encrypted Client Security</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
