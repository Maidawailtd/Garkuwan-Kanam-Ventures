import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { ShieldCheck, LogOut, Package, TrendingUp, Clock, CheckCircle, XCircle, Printer } from "lucide-react";

const ADMIN_PIN = "GKC@2025";
const AUTH_KEY = "gkc_admin_auth";
const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

type Order = {
  id: number;
  productName: string;
  quantity: number;
  totalAmountNgn: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress?: string;
  status: string;
  paymentStatus: string;
  txRef?: string;
  flwRef?: string;
  createdAt: string;
};

function formatNgn(n: number) {
  return "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });
}

function StatusBadge({ value, type }: { value: string; type: "payment" | "order" }) {
  const map: Record<string, string> = {
    paid: "bg-green-500/15 text-green-400 border-green-500/20",
    confirmed: "bg-green-500/15 text-green-400 border-green-500/20",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    failed: "bg-red-500/15 text-red-400 border-red-500/20",
    shipped: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    delivered: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    cancelled: "bg-red-500/15 text-red-400 border-red-500/20",
  };
  const cls = map[value] || "bg-gray-500/15 text-gray-400 border-gray-500/20";
  return (
    <span className={`inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest border rounded-sm ${cls}`}>
      {value}
    </span>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === "1");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Order | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      localStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setOrders([]);
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetch(`${BASE}/api/admin/orders`, { headers: { "X-Admin-Key": ADMIN_PIN } })
      .then((r) => r.json())
      .then((data) => { setOrders(data); setLoading(false); })
      .catch(() => { setError("Failed to load orders."); setLoading(false); });
  }, [authed]);

  if (!authed) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center bg-secondary">
          <div className="w-full max-w-sm">
            <div className="bg-card border border-border p-10">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="text-primary" size={28} />
                <div>
                  <h1 className="text-xl font-display uppercase tracking-tighter">Admin Access</h1>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Garkuwan Kanam & Co</p>
                </div>
              </div>
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Admin PIN</label>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => { setPin(e.target.value); setPinError(false); }}
                    placeholder="Enter PIN"
                    autoFocus
                    className={`w-full bg-background border px-4 py-3.5 outline-none text-sm font-mono transition-colors ${pinError ? "border-destructive" : "border-border focus:border-primary"}`}
                  />
                  {pinError && <p className="text-xs text-destructive mt-2 uppercase tracking-widest font-bold">Incorrect PIN</p>}
                </div>
                <button type="submit" className="w-full bg-primary text-primary-foreground py-4 font-bold uppercase tracking-widest text-sm hover:bg-foreground hover:text-background transition-colors">
                  Enter Dashboard
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const paid = orders.filter((o) => o.paymentStatus === "paid").length;
  const pending = orders.filter((o) => o.paymentStatus === "pending").length;
  const totalRevenue = orders.filter((o) => o.paymentStatus === "paid").reduce((s, o) => s + o.totalAmountNgn, 0);

  return (
    <Layout>
      <div className="bg-secondary border-b border-border py-6">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between">
          <div>
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] block mb-1">Admin Dashboard</span>
            <h1 className="text-2xl font-display uppercase tracking-tighter text-white">Order Management</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors border border-border px-4 py-2 hover:border-white/30">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-10">
        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: <Package size={20} />, label: "Total Orders", value: orders.length, sub: "All time" },
            { icon: <CheckCircle size={20} className="text-green-400" />, label: "Paid", value: paid, sub: "Confirmed" },
            { icon: <Clock size={20} className="text-amber-400" />, label: "Pending", value: pending, sub: "Awaiting payment" },
            { icon: <TrendingUp size={20} className="text-primary" />, label: "Revenue", value: formatNgn(totalRevenue), sub: "Paid orders" },
          ].map((c) => (
            <div key={c.label} className="bg-card border border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-background border border-border flex items-center justify-center text-primary">{c.icon}</div>
              </div>
              <div className="text-2xl font-display leading-none mb-1">{c.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{c.label}</div>
              <div className="text-[10px] text-muted-foreground/60 mt-0.5">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Orders table */}
        <div className="bg-card border border-border">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest">All Orders</h2>
            <button onClick={() => window.print()} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              <Printer size={12} /> Print
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center text-muted-foreground text-sm uppercase tracking-widest animate-pulse">Loading orders...</div>
          ) : error ? (
            <div className="py-20 text-center text-destructive text-sm">{error}</div>
          ) : orders.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground text-sm uppercase tracking-widest">No orders yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background">
                    {["Order #", "Date", "Customer", "Product", "Qty", "Total (NGN)", "Payment", "Status"].map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {orders.map((o) => (
                    <tr
                      key={o.id}
                      className="hover:bg-background transition-colors cursor-pointer"
                      onClick={() => setSelected(o)}
                    >
                      <td className="px-5 py-4 font-mono text-primary font-bold text-xs">GKC-{String(o.id).padStart(6, "0")}</td>
                      <td className="px-5 py-4 text-muted-foreground whitespace-nowrap text-xs">{new Date(o.createdAt).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" })}</td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-xs leading-tight">{o.customerName}</div>
                        <div className="text-muted-foreground text-[11px]">{o.customerEmail}</div>
                      </td>
                      <td className="px-5 py-4 max-w-[160px]">
                        <div className="font-medium text-xs leading-tight truncate">{o.productName}</div>
                      </td>
                      <td className="px-5 py-4 text-center text-xs">{o.quantity}</td>
                      <td className="px-5 py-4 font-bold text-xs whitespace-nowrap">{formatNgn(o.totalAmountNgn)}</td>
                      <td className="px-5 py-4"><StatusBadge value={o.paymentStatus} type="payment" /></td>
                      <td className="px-5 py-4"><StatusBadge value={o.status} type="order" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-card border border-border w-full max-w-lg p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display uppercase tracking-tighter text-xl">GKC-{String(selected.id).padStart(6, "0")}</h3>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                <XCircle size={20} />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ["Date", new Date(selected.createdAt).toLocaleString("en-NG")],
                ["Customer", selected.customerName],
                ["Email", selected.customerEmail],
                ["Phone", selected.customerPhone],
                ["Product", selected.productName],
                ["Quantity", selected.quantity],
                ["Total", formatNgn(selected.totalAmountNgn)],
                ["Payment", selected.paymentStatus],
                ["Order Status", selected.status],
                ["TX Ref", selected.txRef || "—"],
                ["FLW Ref", selected.flwRef || "—"],
                ["Delivery Address", selected.shippingAddress || "—"],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex gap-4 py-2 border-b border-border/40">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground w-28 shrink-0 pt-0.5">{k}</span>
                  <span className="text-foreground text-xs leading-relaxed">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
