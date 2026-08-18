/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { Hero } from './components/Hero';
import { FreeFireVault } from './components/FreeFireVault';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TrustSection } from './components/TrustSection';
import { CheckoutModal } from './components/CheckoutModal';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { CartDrawer } from './components/CartDrawer';
import { ReceiptModal } from './components/ReceiptModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';

import { 
  INITIAL_PRODUCTS, 
  INITIAL_COUPONS, 
  SAMPLE_ORDERS, 
  SAMPLE_TICKETS 
} from './data/products';
import { 
  Product, 
  CartItem, 
  Order, 
  SupportTicket, 
  Coupon, 
  Platform, 
  Denomination 
} from './types';

export default function App() {
  // Navigation & Views: 'marketplace' | 'freefire' | 'trust' | 'user-dashboard' | 'admin-dashboard'
  const [currentView, setCurrentView] = useState<string>('marketplace');
  
  // Data State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [tickets, setTickets] = useState<SupportTicket[]>(SAMPLE_TICKETS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  
  // Filters & Global Settings
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal & Drawer States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);
  
  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'error', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart Management
  const handleAddToCart = (
    product: Product, 
    denomination: Denomination, 
    uid?: string, 
    region?: string
  ) => {
    const existingIndex = cart.findIndex(
      item => item.productId === product.id && 
              item.denominationId === denomination.id && 
              item.directUid === uid
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `ci-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        productTitle: product.title,
        platform: product.platform,
        denominationId: denomination.id,
        denominationName: denomination.name,
        price: denomination.price,
        originalPrice: denomination.originalPrice,
        quantity: 1,
        image: product.image,
        deliveryType: product.deliveryType,
        directUid: uid,
        serverRegion: region,
        bonus: denomination.bonus
      };
      setCart(prev => [...prev, newItem]);
    }

    addToast(
      'success', 
      'Added to Gaming Cart', 
      `${denomination.name} (${product.platform}) was added.`
    );
  };

  const handleUpdateQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity: qty } : item));
  };

  const handleRemoveItem = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    addToast('info', 'Item Removed', 'Item was removed from your cart.');
  };

  // Instant 1-Click Buy Now
  const handleInstantBuy = (
    product: Product, 
    denomination: Denomination, 
    uid?: string, 
    region?: string
  ) => {
    const singleItem: CartItem = {
      id: `instant-${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      platform: product.platform,
      denominationId: denomination.id,
      denominationName: denomination.name,
      price: denomination.price,
      originalPrice: denomination.originalPrice,
      quantity: 1,
      image: product.image,
      deliveryType: product.deliveryType,
      directUid: uid,
      serverRegion: region,
      bonus: denomination.bonus
    };

    setCheckoutItems([singleItem]);
    setIsCheckoutOpen(true);
  };

  // Cart Checkout
  const handleProceedToCartCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutItems([...cart]);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order Placement
  const handleOrderCompleted = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    // Clear items that were purchased from cart
    const purchasedProductDenoms = new Set(
      newOrder.items.map(i => `${i.productId}-${i.denominationId}`)
    );
    setCart(prev => prev.filter(i => !purchasedProductDenoms.has(`${i.productId}-${i.denominationId}`)));

    addToast(
      'success',
      'Digital Keys Dispatched!',
      `Order ${newOrder.orderNumber} successfully processed.`
    );
  };

  // Support Ticket Actions
  const handleCreateTicket = (ticketData: Partial<SupportTicket>) => {
    const newTkt: SupportTicket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketData.subject || 'Order Support Inquiry',
      category: ticketData.category || 'Free Fire Top-Up',
      priority: ticketData.priority || 'Medium',
      status: 'Open',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      updatedAt: 'Just now',
      messages: ticketData.messages || []
    };

    setTickets(prev => [newTkt, ...prev]);
    addToast('success', 'Support Ticket Submitted', `Ticket ${newTkt.ticketNumber} is in the live agent queue.`);

    // Simulate smart auto-reply
    setTimeout(() => {
      setTickets(prev => prev.map(t => {
        if (t.id === newTkt.id) {
          return {
            ...t,
            status: 'Pending',
            messages: [
              ...t.messages,
              {
                id: `rep-${Date.now()}`,
                sender: 'support',
                senderName: 'Apex Automated Bot (Cipher)',
                text: `Thank you for contacting ApexVoucher Support! We have assigned a senior representative to verify your request for ${t.category}. If this is regarding a Free Fire UID, our direct Garena clearing status indicates 100% normal API throughput. We will follow up in moments.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]
          };
        }
        return t;
      }));
    }, 2000);
  };

  const handleReplyTicket = (ticketId: string, message: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          updatedAt: 'Just now',
          messages: [
            ...t.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'user',
              senderName: 'Alex Mercer',
              text: message,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      }
      return t;
    }));
  };

  // Admin Actions
  const handleUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    addToast('success', 'Product Updated', `Saved settings for ${updated.title}`);
  };

  const handleAddCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev]);
    addToast('success', 'Coupon Created', `Promo code ${coupon.code} is now live.`);
  };

  const handleToggleCoupon = (code: string) => {
    setCoupons(prev => prev.map(c => c.code === code ? { ...c, active: !c.active } : c));
  };

  const handleUpdateOrderStatus = (orderId: string, status: 'Completed' | 'Refunded') => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    addToast('info', 'Order Status Changed', `Order ${orderId} updated to ${status}`);
  };

  const handleResolveTicket = (ticketId: string) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'Resolved' } : t));
    addToast('success', 'Ticket Resolved', 'Support ticket marked as closed.');
  };

  const freeFireProducts = products.filter(p => p.platform === 'Free Fire');

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onOpenQuickTopup={() => {
          setCurrentView('freefire');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: MARKETPLACE HOME */}
        {currentView === 'marketplace' && (
          <>
            {/* Hero Section */}
            <Hero
              onBrowseCards={() => {
                const el = document.getElementById('marketplace-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onViewDeals={() => {
                setSelectedPlatform('Free Fire');
                const el = document.getElementById('marketplace-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectPlatform={(platform) => {
                setSelectedPlatform(platform);
                const el = document.getElementById('marketplace-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenQuickTopup={() => setCurrentView('freefire')}
            />

            {/* Free Fire Vault Spotlight */}
            <FreeFireVault
              freeFireProducts={freeFireProducts}
              selectedCurrency={selectedCurrency}
              onInstantBuy={handleInstantBuy}
              onAddToCart={handleAddToCart}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* Product Marketplace Search & Filter Grid */}
            <ProductGrid
              products={products}
              selectedCurrency={selectedCurrency}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onInstantBuy={handleInstantBuy}
              onAddToCart={handleAddToCart}
            />

            {/* Trust Section: Why Buy From Us */}
            <TrustSection />
          </>
        )}

        {/* VIEW 2: DEDICATED FREE FIRE ZONE */}
        {currentView === 'freefire' && (
          <div className="space-y-8">
            <FreeFireVault
              freeFireProducts={freeFireProducts}
              selectedCurrency={selectedCurrency}
              onInstantBuy={handleInstantBuy}
              onAddToCart={handleAddToCart}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* Full Product Grid filtered by Free Fire */}
            <ProductGrid
              products={products.filter(p => p.platform === 'Free Fire' || p.platform === 'Garena')}
              selectedCurrency={selectedCurrency}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onInstantBuy={handleInstantBuy}
              onAddToCart={handleAddToCart}
            />

            <TrustSection />
          </div>
        )}

        {/* VIEW 3: WHY US / AUTHENTICITY SECTION */}
        {currentView === 'trust' && (
          <div>
            <TrustSection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <h3 className="text-xl font-bold text-white font-mono mb-4 text-center">
                Explore Authorized Gift Cards
              </h3>
              <div className="text-center">
                <button
                  onClick={() => setCurrentView('marketplace')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-mono tracking-wider uppercase cursor-pointer"
                >
                  Return to Product Marketplace
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: USER ORDERS & VOUCHERS DASHBOARD */}
        {currentView === 'user-dashboard' && (
          <UserDashboard
            orders={orders}
            tickets={tickets}
            selectedCurrency={selectedCurrency}
            onViewReceipt={(order) => setReceiptOrder(order)}
            onCreateTicket={handleCreateTicket}
            onReplyTicket={handleReplyTicket}
          />
        )}

        {/* VIEW 5: ADMIN & OPERATIONS DASHBOARD */}
        {currentView === 'admin-dashboard' && (
          <AdminDashboard
            products={products}
            orders={orders}
            coupons={coupons}
            tickets={tickets}
            selectedCurrency={selectedCurrency}
            onUpdateProduct={handleUpdateProduct}
            onAddCoupon={handleAddCoupon}
            onToggleCoupon={handleToggleCoupon}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onResolveTicket={handleResolveTicket}
          />
        )}

      </main>

      {/* Global Modals & Drawers */}
      
      {/* 1. Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          selectedCurrency={selectedCurrency}
          onClose={() => setSelectedProduct(null)}
          onInstantBuy={handleInstantBuy}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 2. Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        selectedCurrency={selectedCurrency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCartCheckout}
      />

      {/* 3. Secure Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          items={checkoutItems}
          selectedCurrency={selectedCurrency}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderCompleted={handleOrderCompleted}
          onViewReceipt={(order) => {
            setIsCheckoutOpen(false);
            setReceiptOrder(order);
          }}
        />
      )}

      {/* 4. Tax Invoice / Receipt Modal */}
      {receiptOrder && (
        <ReceiptModal
          order={receiptOrder}
          onClose={() => setReceiptOrder(null)}
        />
      )}

      {/* Toast Notification Stream */}
      <ToastContainer
        toasts={toasts}
        onDismiss={removeToast}
      />

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onFilterPlatform={(platform) => setSelectedPlatform(platform)}
      />

    </div>
  );
}
