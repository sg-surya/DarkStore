import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  RotateCcw,
  SlidersHorizontal,
  ArrowUpDown,
  Check
} from 'lucide-react';
import { Product, Platform, Region, ProductCategory, Denomination } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCurrency: string;
  selectedPlatform: Platform | 'all';
  setSelectedPlatform: (p: Platform | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectProduct: (product: Product) => void;
  onInstantBuy: (product: Product, denomination: Denomination) => void;
  onAddToCart: (product: Product, denomination: Denomination) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCurrency,
  selectedPlatform,
  setSelectedPlatform,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  onInstantBuy,
  onAddToCart
}) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under10' | '10to25' | '25to50' | 'above50'>('all');
  const [inStockOnly, setInStockOnly] = useState(true);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'priceAsc' | 'priceDesc'>('popular');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const platforms: (Platform | 'all')[] = [
    'all',
    'Free Fire',
    'Garena',
    'Steam',
    'Google Play',
    'PlayStation',
    'Xbox',
    'Roblox',
    'Razer Gold',
    'Valorant'
  ];

  const regions: (Region | 'all')[] = ['all', 'Global', 'US', 'EU', 'BR', 'SEA', 'IND', 'MENA'];

  const categories: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Catalog' },
    { id: 'game_currency', label: 'Direct Top-Up & Diamonds' },
    { id: 'gift_card', label: 'Digital Gift Cards' },
    { id: 'membership', label: 'Memberships & VIP' },
    { id: 'bundle', label: 'Exclusive Bundles' }
  ];

  // Filtering & Sorting logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Platform filter
      if (selectedPlatform !== 'all' && item.platform !== selectedPlatform) return false;

      // Region filter
      if (selectedRegion !== 'all' && item.region !== selectedRegion && item.region !== 'Global') return false;

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Search keyword
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchPlatform = item.platform.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        if (!matchTitle && !matchPlatform && !matchDesc) return false;
      }

      // Price filter
      const minPrice = item.denominations[0].price;
      if (priceFilter === 'under10' && minPrice >= 10) return false;
      if (priceFilter === '10to25' && (minPrice < 10 || minPrice > 25)) return false;
      if (priceFilter === '25to50' && (minPrice < 25 || minPrice > 50)) return false;
      if (priceFilter === 'above50' && minPrice < 50) return false;

      // In-stock filter
      if (inStockOnly && !item.denominations.some(d => d.inStock)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceAsc') return a.denominations[0].price - b.denominations[0].price;
      if (sortBy === 'priceDesc') return b.denominations[0].price - a.denominations[0].price;
      return 0;
    });
  }, [products, selectedPlatform, selectedRegion, selectedCategory, searchQuery, priceFilter, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedPlatform('all');
    setSelectedRegion('all');
    setSelectedCategory('all');
    setPriceFilter('all');
    setSearchQuery('');
    setInStockOnly(true);
  };

  const hasActiveFilters = selectedPlatform !== 'all' || selectedRegion !== 'all' || selectedCategory !== 'all' || priceFilter !== 'all' || searchQuery !== '';

  return (
    <section id="marketplace-section" className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#1e222b]">
        <div>
          <div className="text-xs font-mono text-neutral-400 mb-1">
            CATALOG ({filteredProducts.length} PRODUCTS)
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Gaming Gift Cards & Top-Ups
          </h2>
        </div>

        {/* Sort and Filter Toggles */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#111317] border border-[#222632] rounded-lg px-2.5 py-1.5 text-xs text-neutral-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-neutral-500 font-mono hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-neutral-200 outline-none cursor-pointer font-mono text-xs"
            >
              <option value="popular" className="bg-[#111317]">Most Popular</option>
              <option value="rating" className="bg-[#111317]">Highest Rated</option>
              <option value="priceAsc" className="bg-[#111317]">Price: Low to High</option>
              <option value="priceDesc" className="bg-[#111317]">Price: High to Low</option>
            </select>
          </div>

          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="lg:hidden px-3 py-1.5 rounded-lg bg-[#111317] border border-[#222632] text-neutral-300 text-xs font-medium flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Filter Panel */}
        <div className={`lg:col-span-3 space-y-4 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
          
          <div className="bg-[#111317] border border-[#1e222b] rounded-xl p-4 space-y-5">
            
            {/* Filter Header */}
            <div className="flex items-center justify-between border-b border-[#1e222b] pb-2.5">
              <span className="text-xs font-mono font-semibold text-neutral-300 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-neutral-400" />
                Filter Options
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            {/* Platform Filter */}
            <div>
              <label className="text-[11px] font-mono text-neutral-400 block mb-2 uppercase">
                Platform
              </label>
              <div className="space-y-0.5">
                {platforms.map((p) => {
                  const isSelected = selectedPlatform === p;
                  const count = p === 'all' 
                    ? products.length 
                    : products.filter(item => item.platform === p).length;

                  return (
                    <button
                      key={p}
                      onClick={() => setSelectedPlatform(p)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#1a1e27] text-white font-semibold border border-[#2e3544]'
                          : 'text-neutral-400 hover:text-neutral-200 hover:bg-[#14171e]'
                      }`}
                    >
                      <span className="capitalize">{p === 'all' ? 'All Platforms' : p}</span>
                      <span className="text-[10px] text-neutral-500">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter */}
            <div className="border-t border-[#1e222b] pt-4">
              <label className="text-[11px] font-mono text-neutral-400 block mb-2 uppercase">
                Category
              </label>
              <div className="space-y-0.5">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                      selectedCategory === c.id
                        ? 'bg-[#1a1e27] text-white font-semibold border border-[#2e3544]'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-[#14171e]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Filter */}
            <div className="border-t border-[#1e222b] pt-4">
              <label className="text-[11px] font-mono text-neutral-400 block mb-2 uppercase">
                Region
              </label>
              <div className="grid grid-cols-2 gap-1">
                {regions.map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setSelectedRegion(reg)}
                    className={`px-2 py-1 rounded text-xs font-mono text-center transition-colors cursor-pointer ${
                      selectedRegion === reg
                        ? 'bg-[#1a1e27] text-white font-semibold border border-[#2e3544]'
                        : 'bg-[#0c0e14] text-neutral-400 border border-[#1e222b] hover:border-neutral-700'
                    }`}
                  >
                    {reg === 'all' ? 'Any' : reg}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border-t border-[#1e222b] pt-4">
              <label className="text-[11px] font-mono text-neutral-400 block mb-2 uppercase">
                Price
              </label>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'under10', label: 'Under $10' },
                  { id: '10to25', label: '$10 – $25' },
                  { id: '25to50', label: '$25 – $50' },
                  { id: 'above50', label: '$50+' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setPriceFilter(tier.id as any)}
                    className={`w-full text-left px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      priceFilter === tier.id
                        ? 'bg-[#1a1e27] text-white font-semibold border border-[#2e3544]'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="border-t border-[#1e222b] pt-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-mono text-neutral-300">In-Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#0c0e14] border-neutral-700 text-sky-500 focus:ring-0"
                />
              </label>
            </div>

          </div>

        </div>

        {/* Right Main Grid: Products List */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono">
              <span className="text-neutral-500">Filters:</span>
              {selectedPlatform !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-[#14171f] border border-[#222632] text-neutral-200 flex items-center gap-1">
                  {selectedPlatform}
                  <button onClick={() => setSelectedPlatform('all')} className="hover:text-white ml-0.5">✕</button>
                </span>
              )}
              {selectedRegion !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-[#14171f] border border-[#222632] text-neutral-200 flex items-center gap-1">
                  Region: {selectedRegion}
                  <button onClick={() => setSelectedRegion('all')} className="hover:text-white ml-0.5">✕</button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-[#14171f] border border-[#222632] text-neutral-200 flex items-center gap-1">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-white ml-0.5">✕</button>
                </span>
              )}
              {searchQuery && (
                <span className="px-2 py-0.5 rounded bg-[#14171f] border border-[#222632] text-neutral-200 flex items-center gap-1">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-white ml-0.5">✕</button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs font-mono text-neutral-400 hover:text-white ml-1 underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selectedCurrency={selectedCurrency}
                  onSelectProduct={onSelectProduct}
                  onInstantBuy={onInstantBuy}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-[#111317] border border-[#1e222b] rounded-xl p-10 text-center space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#181b22] flex items-center justify-center text-neutral-500 mx-auto">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">No Products Found</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto font-mono">
                No items matched your current filter criteria.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-lg bg-[#181b22] hover:bg-[#222632] border border-[#262c38] text-neutral-200 font-mono text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Filters
              </button>
            </div>
          )}

        </div>

      </div>

    </section>
  );
};

