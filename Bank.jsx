import React, { useState, useMemo } from "react";
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  Utensils,
  Fuel,
  Wallet,
  Home,
  BarChart3,
  User,
  Plus,
  ChevronRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------
const palette = {
  bg: "#0B0E14",
  surface: "#12161F",
  surfaceRaised: "#1A2030",
  border: "#242A3A",
  gold: "#C9A961",
  goldDim: "#8A7647",
  textPrimary: "#F2F0EA",
  textMuted: "#8A90A3",
  positive: "#6FBE8F",
  negative: "#D98080",
};

const transactions = [
  { id: 1, label: "McDonald's", place: "Paris 11e", amount: -15.4, icon: Utensils, tint: "#D98080" },
  { id: 2, label: "Total Énergies", place: "Station-service", amount: -70.0, icon: Fuel, tint: "#D98080" },
  { id: 3, label: "Salaire", place: "Virement · Acme SARL", amount: 2500, icon: Wallet, tint: "#6FBE8F" },
  { id: 4, label: "Loyer", place: "Prélèvement", amount: -890, icon: Home, tint: "#D98080" },
  { id: 5, label: "Épicerie Bio", place: "Carrefour Market", amount: -42.3, icon: Utensils, tint: "#D98080" },
];

const weekSpend = [420, 610, 380, 705, 512, 260, 190]; // Mon..Sun, in euros

function currency(n) {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------
function ActionButton({ icon: Icon, label }) {
  return (
    <button
      className="flex flex-1 flex-col items-center gap-2 rounded-2xl py-4 active:scale-95 transition-transform"
      style={{ background: palette.surfaceRaised, border: `1px solid ${palette.border}` }}
    >
      <Icon size={18} color={palette.gold} strokeWidth={1.75} />
      <span style={{ color: palette.textPrimary, fontSize: 12.5, fontWeight: 500 }}>{label}</span>
    </button>
  );
}

function SpendingBars({ data }) {
  const max = Math.max(...data);
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  return (
    <div className="flex items-end justify-between gap-2" style={{ height: 72 }}>
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
          <div
            className="w-full rounded-t-md"
            style={{
              height: `${(v / max) * 100}%`,
              background: i === data.length - 1 ? palette.gold : palette.goldDim,
              opacity: i === data.length - 1 ? 1 : 0.55,
              minHeight: 4,
            }}
          />
          <span style={{ color: palette.textMuted, fontSize: 10.5 }}>{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

function TransactionRow({ tx }) {
  const Icon = tx.icon;
  const isPositive = tx.amount > 0;
  return (
    <div className="flex items-center gap-3 py-3">
      <div
        className="flex items-center justify-center rounded-full"
        style={{ width: 38, height: 38, background: `${tx.tint}1F` }}
      >
        <Icon size={16} color={tx.tint} strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ color: palette.textPrimary, fontSize: 14, fontWeight: 500, margin: 0 }}>{tx.label}</p>
        <p style={{ color: palette.textMuted, fontSize: 12, margin: 0 }}>{tx.place}</p>
      </div>
      <span
        style={{
          color: isPositive ? palette.positive : palette.textPrimary,
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "'Fraunces', serif",
        }}
      >
        {isPositive ? "+" : ""}
        {currency(tx.amount)}
      </span>
    </div>
  );
}

function TabBarItem({ icon: Icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 flex-1 py-2">
      <Icon size={20} color={active ? palette.gold : palette.textMuted} strokeWidth={active ? 2 : 1.6} />
      <span style={{ color: active ? palette.gold : palette.textMuted, fontSize: 10.5, fontWeight: 500 }}>
        {label}
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main app
// ---------------------------------------------------------------------------
export default function BankingApp() {
  const [balanceHidden, setBalanceHidden] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const monthSpentPct = 68;

  const displayBalance = useMemo(
    () => (balanceHidden ? "••••••" : currency(15247.89)),
    [balanceHidden]
  );

  return (
    <div className="w-full flex justify-center py-6" style={{ background: "#05060A" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap"
      />
      {/* Phone frame */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 360,
          height: 760,
          borderRadius: 44,
          background: palette.bg,
          border: "8px solid #14161C",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Notch */}
        <div
          className="absolute left-1/2 top-2 z-20"
          style={{
            transform: "translateX(-50%)",
            width: 120,
            height: 22,
            borderRadius: 14,
            background: "#000",
          }}
        />

        {/* Scrollable content */}
        <div className="h-full overflow-y-auto pb-24" style={{ paddingTop: 40 }}>
          {/* Header */}
          <div className="px-6 pt-2 flex items-center justify-between">
            <div>
              <p style={{ color: palette.textMuted, fontSize: 13, margin: 0 }}>Bonjour</p>
              <p style={{ color: palette.textPrimary, fontSize: 19, fontWeight: 600, margin: 0 }}>
                Thomas
              </p>
            </div>
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 40,
                height: 40,
                background: palette.surfaceRaised,
                border: `1px solid ${palette.border}`,
              }}
            >
              <span style={{ color: palette.gold, fontWeight: 600, fontSize: 14 }}>TH</span>
            </div>
          </div>

          {/* Balance card */}
          <div className="px-6 mt-6">
            <div
              className="rounded-3xl p-5"
              style={{
                background: `linear-gradient(135deg, ${palette.surfaceRaised} 0%, ${palette.surface} 100%)`,
                border: `1px solid ${palette.border}`,
              }}
            >
              <div className="flex items-center justify-between">
                <span style={{ color: palette.textMuted, fontSize: 12.5, letterSpacing: 0.2 }}>
                  Solde total
                </span>
                <button onClick={() => setBalanceHidden((v) => !v)} aria-label="Afficher / masquer le solde">
                  {balanceHidden ? (
                    <EyeOff size={16} color={palette.textMuted} />
                  ) : (
                    <Eye size={16} color={palette.textMuted} />
                  )}
                </button>
              </div>
              <p
                style={{
                  color: palette.textPrimary,
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 500,
                  fontSize: 34,
                  margin: "8px 0 2px",
                  letterSpacing: -0.5,
                }}
              >
                {displayBalance}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <ArrowUpRight size={13} color={palette.positive} />
                <span style={{ color: palette.positive, fontSize: 12.5, fontWeight: 500 }}>
                  +4,2 % ce mois-ci
                </span>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="px-6 mt-4 flex gap-3">
            <ActionButton icon={CreditCard} label="Carte" />
            <ActionButton icon={ArrowUpRight} label="Virement" />
            <ActionButton icon={Plus} label="Ajouter" />
          </div>

          {/* Spending this month */}
          <div className="px-6 mt-6">
            <div className="flex items-center justify-between mb-3">
              <span style={{ color: palette.textPrimary, fontSize: 15, fontWeight: 600 }}>
                Dépenses du mois
              </span>
              <span style={{ color: palette.textMuted, fontSize: 12.5 }}>2 040 € / 3 000 €</span>
            </div>
            <div
              className="rounded-2xl p-4"
              style={{ background: palette.surface, border: `1px solid ${palette.border}` }}
            >
              <div
                className="w-full rounded-full overflow-hidden mb-4"
                style={{ height: 6, background: palette.border }}
              >
                <div
                  style={{
                    width: `${monthSpentPct}%`,
                    height: "100%",
                    background: palette.gold,
                    borderRadius: 999,
                  }}
                />
              </div>
              <SpendingBars data={weekSpend} />
            </div>
          </div>

          {/* Transactions */}
          <div className="px-6 mt-6">
            <div className="flex items-center justify-between mb-1">
              <span style={{ color: palette.textPrimary, fontSize: 15, fontWeight: 600 }}>
                Transactions
              </span>
              <button className="flex items-center gap-0.5">
                <span style={{ color: palette.gold, fontSize: 12.5, fontWeight: 500 }}>Tout voir</span>
                <ChevronRight size={13} color={palette.gold} />
              </button>
            </div>
            <div
              className="rounded-2xl px-4 mt-2 divide-y"
              style={{ background: palette.surface, border: `1px solid ${palette.border}` }}
            >
              {transactions.map((tx, i) => (
                <div key={tx.id} style={{ borderColor: palette.border }}>
                  <TransactionRow tx={tx} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div
          className="absolute bottom-0 left-0 right-0 flex px-4"
          style={{
            background: "rgba(18,22,31,0.92)",
            borderTop: `1px solid ${palette.border}`,
            backdropFilter: "blur(12px)",
          }}
        >
          <TabBarItem icon={Home} label="Accueil" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
          <TabBarItem
            icon={BarChart3}
            label="Stats"
            active={activeTab === "stats"}
            onClick={() => setActiveTab("stats")}
          />
          <TabBarItem
            icon={User}
            label="Profil"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
        </div>
      </div>
    </div>
  );
}
