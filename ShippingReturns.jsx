import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import SEOHead from '../components/common/SEOHead';
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { BRAND } from '../config/constants';

export default function ShippingReturns() {
  return (
    <>
      <SEOHead
        title="Shipping & Returns Policy"
        description="Delivery timelines across Pakistan, courier partners, Cash on Delivery, and 7-day hassle-free return policy."
      />

      <div className="bg-obsidian-950 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Shipping & Returns' }]} />

          <div className="my-10 text-center max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-2">
              Logistics & Peace of Mind
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 uppercase tracking-tight">
              Shipping & Return Protocols
            </h1>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
          </div>

          <div className="bg-obsidian-900 border border-gold-500/20 p-8 sm:p-12 rounded-2xl shadow-xl space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
            {/* Section 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-gold-300 font-serif font-bold text-base uppercase">
                <Truck className="w-5 h-5 text-gold-400" />
                <span>1. Nationwide Express Delivery (Pakistan)</span>
              </div>
              <p>
                We deliver to all major metropolitan centers and remote regions across Pakistan via premier air-courier services (TCS and Leopards Courier).
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li><strong>Lahore, Karachi, Islamabad, Rawalpindi:</strong> 24 to 48 business hours.</li>
                <li><strong>Faisalabad, Multan, Peshawar, Sialkot, Gujranwala:</strong> 2 to 3 business days.</li>
                <li><strong>Other Cities & Remote Districts:</strong> 3 to 4 business days.</li>
                <li><strong>Complimentary Delivery:</strong> All orders above Rs. 5,000 qualify for complimentary delivery. Orders below this threshold carry a flat nominal fee of Rs. 250.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-3 pt-6 border-t border-obsidian-800">
              <div className="flex items-center gap-2.5 text-gold-300 font-serif font-bold text-base uppercase">
                <ShieldCheck className="w-5 h-5 text-gold-400" />
                <span>2. Cash on Delivery (COD) Protocols</span>
              </div>
              <p>
                Cash on Delivery is available nationwide without surcharge. Upon dispatch from our atelier, an SMS and email containing your consignment tracking number will be sent. Please ensure the exact cash amount is ready for the courier rider upon delivery.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3 pt-6 border-t border-obsidian-800">
              <div className="flex items-center gap-2.5 text-gold-300 font-serif font-bold text-base uppercase">
                <RotateCcw className="w-5 h-5 text-gold-400" />
                <span>3. 7-Day Hassle-Free Returns & Exchanges</span>
              </div>
              <p>
                We stand firmly behind the superior craftsmanship of every AURA SUBLIME flacon. If for any reason you are not completely enchanted:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li>You may initiate a return or exchange within 7 days of delivery.</li>
                <li>The main perfume bottle must remain unopened with cellophane seal intact.</li>
                <li>To allow you to test with confidence, select orders include a complimentary 2ml sample vial so you may experience the scent before breaking the seal of the main presentation box.</li>
                <li>Damaged or defective bottles during transit are replaced immediately at zero cost to the client.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
