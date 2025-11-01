import { z } from "zod";

export const ProductSchema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional().default(""),
  price: z.number().nonnegative().optional(),
  compare_price: z.number().nonnegative().optional(),
  cost_price: z.number().nonnegative().optional(),
  weight: z.number().nonnegative().optional(),
  images: z.array(z.string()).default([]),
  raw: z.any().optional(),
});

export const ProductsArraySchema = z.array(ProductSchema);

export function validateProducts(items) {
  const parsed = ProductsArraySchema.safeParse(items);
  if (parsed.success) return { valid: parsed.data, invalid: 0, issues: [] };
  // Filter invalid items to avoid empty UI
  const valid = [];
  for (const it of items || []) {
    const p = ProductSchema.safeParse(it);
    if (p.success) valid.push(p.data);
  }
  const invalid = (items?.length || 0) - valid.length;
  return { valid, invalid, issues: parsed.error.issues };
}

export const QuerySchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(60).default(24),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  sort: z.string().optional(),
  language: z.string().optional(),
  preset: z
    .enum(["home", "kitchen", "bath", "lighting", "furniture", "storage", "garden"]) 
    .optional(),
  category: z.string().optional(),
  categoryId: z.string().optional(),
  strict: z.enum(["0", "1"]).optional(),
  aggregated: z.enum(["0", "1"]).optional(),
  nofilter: z.enum(["0", "1"]).optional(),
});
