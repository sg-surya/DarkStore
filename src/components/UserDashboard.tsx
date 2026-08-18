import React, { useState } from 'react';
import { 
  User, 
  ShoppingBag, 
  Key, 
  LifeBuoy, 
  Settings, 
  ShieldCheck, 
  Copy, 
  Check, 
  Receipt, 
  Eye, 
  EyeOff, 
  Send, 
  Plus
} from 'lucide-react';
import { Order, SupportTicket } from '../types';
import { CURRENCIES, SAMPLE_SAVED_PLAYER_IDS } from '../data/products';

interface UserDashboardProps {
  orders: Order[];
  tickets: SupportTicket[];
  selectedCurrency: string;
  onViewReceipt: (order: Order) => void;
  onCreateTicket: (ticket: Partial<SupportTicket>) => void;
  onReplyTicket: (ticketId: string, message: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  orders,
  tickets,
  selectedCurrency,
  onViewReceipt,
  onCreateTicket,
  onReplyTicket
}) => {
  const currentCurr = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];

  const [activeTab, setActiveTab] = useState<'orders' | 'vouchers' | 'player_ids' | 'tickets' | 'settings'>('orders');
  const [revealedPins, setRevealedPins] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // New ticket state
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<'Order Delivery' | 'Redemption Issue' | 'Payment & Billing' | 'Free Fire Top-Up' | 'Other'>('Free Fire Top-Up');
  const [ticketMessage, setTicketMessage] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(tickets[0]?.id || null);
  const [replyText, setReplyText] = useState('');

  // Saved IDs state
  const [savedIds, setSavedIds] = useState(SAMPLE_SAVED_PLAYER_IDS);
  const [newGame, setNewGame] = useState('Free Fire');
  const [newUid, setNewUid] = useState('');
  const [newIgn, setNewIgn] = useState('');
  const [newRegion, setNewRegion] = useState('Global');

  // Account stats
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedKey(code);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const togglePin = (key: string) => {
    setRevealedPins(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAddPlayerId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUid.trim() || !newIgn.trim()) return;
    setSavedIds(prev => [...prev, { game: newGame, uid: newUid, ign: newIgn, region: newRegion }]);
    setNewUid('');
    setNewIgn('');
  };

  const handleRemovePlayerId = (uid: string) => {
    setSavedIds(prev => prev.filter(p => p.uid !== uid));
  };

  const handleCreateNewTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    onCreateTicket({
      subject: ticketSubject,
      category: ticketCategory,
      priority: 'Medium',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'user',
          senderName: 'Alex Mercer',
          text: ticketMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    });

    setTicketSubject('');
    setTicketMessage('');
    setIsCreatingTicket(false);
  };

  const handleSendReply = (ticketId: string) => {
    if (!replyText.trim()) return;
    onReplyTicket(ticketId, replyText);
    setReplyText('');
  };

  const activeTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];
  const allVouchers = orders.flatMap(o => o.voucherCodes.map((v, i) => ({ ...v, orderNumber: o.orderNumber, date: o.createdAt, uniqueId: `${o.id}-${i}` })));

  return (
    <section id="user-dashboard-section" className="py-8 max-w-6xl mx-auto px-4 sm:px-6 font-mono">
      
      {/* User Header Profile */}
      <div className="bg-[#111317] border border-[#1e222b] rounded-xl p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-[#181b22] border border-[#222632] flex items-center justify-center text-neutral-300">
              <User className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white">Alex Mercer</h1>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#181b22] text-neutral-400 border border-[#222632]">
                  MEMBER
                </span>
              </div>
              <div className="text-xs text-neutral-500">gamer@darkstore.io</div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-[#0c0e14] border border-[#1e222b] min-w-[100px] text-center">
              <div className="text-[10px] text-neutral-500 uppercase">Orders</div>
              <div className="text-sm font-bold text-white">{orders.length}</div>
            </div>
            <div className="p-2.5 rounded bg-[#0c0e14] border border-[#1e222b] min-w-[110px] text-center">
              <div className="text-[10px] text-neutral-500 uppercase">Total Spent</div>
              <div className="text-sm font-bold text-emerald-400">
                {currentCurr.symbol}{(totalSpent * currentCurr.rate).toFixed(2)}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#1e222b] overflow-x-auto pb-2 mb-6 scrollbar-none">
        {[
          { id: 'orders', label: 'Orders', icon: ShoppingBag, count: orders.length },
          { id: 'vouchers', label: 'Keys Vault', icon: Key, count: allVouchers.length },
          { id: 'player_ids', label: 'Saved UIDs', icon: User, count: savedIds.length },
          { id: 'tickets', label: 'Support', icon: LifeBuoy, count: tickets.length },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#181b22] text-white border border-[#2e3442]'
                  : 'text-neutral-400 hover:text-white border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 rounded ${
                  isActive ? 'bg-white text-neutral-950 font-bold' : 'bg-[#181b22] text-neutral-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: ORDER HISTORY */}
      {activeTab === 'orders' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase text-neutral-400">Completed Orders</h2>
            <span className="text-[10px] text-neutral-600">Fulfillment log</span>
          </div>

          <div className="space-y-2">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#111317] border border-[#1e222b] rounded-lg p-4 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1e222b] pb-2.5">
                  <div>
                    <span className="text-xs font-bold text-white">{order.orderNumber}</span>
                    <div className="text-[10px] text-neutral-500">{order.createdAt}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#0c0e14] text-emerald-400 border border-[#1e222b]">
                      ✓ {order.status}
                    </span>
                    <button
                      onClick={() => onViewReceipt(order)}
                      className="px-2.5 py-1 rounded bg-[#181b22] hover:bg-[#222632] text-neutral-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Receipt className="w-3 h-3" />
                      Invoice
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-neutral-300">{item.productTitle}</span>
                        <span className="text-[10px] text-neutral-500 ml-2">{item.denominationName} × {item.quantity}</span>
                        {item.directUid && <span className="text-amber-400 text-[10px] ml-2">UID: {item.directUid}</span>}
                      </div>
                      <span className="text-white font-semibold">
                        {currentCurr.symbol}{((item.price * item.quantity) * currentCurr.rate).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#1e222b] flex items-center justify-between text-xs">
                  <span className="text-neutral-500">Channel: {order.paymentMethod.toUpperCase()}</span>
                  <div>
                    <span className="text-neutral-500 mr-2">Paid:</span>
                    <span className="font-bold text-white">
                      {currentCurr.symbol}{(order.total * currentCurr.rate).toFixed(2)} {currentCurr.code}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MY VOUCHERS & KEYS */}
      {activeTab === 'vouchers' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase text-neutral-400">Keys & Vouchers</h2>
            <span className="text-[10px] text-neutral-500">{allVouchers.length} Total</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {allVouchers.map((v) => {
              const isRevealed = revealedPins[v.uniqueId];
              const isDirect = v.deliveryType === 'direct_uid_topup';

              return (
                <div
                  key={v.uniqueId}
                  className="bg-[#111317] border border-[#1e222b] rounded-lg p-3.5 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#181b22] text-neutral-300 border border-[#262c38]">
                      {v.platform}
                    </span>
                    <span className="text-[10px] text-neutral-600">{v.orderNumber}</span>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-white">{v.productTitle}</div>
                    <div className="text-[10px] text-neutral-500">{v.denominationName}</div>
                  </div>

                  <div className="p-2 rounded bg-[#0c0e14] border border-[#1e222b] flex items-center justify-between text-xs">
                    <div className="truncate pr-2">
                      <div className="text-white font-mono truncate">
                        {isDirect ? v.code : isRevealed ? v.code : '••••-••••-••••-••••'}
                      </div>
                    </div>

                    {!isDirect && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => togglePin(v.uniqueId)}
                          className="p-1 rounded bg-[#181b22] hover:bg-[#222632] text-neutral-300"
                        >
                          {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </button>
                        <button
                          onClick={() => handleCopyCode(v.code)}
                          className="px-2 py-1 rounded bg-neutral-200 hover:bg-white text-neutral-950 font-bold text-[10px] flex items-center gap-1"
                        >
                          {copiedKey === v.code ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          Copy
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SAVED PLAYER UIDS */}
      {activeTab === 'player_ids' && (
        <div className="space-y-4">
          <div className="bg-[#111317] border border-[#1e222b] rounded-lg p-4 space-y-3">
            <h2 className="text-xs font-bold text-white uppercase">
              Saved Player UIDs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {savedIds.map((item) => (
                <div
                  key={item.uid}
                  className="p-2.5 rounded bg-[#0c0e14] border border-[#1e222b] flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">{item.ign}</span>
                      <span className="text-[9px] px-1 rounded bg-[#181b22] text-neutral-400">
                        {item.game}
                      </span>
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      UID: <span className="text-neutral-300">{item.uid}</span> ({item.region})
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemovePlayerId(item.uid)}
                    className="text-xs text-neutral-500 hover:text-white p-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddPlayerId} className="pt-3 border-t border-[#1e222b] space-y-2">
              <span className="text-[10px] uppercase text-neutral-500 block">
                Add Player UID
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <select
                  value={newGame}
                  onChange={(e) => setNewGame(e.target.value)}
                  className="bg-[#0c0e14] border border-[#222632] rounded px-2.5 py-1.5 text-xs text-white outline-none"
                >
                  <option value="Free Fire">Free Fire</option>
                  <option value="Steam">Steam</option>
                  <option value="Valorant">Valorant</option>
                  <option value="PUBG Mobile">PUBG Mobile</option>
                </select>

                <input
                  type="text"
                  placeholder="UID"
                  value={newUid}
                  onChange={(e) => setNewUid(e.target.value)}
                  className="bg-[#0c0e14] border border-[#222632] rounded px-2.5 py-1.5 text-xs text-white outline-none"
                />

                <input
                  type="text"
                  placeholder="In-game Name"
                  value={newIgn}
                  onChange={(e) => setNewIgn(e.target.value)}
                  className="bg-[#0c0e14] border border-[#222632] rounded px-2.5 py-1.5 text-xs text-white outline-none"
                />

                <button
                  type="submit"
                  className="px-3 py-1.5 rounded bg-neutral-200 hover:bg-white text-neutral-950 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: SUPPORT TICKETS */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase text-neutral-400">Support Desk</h2>
            <button
              onClick={() => setIsCreatingTicket(!isCreatingTicket)}
              className="px-3 py-1.5 rounded bg-[#181b22] hover:bg-[#222632] text-neutral-200 text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              {isCreatingTicket ? 'Cancel' : 'New Ticket'}
            </button>
          </div>

          {isCreatingTicket && (
            <form onSubmit={handleCreateNewTicketSubmit} className="bg-[#111317] border border-[#222632] rounded-lg p-4 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase">New Inquiry</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-neutral-500 block mb-0.5">Subject</label>
                  <input
                    type="text"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="Subject..."
                    className="w-full bg-[#0c0e14] border border-[#222632] rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] text-neutral-500 block mb-0.5">Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value as any)}
                    className="w-full bg-[#0c0e14] border border-[#222632] rounded px-2.5 py-1.5 text-xs text-white outline-none"
                  >
                    <option value="Free Fire Top-Up">Free Fire Top-Up</option>
                    <option value="Order Delivery">Order Delivery</option>
                    <option value="Redemption Issue">Redemption Issue</option>
                    <option value="Payment & Billing">Payment & Billing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-neutral-500 block mb-0.5">Message</label>
                <textarea
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  rows={3}
                  placeholder="Describe your issue..."
                  className="w-full bg-[#0c0e14] border border-[#222632] rounded p-2.5 text-xs text-white outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-neutral-200 hover:bg-white text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Submit Ticket
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 space-y-1.5">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    activeTicket?.id === t.id
                      ? 'bg-[#181b22] border-[#3b4458] text-white'
                      : 'bg-[#111317] border-[#1e222b] text-neutral-400 hover:bg-[#14171d]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-white">{t.ticketNumber}</span>
                    <span className="text-[9px] text-neutral-500">{t.status}</span>
                  </div>
                  <div className="text-xs truncate">{t.subject}</div>
                </div>
              ))}
            </div>

            <div className="md:col-span-7 bg-[#111317] border border-[#1e222b] rounded-lg p-4 space-y-3 flex flex-col justify-between min-h-[280px]">
              {activeTicket ? (
                <>
                  <div className="border-b border-[#1e222b] pb-2">
                    <div className="flex items-center justify-between text-[10px] text-neutral-500">
                      <span>{activeTicket.ticketNumber}</span>
                      <span>{activeTicket.category}</span>
                    </div>
                    <h3 className="text-xs font-bold text-white mt-0.5">{activeTicket.subject}</h3>
                  </div>

                  <div className="space-y-2 overflow-y-auto max-h-52 pr-1">
                    {activeTicket.messages.map((m) => {
                      const isUser = m.sender === 'user';
                      return (
                        <div
                          key={m.id}
                          className={`p-2.5 rounded text-xs space-y-0.5 ${
                            isUser
                              ? 'bg-[#181b22] border border-[#262c38] ml-4 text-white'
                              : 'bg-[#0c0e14] border border-[#1e222b] mr-4 text-neutral-300'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[9px] text-neutral-500">
                            <span>{m.senderName}</span>
                            <span>{m.timestamp}</span>
                          </div>
                          <p>{m.text}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-[#1e222b] flex gap-1.5">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendReply(activeTicket.id)}
                      placeholder="Reply..."
                      className="flex-1 bg-[#0c0e14] border border-[#222632] rounded px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                    <button
                      onClick={() => handleSendReply(activeTicket.id)}
                      className="px-3 py-1.5 rounded bg-neutral-200 hover:bg-white text-neutral-950 font-bold text-xs flex items-center cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center text-neutral-600 my-auto text-xs">
                  No ticket selected.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SECURITY & SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-[#111317] border border-[#1e222b] rounded-lg p-5 space-y-4 max-w-xl">
          <h2 className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-neutral-300" />
            Security & Preferences
          </h2>

          <div className="space-y-3 text-xs text-neutral-300">
            <div className="flex items-center justify-between p-3 rounded bg-[#0c0e14] border border-[#1e222b]">
              <div>
                <div className="font-semibold text-white">Two-Factor Authentication</div>
                <div className="text-[10px] text-neutral-500">Require OTP for unmasking voucher keys.</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] bg-[#181b22] text-emerald-400 border border-[#222632]">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded bg-[#0c0e14] border border-[#1e222b]">
              <div>
                <div className="font-semibold text-white">Auto-Copy Keys</div>
                <div className="text-[10px] text-neutral-500">Auto copy to clipboard upon reveal.</div>
              </div>
              <input type="checkbox" defaultChecked className="w-3.5 h-3.5" />
            </div>

            <div className="flex items-center justify-between p-3 rounded bg-[#0c0e14] border border-[#1e222b]">
              <div>
                <div className="font-semibold text-white">Email Receipts</div>
                <div className="text-[10px] text-neutral-500">Receive digital invoices via email.</div>
              </div>
              <input type="checkbox" defaultChecked className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

