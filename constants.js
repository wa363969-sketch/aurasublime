export const BRAND = {
  name: "AURA SUBLIME",
  tagline: "Premium Yet Accessible Luxury",
  description: "An artisanal fragrance house committed to distilling rare oud, exquisite florals, and regal oriental accords into timeless scents.",
  foundedYear: 2024,
  country: "Pakistan",
  currency: "PKR",
  currencySymbol: "Rs.",
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "923001234567",
  supportEmail: "concierge@aurasublime.com",
  supportPhone: "+92 300 1234567",
  address: "Flagship Studio, Galleria Promenade, Gulberg III, Lahore, Pakistan",
  socials: {
    instagram: "https://instagram.com/aurasublime",
    facebook: "https://facebook.com/aurasublime",
    tiktok: "https://tiktok.com/@aurasublime",
  },
  announcement: "Enjoy Complimentary Delivery Across Pakistan on Orders Above Rs. 5,000",
  freeShippingThreshold: 5000,
  defaultShippingFee: 250,
};

export const CITIES_PAKISTAN = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Abbottabad",
  "Bahawalpur",
  "Sargodha",
  "Sukkur",
  "Other",
];

export const COLLECTIONS = [
  {
    id: "men",
    name: "Men's Collection",
    slug: "men",
    tagline: "Bold, Magnetizing & Architectured",
    description: "Deep leathers, smoked woods, and crisp citrus notes engineered for presence and undeniable confidence.",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "women",
    name: "Women's Collection",
    slug: "women",
    tagline: "Ethereal, Sensual & Timeless",
    description: "Florentine orris, Taif rose, and bourbon vanilla woven into lingering trails of soft luxury.",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "oud",
    name: "Oud Collection",
    slug: "oud",
    tagline: "Imperial Cambodian & Assam Agarwood",
    description: "A tribute to age-old Arabian perfumery featuring pure aged oud resin, saffron nectar, and golden amber.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "signature",
    name: "Signature Scents",
    slug: "signature",
    tagline: "The Quintessential AURA SUBLIME Blends",
    description: "Our master perfumer's crown creations, balancing rare ingredients with extraordinary projection.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
  },
];

export const FRAGRANCE_FAMILIES = [
  "All Families",
  "Woody Oriental",
  "Oud & Amber",
  "Floral Powdery",
  "Aromatic Leather",
  "Fresh Aquatic",
  "Citrus Earthy",
];

export const FAQS = [
  {
    q: "How long do AURA SUBLIME perfumes last on skin and clothing?",
    a: "Our fragrances are formulated at high Extrait de Parfum and Eau de Parfum concentrations (20% to 28% pure fragrance oils). Expect 10 to 14 hours of persistent longevity on skin and up to 24+ hours on fabrics.",
  },
  {
    q: "What is your delivery timeframe across Pakistan?",
    a: "Orders for Lahore, Karachi, and Islamabad are typically delivered within 24 to 48 hours. Other cities across Pakistan arrive within 3 to 4 business days via premier tracked express couriers (TCS / Leopards).",
  },
  {
    q: "What payment methods are supported?",
    a: "We offer Cash on Delivery (COD) nationwide, Direct Bank Transfer via online banking, and WhatsApp-assisted ordering with concierge guidance.",
  },
  {
    q: "What is your return and exchange policy?",
    a: "We provide an unconditional 7-day hassle-free return or exchange for unopened, sealed bottles in original packaging. If you are exploring a new fragrance, we include sample discovery vials with select orders so you can test before opening the main bottle.",
  },
  {
    q: "How should I store my luxury perfume to preserve its potency?",
    a: "Keep your fragrance in a cool, dry place away from direct sunlight and extreme humidity. Avoid storing in bathrooms; a dresser drawer or perfume cabinet is ideal.",
  },
];
