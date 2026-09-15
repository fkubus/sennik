import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  getPublishedSymbols,
  getRelatedSymbols,
  getSymbolBySlug,
} from "@/lib/content/symbols";
import { buildSymbolMetadata } from "@/lib/seo/metadata";
import { buildSymbolJsonLd } from "@/lib/seo/structured-data";

export async function generateStaticParams() {
  const symbols = await getPublishedSymbols();
  return symbols.map((symbol) => ({ symbol: symbol.slug }));
}

export const revalidate = 86400;

export async function generateMetadata(props: PageProps<"/sennik/[symbol]">) {
  const { symbol: slug } = await props.params;
  const symbol = await getSymbolBySlug(slug);
  if (!symbol) return {};
  return buildSymbolMetadata(symbol);
}

export default async function SymbolPage(props: PageProps<"/sennik/[symbol]">) {
  const { symbol: slug } = await props.params;
  const symbol = await getSymbolBySlug(slug);
  if (!symbol) notFound();

  const related = await getRelatedSymbols(symbol.relatedSlugs);
  const jsonLd = buildSymbolJsonLd(symbol);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/sennik">Sennik</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {symbol.categoryName && symbol.categorySlug && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/kategoria/${symbol.categorySlug}`}>
                    {symbol.categoryName}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{symbol.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mb-8">
        <span className="text-primary text-sm font-medium tracking-widest uppercase">
          Sen o symbolu
        </span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {symbol.name}
        </h1>
        {symbol.excerpt && (
          <p className="text-muted-foreground mt-3 text-lg text-balance">
            {symbol.excerpt}
          </p>
        )}
      </header>

      <article className="prose prose-headings:font-semibold prose-a:text-primary max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {symbol.contentMd}
        </ReactMarkdown>
      </article>

      {symbol.variants.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">Warianty tego snu</h2>
          <Accordion type="single" collapsible className="w-full">
            {symbol.variants.map((variant, index) => (
              <AccordionItem key={variant.label} value={`variant-${index}`}>
                <AccordionTrigger>{variant.label}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {variant.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {symbol.faq.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">Najczęstsze pytania</h2>
          <Accordion type="single" collapsible className="w-full">
            {symbol.faq.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      <section className="from-primary/15 to-accent/15 mt-14 rounded-2xl bg-gradient-to-br p-6 text-center sm:p-8">
        <h2 className="text-xl font-semibold">
          Chcesz wiedzieć, co Twój sen oznacza konkretnie dla Ciebie?
        </h2>
        <p className="text-muted-foreground mx-auto mt-2 max-w-md text-balance">
          Opisz swój sen, a AI przygotuje spersonalizowaną interpretację
          uwzględniającą Twoje emocje i sytuację życiową.
        </p>
        <Button asChild size="lg" className="mt-5">
          <Link href="/interpretacja">Zinterpretuj mój sen</Link>
        </Button>
      </section>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-xl font-semibold">Powiązane symbole</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((item) => (
              <Badge key={item.slug} variant="secondary" asChild>
                <Link href={`/sennik/${item.slug}`}>{item.name}</Link>
              </Badge>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
