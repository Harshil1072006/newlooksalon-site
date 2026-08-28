// ─────────────────────────────────────────────────────────────────────────────
// config.ts — New Look Salon
// ─────────────────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  category: string;
  name: string;
  description: string;
  image: string;
  startingPrice: string | null;
  duration: string | null;
  suitableFor: string;
  benefits: string[];
  whatsappMsg: string;
  featured?: boolean;
}

export interface OpeningHour {
  day: number;
  label: string;
  open: string | null;
  close: string | null;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export const config = {
  // ─── BUSINESS ──────────────────────────────────────────────────────────────
  name: 'New Look Salon',
  tagline: 'Your Look. Our Expertise.',
  description: 'Women\'s salon in Anand, Gujarat. Expert hair, skin, makeup & bridal services with 14+ years of experience.',
  phone: '+91 81560 20698',
  whatsappNumber: '918156020698',
  email: null as string | null,           // [PLACEHOLDER] optional
  address: null as string | null,         // [PLACEHOLDER] full street address
  city: 'Anand',
  state: 'Gujarat',
  pincode: null as string | null,         // [PLACEHOLDER]
  timezone: 'Asia/Kolkata',

  // ─── EXTERNAL LINKS (only real verified URLs) ───────────────────────────────
  websiteUrl: null as string | null,        // [PLACEHOLDER] real domain when purchased
  googleMapsUrl: 'https://maps.google.com/?q=New+Look+Salon+Anand+Gujarat',
  googleBusinessUrl: 'https://www.google.com/search?q=New+Look+Salon+Anand',
  googleReviewUrl: 'https://www.google.com/search?q=New+Look+Salon+Anand+Reviews', // Needs official Google Business link for direct popup
  instagramUrl: 'https://www.instagram.com/newlooksalon_anand/',
  facebookUrl: 'https://www.facebook.com/newlooksalonanand/',

  // ─── OPENING HOURS ─────────────────────────────────────────────────────────
  openingHours: [
    { day: 0, label: 'Sunday', open: null, close: null },
    { day: 1, label: 'Monday', open: null, close: null },
    { day: 2, label: 'Tuesday', open: null, close: null },
    { day: 3, label: 'Wednesday', open: null, close: null },
    { day: 4, label: 'Thursday', open: null, close: null },
    { day: 5, label: 'Friday', open: null, close: null },
    { day: 6, label: 'Saturday', open: null, close: null },
  ] as OpeningHour[],

  // ─── BRANDING ──────────────────────────────────────────────────────────────
  logo: '/logo.jpeg',
  heroImage: '/images/hero.png',
  primaryColor: '#C8935A',
  accentColor: '#2D2926',

  // ─── TRUST STATS (verified) ────────────────────────────────────────────────
  stats: [
    { value: '14+', label: 'Years Experience' },
    { value: '4.9★', label: 'Google Rating' },
    { value: '300+', label: 'Happy Clients' },
    { value: '1100+', label: 'Instagram Followers' },
  ],

  // ─── SERVICES ──────────────────────────────────────────────────────────────
  serviceCategories: ['All', 'Hair', 'Treatments', 'Skin & Facials', 'Makeup', 'Bridal'],

  services: [
    {
      id: 'hair-spa',
      category: 'Hair',
      name: 'Hair Spa',
      description: 'Deep nourishing treatment that repairs, conditions and adds brilliant shine to your hair.',
      image: '/images/services/hair.png',
      startingPrice: null,
      duration: null,
      suitableFor: 'All hair types',
      benefits: ['Deep conditioning', 'Reduces frizz', 'Adds shine', 'Scalp nourishment'],
      whatsappMsg: 'Hi New Look Salon, I want to know more about Hair Spa.',
    },
    {
      id: 'hair-colour',
      category: 'Hair',
      name: 'Hair Colour',
      description: 'Professional hair colouring — from natural shades to bold transformations.',
      image: '/images/services/hair.png',
      startingPrice: null,
      duration: null,
      suitableFor: 'All hair types',
      benefits: ['Long-lasting colour', 'Grey coverage', 'Vibrant finish', 'Ammonia-free options'],
      whatsappMsg: 'Hi New Look Salon, I want to know more about Hair Colour.',
    },
    {
      id: 'hair-regrowth',
      category: 'Treatments',
      name: 'Hair Regrowth Treatment',
      description: 'Specialised treatment that targets hair fall and thinning for healthier, fuller hair.',
      image: '/images/services/treatment.png',
      startingPrice: null,
      duration: null,
      suitableFor: 'Hair fall concerns',
      benefits: ['Targets hair fall', 'Strengthens roots', 'Promotes healthy growth', 'Scalp therapy'],
      whatsappMsg: 'Hi New Look Salon, I want to know more about Hair Regrowth Treatment.',
      featured: true,
    },
    {
      id: 'hair-keratin',
      category: 'Treatments',
      name: 'Keratin Treatment',
      description: 'Smooths, de-frizzes and strengthens hair for weeks of effortless styling.',
      image: '/images/services/treatment.png',
      startingPrice: null,
      duration: null,
      suitableFor: 'Frizzy or damaged hair',
      benefits: ['Frizz control', 'Smoother texture', 'Reduces styling time', 'Long-lasting'],
      whatsappMsg: 'Hi New Look Salon, I want to know more about Keratin Treatment.',
    },
    {
      id: 'facial',
      category: 'Skin & Facials',
      name: 'Facial',
      description: 'Rejuvenating skin treatment for glow, hydration and radiance.',
      image: '/images/services/skin.png',
      startingPrice: null,
      duration: null,
      suitableFor: 'All skin types',
      benefits: ['Deep cleansing', 'Hydration boost', 'Radiant glow', 'Relaxing'],
      whatsappMsg: 'Hi New Look Salon, I want to know more about Facial.',
    },
    {
      id: 'cleanup',
      category: 'Skin & Facials',
      name: 'Skin Cleanup',
      description: 'Quick and effective cleansing treatment to clear pores and refresh skin.',
      image: '/images/services/skin.png',
      startingPrice: null,
      duration: null,
      suitableFor: 'All skin types',
      benefits: ['Pore cleansing', 'Fresh skin', 'Quick treatment'],
      whatsappMsg: 'Hi New Look Salon, I want to know more about Skin Cleanup.',
    },
    {
      id: 'party-makeup',
      category: 'Makeup',
      name: 'Party Makeup',
      description: 'Glamorous makeup for parties, events and special occasions.',
      image: '/images/services/makeup.png',
      startingPrice: null,
      duration: null,
      suitableFor: 'All occasions',
      benefits: ['Professional finish', 'Long-lasting', 'Custom look', 'Premium products'],
      whatsappMsg: 'Hi New Look Salon, I want to know more about Party Makeup.',
    },
    {
      id: 'bridal-makeup',
      category: 'Bridal',
      name: 'Bridal Makeup',
      description: 'Complete bridal look crafted for your most important day.',
      image: '/images/services/bridal.png',
      startingPrice: null,
      duration: null,
      suitableFor: 'Brides',
      benefits: ['Trial session available', 'Long-lasting formula', 'Custom bridal look', 'HD finish'],
      whatsappMsg: 'Hi New Look Salon, I want to know more about Bridal Makeup.',
    },
    {
      id: 'bridal-package',
      category: 'Bridal',
      name: 'Bridal Package',
      description: 'All-inclusive bridal package covering hair, makeup, skin prep and more.',
      image: '/images/services/bridal.png',
      startingPrice: null,
      duration: null,
      suitableFor: 'Brides & bridal parties',
      benefits: ['Complete bridal look', 'Hair + makeup', 'Pre-bridal treatments', 'Trial included'],
      whatsappMsg: 'Hi New Look Salon, I want to know more about the Bridal Package.',
    },
  ] as Service[],

  // ─── OFFERS ────────────────────────────────────────────────────────────────
  offers: [],
  offerPopupEnabled: false,
  offerPopupDelaySec: 6,

  // ─── GALLERY / TRANSFORMATIONS ─────────────────────────────────────────────
  transformations: [],

  // ─── REVIEWS ───────────────────────────────────────────────────────────────
  reviews: [] as Review[],

  // ─── FAQ ───────────────────────────────────────────────────────────────────
  faqItems: [
    {
      q: 'How can I book an appointment?',
      a: 'Tap "Book Appointment" on this page to send a booking request, or WhatsApp us directly and we will confirm your slot.',
    },
    {
      q: 'What services do you offer?',
      a: 'We offer hair services, hair treatments, skin facials, makeup, and bridal packages.',
    },
    {
      q: 'How can I check prices?',
      a: 'WhatsApp us for the latest price list — we will send it right away.',
    },
    {
      q: 'Can I book through WhatsApp?',
      a: 'Yes — just message us and we will confirm your appointment.',
    },
  ],

  // ─── ANALYTICS ─────────────────────────────────────────────────────────────
  ga4MeasurementId: '',

  // ─── FEATURE FLAGS ─────────────────────────────────────────────────────────
  features: {
    pwa: true,
    installPrompt: true,
    analytics: true,
    offerPopup: false,
    serviceFinder: true,
    openNowStatus: false,
    saveContact: true,
    shareButton: true,
    copyAddress: false,
    transformations: false,
    reviews: false,
    bookingSystem: true,
    leadCapture: true,
    bridalFunnel: true,
    blog: true,
    smartUpsell: true,
    advancedGallery: true,
  },

  // ─── TEAM / STYLISTS ───────────────────────────────────────────────────────
  team: [
    { id: '1', name: 'Priya', role: 'Senior Stylist', image: '/images/team/1.jpg' },
    { id: '2', name: 'Neha', role: 'Makeup Artist', image: '/images/team/2.jpg' },
  ],
};
