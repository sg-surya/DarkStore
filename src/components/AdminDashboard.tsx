import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Tag, 
  TrendingUp, 
  RotateCcw, 
  LifeBuoy, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  AlertCircle, 
  DollarSign, 
  BarChart3, 
  ShieldCheck,
  Flame,
  Search
} from 'lucide-react';
import { Product, Order, Coupon, SupportTicket, Denomination } from '../types';
import { CURRENCIES } from '../data/products';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  coupons: Coupon[];
  tickets: SupportTicket[];
  selectedCurrency: string;
  onUpdateProduct: (product: Product) => void;
  onAddCoupon: (coupon: Coupon) => void;
  onToggleCoupon: (code: string) => void;
  onUpdateOrderStatus: (orderId: string, status: 'Completed' | 'Refunded') => void;
  onResolveTicket: (ticketId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  coupons,
  tickets,
  selectedCurrency,
  onUpdateProduct,
  onAddCoupon,
  onToggleCoupon,
  onUpdateOrderStatus,
  onResolveTicket
}) => {
  const currentCurr = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];

  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'products' | 'orders' | 'coupons' | 'tickets'>('analytics');
  
  // New Coupon form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(10);
  const [newCouponMin, setNewCouponMin] = useState(10);

  // Search orders / products
  const [adminSearch, setAdminSearch] = useState('');

  // Editing Product Modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Revenue math
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Refunded' ? o.total : 0), 0);
  const completedOrdersCount = orders.filter(o => o.status === 'Completed').length;
  const avgOrderValue = completedOrdersCount > 0 ? (totalRevenue / completedOrdersCount) : 0;

  const handleCreateCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    onAddCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponDiscount),
      minSpend: Number(newCouponMin),
      validUntil: '2027-12-31',
      usageLimit: 1000,
      timesUsed: 0,
      active: true
    });

    setNewCouponCode('');
  };

  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  return (
    <section id="admin-dashboard-section" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Admin Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white font-mono">Operations Command Center</h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                ADMIN LEVEL 5
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Live Digital Inventory, Garena Direct Gateway, and Merchant Revenue Console
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Publisher Gateway: Synced (18ms)
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2 mb-8">
        {[
          { id: 'analytics', label: 'Revenue Analytics', icon: BarChart3 },
          { id: 'products', label: 'Product Catalog', icon: Package, count: products.length },
          { id: 'orders', label: 'Live Orders', icon: ShoppingBag, count: orders.length },
          { id: 'coupons', label: 'Coupons & Promos', icon: Tag, count: coupons.length },
          { id: 'tickets', label: 'Helpdesk Tickets', icon: LifeBuoy, count: tickets.filter(t => t.status !== 'Resolved').length }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-purple-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: REVENUE ANALYTICS & METRICS */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-8">
          
          {/* Key KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Total Net Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black font-mono text-emerald-400">
                {currentCurr.symbol}{(totalRevenue * currentCurr.rate).toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">+14.2% compared to last week</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Completed Orders</span>
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black font-mono text-white">
                {completedOrdersCount}
              </div>
              <div className="text-[11px] text-emerald-400 font-mono">99.8% Automated Clearance</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Average Order Value</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black font-mono text-amber-400">
                {currentCurr.symbol}{(avgOrderValue * currentCurr.rate).toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">Top product: Free Fire Diamonds</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Active Voucher Codes</span>
                <Package className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black font-mono text-purple-400">
                {products.reduce((s, p) => s + p.denominations.reduce((ds, d) => ds + d.stockCount, 0), 0).toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">In cryptographic vault</div>
            </div>

          </div>

          {/* Revenue Breakdown by Platform */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              Product Revenue & Volume Distribution
            </h3>

            <div className="space-y-3">
              {[
                { name: 'Free Fire Direct UID Diamonds & VIP', share: 58, revenue: 86420, color: 'bg-amber-500' },
                { name: 'Steam Wallet Digital Codes', share: 22, revenue: 32760, color: 'bg-cyan-500' },
                { name: 'Google Play & Mobile Vouchers', share: 12, revenue: 17870, color: 'bg-emerald-500' },
                { name: 'PlayStation Store & Xbox Codes', share: 8, revenue: 11920, color: 'bg-purple-500' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>{item.name}</span>
                    <span className="text-emerald-400 font-bold">{currentCurr.symbol}{(item.revenue * currentCurr.rate).toLocaleString()} ({item.share}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.share}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {activeAdminTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-mono">Gaming Products Catalog ({products.length})</h3>
            <span className="text-xs font-mono text-slate-400">Click Edit to adjust denominations and pricing</span>
          </div>

          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img src={p.image} alt={p.title} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{p.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        {p.platform}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {p.denominations.length} Denominations • {p.deliveryType === 'direct_uid_topup' ? '⚡ Direct UID' : '🔑 Voucher PIN'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right text-xs font-mono">
                    <div className="text-slate-400">Starting Price</div>
                    <div className="font-bold text-emerald-400">
                      {currentCurr.symbol}{(p.denominations[0].price * currentCurr.rate).toFixed(2)}
                    </div>
                  </div>

                  <button
                    onClick={() => setEditingProduct(p)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Product Edit Modal */}
          {editingProduct && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
              <form onSubmit={handleSaveProductEdit} className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white font-mono">Edit Product: {editingProduct.title}</h3>
                  <button type="button" onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Product Title</label>
                  <input
                    type="text"
                    value={editingProduct.title}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Estimated Delivery Time</label>
                  <input
                    type="text"
                    value={editingProduct.estimatedDeliveryTime}
                    onChange={(e) => setEditingProduct({ ...editingProduct, estimatedDeliveryTime: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Adjust First Tier Price (USD $)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.denominations[0]?.price}
                    onChange={(e) => {
                      const updated = [...editingProduct.denominations];
                      updated[0] = { ...updated[0], price: parseFloat(e.target.value) || 0 };
                      setEditingProduct({ ...editingProduct, denominations: updated });
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-emerald-400 font-mono"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs font-mono"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      )}

      {/* TAB 3: LIVE ORDERS MANAGER */}
      {activeAdminTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-mono">Live Customer Transactions ({orders.length})</h3>
            <span className="text-xs font-mono text-slate-400">Direct order status modifier & key inspector</span>
          </div>

          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400">{order.orderNumber}</span>
                      <span className="text-xs text-slate-300 font-medium">({order.customerEmail})</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">{order.createdAt} • Via {order.paymentMethod.toUpperCase()}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      order.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {order.status}
                    </span>

                    {order.status === 'Completed' ? (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'Refunded')}
                        className="px-2.5 py-1 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-[11px] font-mono hover:bg-red-900/40"
                      >
                        Process Refund
                      </button>
                    ) : (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'Completed')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono hover:bg-emerald-900/40"
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>

                {/* Items & Keys */}
                <div className="space-y-1 text-xs">
                  {order.voucherCodes.map((vc, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-950 p-2 rounded-lg font-mono">
                      <span className="text-slate-300 truncate max-w-sm">{vc.productTitle}</span>
                      <span className="text-cyan-400">{vc.code}</span>
                    </div>
                  ))}
                </div>

                <div className="text-right text-xs font-mono text-slate-400">
                  Total: <span className="text-emerald-400 font-bold">{currentCurr.symbol}{(order.total * currentCurr.rate).toFixed(2)} {currentCurr.code}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COUPONS & PROMOS */}
      {activeAdminTab === 'coupons' && (
        <div className="space-y-6">
          
          {/* Create Coupon Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono">Create New Promo Campaign</h3>

            <form onSubmit={handleCreateCouponSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Code (e.g. VIP20)"
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 uppercase outline-none"
                required
              />

              <input
                type="number"
                placeholder="Discount %"
                value={newCouponDiscount}
                onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 outline-none"
                required
              />

              <input
                type="number"
                placeholder="Min Order ($)"
                value={newCouponMin}
                onChange={(e) => setNewCouponMin(Number(e.target.value))}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 outline-none"
                required
              />

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Activate Promo
              </button>
            </form>
          </div>

          {/* Active Coupons List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div
                key={c.code}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-400 text-sm">{c.code}</span>
                  <button
                    onClick={() => onToggleCoupon(c.code)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      c.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {c.active ? 'ACTIVE' : 'DISABLED'}
                  </button>
                </div>
                <div className="text-xs text-slate-300 font-mono">
                  {c.discountPercent}% Discount • Min ${c.minSpend || 0}
                </div>
                <div className="text-[10px] text-slate-500 font-mono flex justify-between pt-1 border-t border-slate-800">
                  <span>Used: {c.timesUsed.toLocaleString()} times</span>
                  <span>Expires: {c.validUntil}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 5: HELPDESK QUEUE */}
      {activeAdminTab === 'tickets' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-mono">Customer Helpdesk Queue ({tickets.length})</h3>
            <span className="text-xs font-mono text-slate-400">Resolve inquiries and support tickets</span>
          </div>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400">{t.ticketNumber}</span>
                      <span className="text-xs font-bold text-white">{t.subject}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">{t.category} • Updated {t.updatedAt}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      t.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {t.status}
                    </span>

                    {t.status !== 'Resolved' && (
                      <button
                        onClick={() => onResolveTicket(t.id)}
                        className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30 transition-colors"
                      >
                        ✓ Mark Resolved
                      </button>
                    )}
                  </div>
                </div>

                {/* Latest message */}
                <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] font-mono text-cyan-400 mb-1">
                    Latest message from: {t.messages[t.messages.length - 1]?.senderName}
                  </div>
                  <p className="text-slate-300">{t.messages[t.messages.length - 1]?.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
};
