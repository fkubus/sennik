import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getSymbolsByCategory } from "@/lib/content/symbols";
import { siteConfig } from "@/lib/config/site";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category: category.slug }));
}

export const revalidate = 86400;

export async function generateMetadata(
  props: PageProps<"/kategoria/[category]">,
) {
  const { category: slug } = await props.params;
  const { category } = await getSymbolsByCategory(slug);
  if (!category) return {};

  const title = `${category.name} — sennik według kategorii`;
  const description =
    category.description ??
    `Symbole senne z kategorii „${category.name}” — sprawdź ich znaczenie.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/kategoria/${category.slug}` },
  };
}

export default async function CategoryPage(
  props: PageProps<"/kategoria/[category]">,
) {
  const { category: slug } = await props.params;
  const { category, symbols } = await getSymbolsByCategory(slug);
  if (!category) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <header className="mb-10 text-center">
        <span className="text-primary text-sm font-medium tracking-widest uppercase">
          Kategoria
        </span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-balance">
            {category.description}
          </p>
        )}
      </header>

      {symbols.length === 0 ? (
        <p className="text-muted-foreground text-center">
          W tej kategorii nie ma jeszcze opublikowanych symboli.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {symbols.map((symbol) => (
            <li key={symbol.slug}>
              <Link
                href={`/sennik/${symbol.slug}`}
                className="bg-card hover:border-primary/50 block rounded-lg border p-4 text-center text-sm font-medium transition-colors"
              >
                {symbol.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
