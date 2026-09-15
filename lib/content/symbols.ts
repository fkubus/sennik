import "server-only";
import { createPublicClient } from "@/lib/supabase/public";
import type { SymbolFaqItem, SymbolVariant } from "@/lib/supabase/types";

export interface SymbolSummary {
  slug: string;
  name: string;
  excerpt: string | null;
  categorySlug: string | null;
  categoryName: string | null;
}

export interface SymbolDetail extends SymbolSummary {
  contentMd: string;
  variants: SymbolVariant[];
  faq: SymbolFaqItem[];
  relatedSlugs: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  publishedAt: string | null;
  updatedAt: string;
}

export interface SymbolCategory {
  id: string;
  slug: string;
  name: string;
  description: string | null;
}

async function getCategoriesById(): Promise<Map<string, SymbolCategory>> {
  const categories = await getCategories();
  return new Map(categories.map((category) => [category.id, category]));
}

function toSummary(
  row: {
    slug: string;
    name: string;
    excerpt: string | null;
    category_id: string | null;
  },
  categoriesById: Map<string, SymbolCategory>,
): SymbolSummary {
  const category = row.category_id
    ? categoriesById.get(row.category_id)
    : undefined;

  return {
    slug: row.slug,
    name: row.name,
    excerpt: row.excerpt,
    categorySlug: category?.slug ?? null,
    categoryName: category?.name ?? null,
  };
}

export async function getPublishedSymbols(): Promise<SymbolSummary[]> {
  const supabase = createPublicClient();
  const [{ data, error }, categoriesById] = await Promise.all([
    supabase
      .from("symbols")
      .select("slug, name, excerpt, category_id")
      .eq("status", "published")
      .order("name"),
    getCategoriesById(),
  ]);

  if (error) throw error;

  return (data ?? []).map((row) => toSummary(row, categoriesById));
}

export async function getSymbolBySlug(
  slug: string,
): Promise<SymbolDetail | null> {
  const supabase = createPublicClient();
  const [{ data, error }, categoriesById] = await Promise.all([
    supabase
      .from("symbols")
      .select(
        "slug, name, excerpt, content_md, variants, faq, related_slugs, meta_title, meta_description, published_at, updated_at, category_id",
      )
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle(),
    getCategoriesById(),
  ]);

  if (error) throw error;
  if (!data) return null;

  return {
    ...toSummary(data, categoriesById),
    contentMd: data.content_md,
    variants: data.variants,
    faq: data.faq,
    relatedSlugs: data.related_slugs,
    metaTitle: data.meta_title,
    metaDescription: data.meta_description,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
  };
}

export async function getRelatedSymbols(
  slugs: string[],
): Promise<SymbolSummary[]> {
  if (slugs.length === 0) return [];

  const supabase = createPublicClient();
  const [{ data, error }, categoriesById] = await Promise.all([
    supabase
      .from("symbols")
      .select("slug, name, excerpt, category_id")
      .in("slug", slugs)
      .eq("status", "published"),
    getCategoriesById(),
  ]);

  if (error) throw error;

  return (data ?? []).map((row) => toSummary(row, categoriesById));
}

export async function getSymbolsByCategory(
  categorySlug: string,
): Promise<{ category: SymbolCategory | null; symbols: SymbolSummary[] }> {
  const supabase = createPublicClient();
  const categoriesById = await getCategoriesById();
  const category = [...categoriesById.values()].find(
    (c) => c.slug === categorySlug,
  );

  if (!category) return { category: null, symbols: [] };

  const { data, error } = await supabase
    .from("symbols")
    .select("slug, name, excerpt, category_id")
    .eq("status", "published")
    .eq("category_id", category.id)
    .order("name");

  if (error) throw error;

  return {
    category,
    symbols: (data ?? []).map((row) => toSummary(row, categoriesById)),
  };
}

export async function getCategories(): Promise<SymbolCategory[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("symbol_categories")
    .select("id, slug, name, description")
    .order("sort_order");

  if (error) throw error;
  return data ?? [];
}
