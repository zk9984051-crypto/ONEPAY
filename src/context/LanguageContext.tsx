import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: 'ONEPAY',
    tagline: 'Pakistan’s Premier Buy & Sell Marketplace with EasyPaisa & JazzCash',
    buy: 'Browse Items',
    sell: 'Sell Item',
    orders: 'My Orders',
    wallet: 'Seller Wallet',
    cart: 'Cart',
    searchPlaceholder: 'Search iPhone, Honda bike, laptop, fashion...',
    allCategories: 'All Categories',
    mobiles: 'Mobiles & Tablets',
    laptops: 'Laptops & Computers',
    vehicles: 'Vehicles & Bikes',
    fashion: 'Clothing & Fashion',
    electronics: 'Audio & Gadgets',
    home: 'Home & Living',
    city: 'City',
    filterByCity: 'Filter by City',
    condition: 'Condition',
    price: 'Price',
    location: 'Location',
    buyNow: 'Buy Now',
    addToCart: 'Add to Cart',
    contactSeller: 'Contact Seller',
    verifiedSeller: 'Verified Seller',
    paymentGuarantee: 'Protected by EasyPaisa & JazzCash Direct Checkout',
    checkout: 'Checkout & Pay',
    easyPaisa: 'EasyPaisa Mobile Wallet',
    jazzCash: 'JazzCash Mobile Account',
    cod: 'Cash on Delivery',
    payWith: 'Pay with',
    postAd: 'Post New Ad',
    postAdSubtitle: 'List your product for sale and receive instant payments in your EasyPaisa / JazzCash account',
    title: 'Ad Title',
    category: 'Category',
    description: 'Description',
    sellerName: 'Your Name',
    phoneNumber: 'WhatsApp / Mobile Number',
    jazzCashNo: 'JazzCash Receiving Number',
    easyPaisaNo: 'EasyPaisa Receiving Number',
    submitListing: 'Publish Listing',
    successListing: 'Listing published successfully!',
    emptyCart: 'Your cart is empty',
    orderSuccess: 'Payment Successful! Order Confirmed'
  },
  ur: {
    appName: 'ون پے (ONEPAY)',
    tagline: 'پاکستان کی پہلی ڈیجیٹل مارکیٹ - ایزی پیسہ اور جاز کیش فوری ادائیگی کے ساتھ',
    buy: 'خریداری کریں',
    sell: 'چیز بیچیں (اشتہار دیں)',
    orders: 'میرے آرڈرز',
    wallet: 'سیلر والٹ',
    cart: 'ٹوکری',
    searchPlaceholder: 'آئی فون، ہونڈا بائیک، لیپ ٹاپ یا کپڑے تلاش کریں...',
    allCategories: 'تمام کیٹیگریز',
    mobiles: 'موبائل اور ٹیبلٹ',
    laptops: 'لیپ ٹاپ اور کمپیوٹر',
    vehicles: 'گاڑیاں اور موٹرسائیکل',
    fashion: 'کپڑے اور فیشن',
    electronics: 'الیکٹرانکس اور گیجٹس',
    home: 'گھریلو سامان',
    city: 'شہر منتخب کریں',
    filterByCity: 'شہر کے لحاظ سے تلاش',
    condition: 'حالت (کنڈیشن)',
    price: 'قیمت',
    location: 'مقام',
    buyNow: 'ابھی خریدیں',
    addToCart: 'کارٹ میں شامل کریں',
    contactSeller: 'بیچنے والے سے رابطہ',
    verifiedSeller: 'تصدیق شدہ سیلر',
    paymentGuarantee: 'ایزی پیسہ اور جاز کیش براہ راست محفوظ ادائیگی',
    checkout: 'چیک آؤٹ اور ادائیگی',
    easyPaisa: 'ایزی پیسہ اکاؤنٹ',
    jazzCash: 'جاز کیش اکاؤنٹ',
    cod: 'کیش آن ڈیلیوری',
    payWith: 'ادائیگی بذریعہ',
    postAd: 'نیا اشتہار لگائیں',
    postAdSubtitle: 'اپنی چیز بیچنے کے لیے درج کریں اور فوری رقم اپنے ایزی پیسہ یا جاز کیش میں پائیں',
    title: 'چیز کا نام / عنوان',
    category: 'کیٹیگری',
    description: 'تفصیلات',
    sellerName: 'آپ کا نام',
    phoneNumber: 'موبائل یا واٹس ایپ نمبر',
    jazzCashNo: 'جاز کیش نمبر (رقم وصول کرنے کے لیے)',
    easyPaisaNo: 'ایزی پیسہ نمبر (رقم وصول کرنے کے لیے)',
    submitListing: 'اشتہار شائع کریں',
    successListing: 'اشتہار کامیابی سے لائیو ہو گیا!',
    emptyCart: 'آپ کی ٹوکری خالی ہے',
    orderSuccess: 'ادائیگی کامیاب! آرڈر کنفرم ہو گیا'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
  t: () => ''
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('bazaarpay_lang') as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('bazaarpay_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ur' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div className={language === 'ur' ? 'font-urdu' : ''} dir={language === 'ur' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
