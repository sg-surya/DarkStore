import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  ShoppingCart, 
  Flame, 
  User, 
  LayoutDashboard, 
  Gift, 
  Menu, 
  X,
  Zap,
  Box
} from 'lucide-react';
import { CURRENCIES } from '../data/products';
import { Product } from '../types';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  cartCount: number;
  openCart: () => void;
  selectedCurrency: string;
  setSelectedCurrency: (curr: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenQuickTopup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  cartCount,
  openCart,
  selectedCurrency,
  setSelectedCurrency,
  searchQuery,
  setSearchQuery,
  products,
  onSelectProduct,
  onOpenQuickTopup
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchResults = searchQuery.trim() === '' ? [] : products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const currentCurr = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full border-b border-[#1e222b] bg-[#090a0f]/95 backdrop-blur-md">
      {/* Top Notice Bar */}
      <div className="w-full border-b border-[#181b22] bg-[#0c0e14] px-4 py-1.5 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-neutral-800 text-neutral-200 border border-neutral-700">
              OFFICIAL
            </span>
            <span className="hidden sm:inline text-neutral-300">
              Direct game top-ups & authorized gift vouchers with instant automated delivery.
            </span>
            <span className="sm:hidden text-neutral-300">
              Instant gaming top-ups & gift cards.
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
              24/7 Automated Dispatch
            </span>
            <button 
              onClick={() => setCurrentView('trust')}
              className="hover:text-neutral-200 transition-colors hidden md:inline-flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3 text-neutral-400" />
              Guaranteed Authentic
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo: Dark Store */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none" 
            onClick={() => setCurrentView('marketplace')}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#14171f] border border-[#262c38] text-white">
              <Box className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white font-mono">
                  DARK<span className="text-neutral-400">STORE</span>
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar with Autocomplete */}
          <div className="hidden lg:flex flex-1 max-w-md relative">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                placeholder="Search games, gift cards, or diamond top-ups..."
                className="w-full bg-[#111317] border border-[#222632] hover:border-[#353c4d] focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 rounded-lg pl-9 pr-4 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 outline-none transition-colors font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 text-xs font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#111317] border border-[#222632] rounded-lg shadow-xl p-1.5 z-50 overflow-hidden">
                <div className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wider px-2.5 py-1">
                  Matching Results
                </div>
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onMouseDown={() => {
                      onSelectProduct(item);
                      setIsSearchFocused(false);
                    }}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-[#181b22] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={item.image} alt={item.title} className="w-7 h-7 rounded object-cover border border-neutral-800" />
                      <div>
                        <div className="text-xs font-medium text-neutral-200">{item.title}</div>
                        <div className="text-[10px] text-neutral-400 font-mono">{item.platform} • {item.region}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-emerald-400">
                      {currentCurr.symbol}{(item.denominations[0].price * currentCurr.rate).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-marketplace-btn"
              onClick={() => setCurrentView('marketplace')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'marketplace'
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              Store
            </button>

            <button
              id="nav-freefire-btn"
              onClick={() => setCurrentView('freefire')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'freefire'
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Top-Up Vault
            </button>

            <button
              id="nav-trust-btn"
              onClick={() => setCurrentView('trust')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'trust'
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              Authenticity
            </button>

            <button
              id="nav-user-btn"
              onClick={() => setCurrentView('user-dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'user-dashboard'
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Orders & Keys
            </button>

            <button
              id="nav-admin-btn"
              onClick={() => setCurrentView('admin-dashboard')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 ${
                currentView === 'admin-dashboard' ? 'bg-neutral-800 text-white border border-neutral-700' : ''
              }`}
              title="Admin Portal"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Admin</span>
            </button>
          </nav>

          {/* Right Action Controls: Currency Switcher, Quick Topup, Cart */}
          <div className="flex items-center gap-2">
            {/* Currency Selector */}
            <div className="relative">
              <select
                id="currency-selector"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-[#111317] text-neutral-300 text-xs font-mono border border-[#222632] rounded-lg px-2 py-1.5 outline-none cursor-pointer hover:border-neutral-700 focus:border-neutral-600"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-[#111317] text-neutral-200">
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Top-Up Button */}
            <button
              id="quick-topup-btn"
              onClick={onOpenQuickTopup}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-white text-neutral-950 font-semibold text-xs font-mono transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-neutral-950" />
              <span>Direct Top-Up</span>
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              id="cart-drawer-trigger"
              onClick={openCart}
              className="relative p-2 rounded-lg bg-[#111317] border border-[#222632] hover:border-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="View Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-sky-500 text-slate-950 text-[10px] font-mono font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#111317] border border-[#222632] text-neutral-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="lg:hidden pb-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gift cards and vouchers..."
              className="w-full bg-[#111317] border border-[#222632] rounded-lg pl-9 pr-4 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 outline-none font-mono"
            />
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#1e222b] py-2.5 space-y-1">
            <button
              onClick={() => {
                setCurrentView('marketplace');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 ${
                currentView === 'marketplace' ? 'bg-neutral-800 text-white' : 'text-neutral-300'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              Gift Card Store
            </button>
            <button
              onClick={() => {
                setCurrentView('freefire');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 ${
                currentView === 'freefire' ? 'bg-neutral-800 text-white' : 'text-neutral-300'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Direct Top-Up Vault
            </button>
            <button
              onClick={() => {
                setCurrentView('trust');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 ${
                currentView === 'trust' ? 'bg-neutral-800 text-white' : 'text-neutral-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              Authenticity Guarantee
            </button>
            <button
              onClick={() => {
                setCurrentView('user-dashboard');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 ${
                currentView === 'user-dashboard' ? 'bg-neutral-800 text-white' : 'text-neutral-300'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              My Orders & Keys
            </button>
            <button
              onClick={() => {
                setCurrentView('admin-dashboard');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 ${
                currentView === 'admin-dashboard' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Admin Portal
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  onOpenQuickTopup();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 rounded-lg bg-neutral-100 text-neutral-950 font-bold text-xs font-mono flex items-center justify-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 fill-neutral-950" />
                Direct UID Top-Up
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

