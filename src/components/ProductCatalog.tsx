import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  searchQuery: string;
  selectedCity: string;
  onSelectProduct: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  searchQuery,
  selectedCity,
  onSelectProduct,
  onBuyNow,
}) => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high'>('featured');

  const categories: { id: Category; label: string; urduLabel: string }[] = [
    { id: 'all', label: 'All Items', urduLabel: 'تمام اشیاء' },
    { id: 'mobiles', label: 'Mobiles', urduLabel: 'موبائلز' },
    { id: 'laptops', label: 'Laptops', urduLabel: 'لیپ ٹاپ' },
    { id: 'vehicles', label: 'Vehicles & Bikes', urduLabel: 'گاڑیاں اور موٹرسائیکل' },
    { id: 'fashion', label: 'Fashion & Wear', urduLabel: 'کپڑے اور فیشن' },
    { id: 'electronics', label: 'Electronics', urduLabel: 'الیکٹرانکس' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // City filter
        if (selectedCity && !selectedCity.includes('All') && p.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCity = p.city.toLowerCase().includes(q);
          const matchUrdu = p.titleUrdu ? p.titleUrdu.toLowerCase().includes(q) : false;
          return matchTitle || matchDesc || matchCity || matchUrdu;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedCity, searchQuery, sortBy]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Category Filter Controls and Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {language === 'ur' ? cat.urduLabel : cat.label}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-600">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Count & Current Active Filters info */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong>{filteredProducts.length}</strong> items available with EasyPaisa & JazzCash
          {selectedCity && !selectedCity.includes('All') && ` in ${selectedCity}`}
        </span>
      </div>

      {/* 3-Column Desktop / 2-Column Tablet Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <Filter className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No items match your criteria</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try clearing the search query or selecting "All Cities" to discover more products.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      )}
    </section>
  );
};
