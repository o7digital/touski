"use client";

import React from "react";

/**
 * Simple responsive grid for CJ items.
 * Expects items with: { sku, name, price, cost_price, images[], description }
 */
export default function CjGrid({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 16,
      }}
    >
      {items.map((it, i) => {
        const title = it?.name || "Sans nom";
        const img = Array.isArray(it?.images) ? it.images[0] : null;
        const sku = it?.sku || `cj-${i}`;
        const price = it?.price;
        return (
          <div
            key={`${sku}-${i}`}
            style={{
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              background: "#fff",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "75%",
                background: "#fafafa",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {img ? (
                <img
                  src={img}
                  alt={title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : null}
            </div>
            <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{title}</div>
            <div className="text-secondary" style={{ fontSize: 12 }}>
              SKU: {sku} {price != null ? `· ${price}` : ""}
            </div>
            <form
              action={`/api/cj/import-one?sku=${encodeURIComponent(sku)}`}
              method="post"
              style={{ marginTop: "auto" }}
            >
              <button type="submit" className="btn btn-sm btn-outline-dark w-100">
                Importer dans Directus
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
}

