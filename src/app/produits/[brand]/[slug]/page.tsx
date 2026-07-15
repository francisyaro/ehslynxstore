import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, BRANDS, CATEGORIES } from '@/lib/services/mockData';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
  params: Promise<{
    brand: string;
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const brandSlug = resolvedParams.brand;
  const productSlug = resolvedParams.slug;

  // Find brand
  const brand = BRANDS.find((b) => b.slug === brandSlug);
  if (!brand) notFound();

  // Find product
  const product = PRODUCTS.find(
    (p) => p.slug === productSlug && p.brand_id === brand.id
  );
  if (!product) notFound();

  const category = CATEGORIES.find((c) => c.id === product.category_id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-8">
        <Link href="/" className="hover:text-cyan-400">Accueil</Link>
        <span>/</span>
        <Link href="/produits" className="hover:text-cyan-400">Catalogue</Link>
        <span>/</span>
        <Link href={`/produits?brand=${brand.slug}`} className="hover:text-cyan-400">{brand.name}</Link>
        <span>/</span>
        <span className="text-slate-400 truncate max-w-[200px]">{product.model}</span>
      </nav>

      <ProductDetailClient product={product} brand={brand} category={category} />
    </div>
  );
}
