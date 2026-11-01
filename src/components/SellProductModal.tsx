import React, { useState } from 'react';
import { X, Upload, Plus, CheckCircle2, DollarSign, Smartphone, MapPin, Sparkles } from 'lucide-react';
import { Product, Category, ProductCondition } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { PAKISTANI_CITIES } from '../data/initialProducts';

interface SellProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: (newProduct: Product) => void;
}

export const SellProductModal: React.FC<SellProductModalProps> = ({
  isOpen,
  onClose,
  onProductCreated,
}) => {
  const { language, t } = useLanguage();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('mobiles');
  const [condition, setCondition] = useState<ProductCondition>('Brand New (سیل پیک)');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('Lahore');
  const [locationArea, setLocationArea] = useState('');
  const [description, setDescription] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [phone, setPhone] = useState('0300-1234567');
  const [whatsapp, setWhatsapp] = useState('923001234567');
  const [easyPaisaNumber, setEasyPaisaNumber] = useState('0345-1234567');
  const [jazzCashNumber, setJazzCashNumber] = useState('0300-1234567');
  const [imagePreview, setImagePreview] = useState<string>('/src/assets/images/product_iphone15_pro_1793473938310.jpg');
  const [customImageLoading, setCustomImageLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomImageLoading(true);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setCustomImageLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const samplePresets = [
    { label: 'Smartphone', url: '/src/assets/images/product_iphone15_pro_1793473938310.jpg' },
    { label: 'Laptop', url: '/src/assets/images/product_dell_xps_laptop_1793473999123.jpg' },
    { label: 'Motorcycle', url: '/src/assets/images/product_honda_cg125_1793474000159.jpg' },
    { label: 'Kurta / Apparel', url: '/src/assets/images/product_designer_kurta_1793473939120.jpg' },
    { label: 'Accessories', url: '/src/assets/images/hero_marketplace_pakistan_1793473938173.jpg' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price || !sellerName.trim() || !phone.trim()) {
      setError(language === 'ur' ? 'براہ کرم تمام ضروری خانے پُر کریں۔' : 'Please fill all required fields.');
      return;
    }

    const numPrice = Number(price.replace(/[^0-9]/g, ''));
    if (isNaN(numPrice) || numPrice <= 0) {
      setError(language === 'ur' ? 'براہ کرم درست قیمت درج کریں۔' : 'Please enter a valid price in PKR.');
      return;
    }

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title,
      description: description.trim() || 'No additional description provided.',
      price: numPrice,
      category,
      condition,
      city,
      locationArea: locationArea.trim() || `${city} Central`,
      image: imagePreview,
      seller: {
        id: `seller-${Date.now()}`,
        name: sellerName,
        phone,
        whatsapp: whatsapp || phone.replace(/^0/, '92').replace(/[^0-9]/g, ''),
        verified: true,
        rating: 5.0,
        salesCount: 1,
        easyPaisaNumber,
        jazzCashNumber,
      },
      featured: true,
      createdAt: 'Just now',
      views: 1,
    };

    onProductCreated(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {language === 'ur' ? 'اپنی چیز بیچیں — مفت اشتہار لگائیں' : 'Sell Your Item — Post Free Ad'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'ur'
                ? 'رقم براہ راست اپنے ایزی پیسہ یا جاز کیش اکاؤنٹ میں وصول کریں'
                : 'Receive instant payments into your EasyPaisa & JazzCash account'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
              {error}
            </div>
          )}

          {/* Item details */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'ur' ? 'اشتہار کا عنوان *' : 'Ad Title *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Samsung Galaxy S23 Ultra 512GB (PTA Approved)"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('category')} *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 cursor-pointer"
                >
                  <option value="mobiles">Mobiles & Tablets</option>
                  <option value="laptops">Laptops & Computers</option>
                  <option value="vehicles">Vehicles & Bikes</option>
                  <option value="fashion">Fashion & Clothes</option>
                  <option value="electronics">Electronics & Audio</option>
                  <option value="home">Home & Living</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('condition')} *
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as ProductCondition)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 cursor-pointer"
                >
                  <option value="Brand New (سیل پیک)">Brand New (سیل پیک)</option>
                  <option value="Like New / Open Box (10/10)">Like New / Open Box (10/10)</option>
                  <option value="Used - Excellent (9/10)">Used - Excellent (9/10)</option>
                  <option value="Used - Fair Condition">Used - Fair Condition</option>
                </select>
              </div>
            </div>

            {/* Price & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ur' ? 'قیمت (پاکستانی روپے PKR) *' : 'Price in PKR *'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500">PKR</span>
                  <input
                    type="number"
                    required
                    min="100"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 85000"
                    className="w-full pl-12 pr-4 py-2 text-sm font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('city')} *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 cursor-pointer"
                >
                  {PAKISTANI_CITIES.filter((c) => !c.includes('All')).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'ur' ? 'علاقہ / لوکیشن' : 'Area / Neighborhood'}
              </label>
              <input
                type="text"
                value={locationArea}
                onChange={(e) => setLocationArea(e.target.value)}
                placeholder="e.g. Gulshan-e-Iqbal, Block 13-D or F-7 Markaz"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
            </div>

            {/* Photo selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {language === 'ur' ? 'چیز کی تصویر (فوٹو اپلوڈ کریں یا منتخب کریں)' : 'Product Image (Upload or Pick Template)'}
              </label>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-24 h-20 bg-slate-200 rounded-lg overflow-hidden shrink-0 border border-slate-300">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 space-y-2">
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-medium text-slate-700 cursor-pointer transition-colors shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload from Device</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-slate-500">Or pick preset:</span>
                    {samplePresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setImagePreview(preset.url)}
                        className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                          imagePreview === preset.url
                            ? 'bg-emerald-600 text-white font-medium'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('description')}
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mention all details, condition, warranty, accessories included..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
            </div>
          </div>

          {/* Payment Details Integration for Seller (EasyPaisa & JazzCash) */}
          <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-700" />
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                {language === 'ur'
                  ? 'رقم وصول کرنے کی تفصیلات (ایزی پیسہ اور جاز کیش)'
                  : 'Payout Integration (EasyPaisa & JazzCash)'}
              </h4>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              When a buyer purchases this item through ZsPay checkout, funds are automatically credited to your linked mobile wallet!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                  EasyPaisa Mobile Number
                </label>
                <input
                  type="text"
                  value={easyPaisaNumber}
                  onChange={(e) => setEasyPaisaNumber(e.target.value)}
                  placeholder="0345-XXXXXXX"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                  JazzCash Mobile Number
                </label>
                <input
                  type="text"
                  value={jazzCashNumber}
                  onChange={(e) => setJazzCashNumber(e.target.value)}
                  placeholder="0300-XXXXXXX"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'ur' ? 'آپ کا نام *' : 'Seller Name *'}
              </label>
              <input
                type="text"
                required
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                placeholder="e.g. Tariq Mehmood"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'ur' ? 'رابطہ فون نمبر *' : 'Contact Phone Number *'}
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0300-1234567"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-mono"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ur' ? 'اشتہار لائیو کریں' : 'Publish Ad Now'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
