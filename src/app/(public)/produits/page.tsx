import React from 'react';
import ProductGrid from '@/components/ProductGrid';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    brand?: string;
    category?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductGrid
          initialSearch={params.search}
          initialBrand={params.brand}
          initialCategory={params.category}
        />
      </div>
    </div>
  );
}
