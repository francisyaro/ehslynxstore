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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center sm:text-left space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Catalogue d\'Équipements</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Parcourez nos instruments certifiés des marques SVANTEK, SENSIDYNE, SLATESAFETY et OHD. Ajoutez-les au panier pour obtenir un devis personnalisé.
        </p>
      </div>
      
      <ProductGrid
        initialSearch={params.search}
        initialBrand={params.brand}
        initialCategory={params.category}
      />
    </div>
  );
}
