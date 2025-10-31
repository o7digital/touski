"use client";

import { useState } from "react";

export default function DemoOrderPage() {
  const [sku, setSku] = useState("");
  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState("client@example.com");
  const [name, setName] = useState("Client Demo");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg("");
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name, email },
          items: [{ sku, qty: Number(qty), price: null }],
          note: "Commande de démo (CJ)",
        }),
      });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || "Echec commande");
      setMsg(`Commande créée: ${JSON.stringify(j.data)}`);
    } catch (e) {
      setMsg(`Erreur: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Commande démo → Admin Directus</h1>
      <form onSubmit={placeOrder} style={{ maxWidth: 520 }}>
        <div style={{ marginBottom: 8 }}>
          <label>SKU</label>
          <input value={sku} onChange={(e) => setSku(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Quantité</label>
          <input type="number" min={1} value={qty} onChange={(e) => setQty(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Nom</label>
          <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </div>
        <button disabled={loading} type="submit">{loading ? 'Envoi…' : 'Créer la commande'}</button>
      </form>
      {msg && <pre style={{ background: '#f8f8f8', padding: 12, marginTop: 12 }}>{msg}</pre>}
    </main>
  );
}

