'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, BRANDS, CATEGORIES, PRODUCTS } from '@/lib/services/mockData';
import { Search, SlidersHorizontal, Volume2, Wind, Thermometer, UserCheck, Activity, X } from 'lucide-react';

interface ProductGridProps {
  initialSearch?: string;
  initialBrand?: string;
  initialCategory?: string;
}

export default function ProductGrid({ initialSearch = '', initialBrand = '', initialCategory = '' }: ProductGridProps) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Map category to icon
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'bruit-et-vibrations': return <Volume2 className="h-4 w-4" />;
      case 'echantillonnage-d-air': return <Wind className="h-4 w-4" />;
      case 'stress-thermique': return <Thermometer className="h-4 w-4" />;
      case 'protection-respiratoire': return <UserCheck className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  // Filter products based on active filters
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.model.toLowerCase().includes(search.toLowerCase()) ||
        product.short_description.toLowerCase().includes(search.toLowerCase()) ||
        product.manufacturer_reference.toLowerCase().includes(search.toLowerCase());

      const brand = BRANDS.find((b) => b.id === product.brand_id);
      const matchesBrand = !selectedBrand || brand?.slug === selectedBrand;

      const category = CATEGORIES.find((c) => c.id === product.category_id);
      const matchesCategory = !selectedCategory || category?.slug === selectedCategory;

      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [search, selectedBrand, selectedCategory]);

  const activeCategoryName = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === selectedCategory)?.name || '';
  }, [selectedCategory]);

  const activeBrandName = useMemo(() => {
    return BRANDS.find((b) => b.slug === selectedBrand)?.name || '';
  }, [selectedBrand]);

  const resetFilters = () => {
    setSearch('');
    setSelectedBrand('');
    setSelectedCategory('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Filter Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="border border-slate-200 bg-white p-5 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-brand-green" /> Filtres
            </h2>
            {(selectedBrand || selectedCategory || search) && (
              <button
                onClick={resetFilters}
                className="text-[10px] text-slate-500 hover:text-brand-green font-bold uppercase transition-colors"
              >
                Réinitialiser
              </button>
            )}
          </div>

          {/* Categories list filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Catégories</h3>
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => setSelectedCategory('')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                  !selectedCategory
                    ? 'text-brand-green bg-slate-100'
                    : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                }`}
              >
                <Activity className="h-3.5 w-3.5" />
                <span>Toutes les catégories</span>
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                    selectedCategory === c.slug
                      ? 'text-brand-green bg-slate-100'
                      : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                  }`}
                >
                  <span className="shrink-0">{getCategoryIcon(c.slug)}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands list filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Marques</h3>
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => setSelectedBrand('')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                  !selectedBrand
                    ? 'text-brand-green bg-slate-100'
                    : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                }`}
              >
                Toutes les marques
              </button>
              {BRANDS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(b.slug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                    selectedBrand === b.slug
                      ? 'text-brand-green bg-slate-100'
                      : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main product panel */}
      <div className="lg:col-span-3 space-y-6">
        {/* Search input and status */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          {/* Search bar */}
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Nom, modèle, mot-clé..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-brand-blue transition-colors"
            />
            <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-3 hover:text-slate-900 text-slate-400"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-semibold self-center">
            {filteredProducts.length}{' '}
            {filteredProducts.length > 1 ? 'produits trouvés' : 'produit trouvé'}
          </div>
        </div>

        {/* Filter chips active */}
        {(selectedBrand || selectedCategory || search) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mr-1">Filtres actifs:</span>
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-700">
                Catégorie: {activeCategoryName}
                <button onClick={() => setSelectedCategory('')} className="hover:text-brand-green ml-1">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedBrand && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-700">
                Marque: {activeBrandName}
                <button onClick={() => setSelectedBrand('')} className="hover:text-brand-green ml-1">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {search && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-700">
                Recherche: &quot;{search}&quot;
                <button onClick={() => setSearch('')} className="hover:text-brand-green ml-1">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const brand = BRANDS.find((b) => b.id === product.brand_id);
              const category = CATEGORIES.find((c) => c.id === product.category_id);
              return (
                <div
                  key={product.id}
                  className="flex flex-col border border-slate-200 bg-white rounded-2xl overflow-hidden hover:border-brand-blue/35 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300 group relative"
                >
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase h-6">
                        {brand?.logo.startsWith('/') ? (
                          <img src={brand.logo} alt={brand.name} className="h-4 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                        ) : (
                          <span>{brand?.name}</span>
                        )}
                        <span className="text-brand-green">{product.model}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {product.short_description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      {/* Technical specifications quick view */}
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">
                        {category?.name}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wide bg-emerald-50 text-brand-green border border-brand-green/20">
                          Prix sur demande
                        </span>
                        
                        <Link
                          href={`/produits/${brand?.slug}/${product.slug}`}
                          className="inline-flex items-center justify-center h-8 px-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 hover:text-slate-950 transition-all"
                        >
                          Détails
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl space-y-3">
            <p className="text-slate-500 text-sm">Aucun produit ne correspond à vos filtres.</p>
            <button
              onClick={resetFilters}
              className="text-xs text-brand-green font-bold hover:underline"
            >
              Effacer tous les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
