# AURA SUBLIME — Luxury Perfume E-Commerce Platform
> **Tagline:** *"Premium Yet Accessible Luxury"*

A modern, production-grade luxury perfume e-commerce web application engineered for international fragrance brand **AURA SUBLIME**. Built with **React 18**, **Vite**, **Tailwind CSS**, and **Appwrite Cloud**, integrated with **WhatsApp Business Concierge** and tailored for the Pakistani fragrance market with PKR pricing, Pakistani phone validation, and Cash on Delivery (COD).

---

## 🌟 Brand Identity & Design System

- **Primary Aesthetics:** Obsidian black (`#0A0A0B` / `#0E0E0F`), Champagne Gold (`#C5A059` / `#D4B462`), Ivory (`#FDFCF7`), and Warm Sand accents.
- **Typography:**
  - **Headings & Display:** *Cinzel* (Roman architectural serif) & *Cormorant Garamond* (Italian editorial display)
  - **Body & Controls:** *Plus Jakarta Sans* (Crisp, clean, highly legible)
- **Visuals:** High-resolution flacon photography, subtle gold shimmers, glassmorphic floating bars, and smooth transitions.

---

## 🚀 Key Features

### 1. Storefront Experience (All 23 Pages Included)
1. **Homepage (`/`):**
   - Sticky luxury navbar with live bag count, wishlist counter, and search modal
   - Full-screen cinematic hero section with CTA buttons
   - Featured Collections (Men's, Women's, Oud, Signature)
   - Best-selling master creations with size selectors & quick add to bag
   - Brand heritage story & philosophical manifesto
   - Interactive Fragrance Notes Pyramid visualizer (Top, Heart, Base notes)
   - Interactive Scent Matchmaker quiz
   - Seasonal release banner & discount code
   - Verified patron impressions & reviews
   - Editorial Instagram-style gallery
   - FAQ accordion & newsletter subscription
2. **Shop All (`/shop`):**
   - Multi-facet filters: Collections, Gender, Fragrance Family, Price slider (PKR), In-stock only
   - Sorting: Featured, Price (Low/High), Highest Rated, Newest Batches
   - Search by perfume name, notes (e.g., Cambodian Oud, Amber, Rose), or accords
3. **Collection Pages (`/collections/:slug`):**
   - Dedicated editorial banner, notes breakdown, and filtered catalog for:
     - `/collections/men` (Men's Fragrances)
     - `/collections/women` (Women's Fragrances)
     - `/collections/oud` (Royal Cambodian & Assam Oud Collection)
     - `/collections/signature` (Signature Blends)
4. **Product Details (`/product/:id`):**
   - High-res photo gallery with thumbnails and zoom preview
   - Dynamic price updates based on bottle size selection (30ml, 50ml, 100ml)
   - Longevity & Sillage indicators (12-16 hours on skin, heavy trail)
   - Top, Heart, Base notes pyramid visualizer
   - Direct WhatsApp inquiry button with pre-filled perfume specifications
   - Add to bag with quantity selector
   - Verified customer review submission form
   - Related creations & recently viewed tracking
5. **Interactive Scent Quiz / Matchmaker:**
   - 3-step interactive recommendation engine matching mood, occasion, and scent notes
6. **Shopping Bag & Slide-Over Drawer (`/cart`):**
   - Free shipping progress meter (Complimentary delivery over PKR 5,000)
   - Size-specific item variant management
   - Coupon voucher engine (`AURA10` for 10% off, `ROYALTY` for Rs. 1,000 off)
   - "Inquire / Order via WhatsApp" button with structured cart summary
7. **Checkout (`/checkout`):**
   - Pakistani phone format validation (`03XX-XXXXXXX` or `+923XXXXXXXXX`)
   - Dropdown of Pakistani cities (Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Multan, etc.)
   - Payment Methods: Cash on Delivery (COD), Direct Bank Transfer, WhatsApp Concierge
   - Persistent order storage and order reference generation (`AS-XXXXX`)
8. **Order Confirmation (`/order-confirmation/:orderId`):**
   - Celebratory confetti animation
   - Complete itemized breakdown and printable receipt
   - Direct WhatsApp order follow-up link
9. **Order Tracking (`/track-order`):**
   - Search by order reference number (`AS-XXXXX`)
   - 4-stage visual timeline (Order Placed -> Artisanal Preparation -> Dispatched -> Delivered)
   - Real-time courier consignment number display (TCS / Leopards)
10. **Customer Account & History (`/account`, `/account/orders`):**
    - Patron profile, membership status, and past orders archive
11. **Client Concierge & Policies (`/about`, `/contact`, `/faqs`, `/shipping-returns`, `/privacy-policy`, `/terms-conditions`):**
    - Complete policy coverage, Flagship Studio coordinates in Lahore, WhatsApp desk
12. **Custom 404 Sanctuary (`*`):**
    - Styled error route guiding visitors back to the fragrance vault

---

### 2. Protected Admin Atelier (`/admin`)
- **Protected Security Gate:** Requires administrator role (`admin@aurasublime.com`). Non-admin visitors cannot access or mutate store records.
- **Executive Overview (`/admin`):**
  - Gross sales in PKR, total orders, average order value, low stock alerts (< 15 units remaining)
- **Product Management (`/admin/products`):**
  - Create, edit, and delete flacons
  - Configure Top, Heart, Base notes, bottle sizes, prices, and stock
- **Order Fulfillment & Logistics (`/admin/orders`):**
  - Filter orders by status (Pending, Processing, Dispatched, Delivered, Cancelled)
  - Assign TCS / Leopards tracking consignment numbers
  - Update fulfillment stage which immediately reflects on the client tracking page
- **Review Moderation (`/admin/reviews`):**
  - Approve or delete customer submitted reviews
- **Newsletter Subscribers (`/admin/subscribers`):**
  - View subscriber emails, dates, and export to CSV
- **Store Settings (`/admin/settings`):**
  - Configure WhatsApp business number, delivery charges, free delivery threshold, and announcement bar

---

## 📱 WhatsApp Business Concierge Integration

WhatsApp is embedded via standard URI schemes (`https://wa.me/<number>?text=<encoded_message>`):
- **Global Floating Button:** Opens concierge chat with prefilled greeting.
- **Product Detail Inquiry:** Generates structured inquiry including perfume name, size, price, and collection.
- **Cart Summary Inquiry:** Summarizes all items, selected sizes, quantities, and order total.
- **Order Support:** Prefills order reference number and customer name for rapid status resolution.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 18 + Vite |
| **Routing** | React Router v6 |
| **Styling** | Tailwind CSS + Custom CSS Variables |
| **Icons** | Lucide React |
| **Backend / DB** | Appwrite Web SDK (with offline fallback store) |
| **Delight** | Canvas Confetti |

---

## ⚙️ Quick Start & Local Development

### Prerequisites
- Node.js v18+ and npm installed.

### 1. Clone & Install
```bash
git clone https://github.com/your-username/aura-sublime.git
cd aura-sublime
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(The application works 100% out of the box with the default offline persistence layer if Appwrite credentials are not yet supplied!)*

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🔑 Demo Access Credentials

To test the admin atelier and patron experiences immediately:

### Admin Atelier (Full Management Privileges):
- **Email:** `admin@aurasublime.com`
- **Password:** `AuraAdmin2026!`
- *(Click the **"Fill Admin"** quick button on the login page)*

### Customer Patron Account:
- **Email:** `patron@aurasublime.com`
- **Password:** `Patron2026!`
- *(Click the **"Fill Customer"** quick button on the login page)*

---

## ☁️ Appwrite Backend Provisioning

To link your personal Appwrite Cloud instance:

1. Create a project on [Appwrite Cloud](https://cloud.appwrite.io).
2. Create an API Key under **Project Settings -> API Keys** with `databases.*` and `storage.*` permissions.
3. Run the automated setup script:
```bash
$env:APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
$env:APPWRITE_PROJECT_ID="your_project_id"
$env:APPWRITE_API_KEY="your_api_key"
node scripts/setup-appwrite.js
```
This automatically sets up:
- Database: `aura_sublime_db`
- Collections: `products`, `orders`, `reviews`, `subscribers`, `store_settings`
- Storage Bucket: `product_assets`
- Schema attributes and permissions

---

## 🚢 Deployment (Vercel & Netlify)

### Vercel:
1. Push your repository to GitHub.
2. Import repository into Vercel.
3. Set build command: `npm run build` and output directory: `dist`.
4. Add environment variables from `.env.example`.
5. Deploy! (Routing rewrites are already configured in `vercel.json`).

### Netlify:
1. Import repository into Netlify.
2. Set build command: `npm run build` and publish directory: `dist`.
3. Client-side routing is handled via `public/_redirects`.
4. Deploy!

---

## 📜 Verification Checklist

- [x] Sticky navigation bar with dynamic counters (Cart & Wishlist)
- [x] Full-screen cinematic hero section with luxury perfume visual
- [x] 4 Curated collections (Men's, Women's, Oud, Signature)
- [x] Dynamic sizing (30ml, 50ml, 100ml) with price adjustments in PKR
- [x] Real-time discount code calculation (`AURA10`, `ROYALTY`)
- [x] Free delivery threshold progress meter (PKR 5,000)
- [x] Pakistani phone validation & cities selector
- [x] Cash on Delivery (COD) and WhatsApp assisted order placement
- [x] Order confirmation with confetti & printable receipt
- [x] Order tracking with live courier consignment timeline
- [x] Protected Admin Atelier with product CRUD, stock manager, order status updater, review moderation, and CSV export
- [x] Optimized chunk bundle splitting under 140 kB gzip
- [x] Complete SEO, OpenGraph tags, sitemap.xml, and robots.txt

---
*AURA SUBLIME — Premium Yet Accessible Luxury.*
