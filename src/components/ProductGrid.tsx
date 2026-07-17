'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Product, BRANDS, CATEGORIES, PRODUCTS } from '@/lib/services/mockData';
import { Search, Volume2, Wind, Thermometer, UserCheck, Activity, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGridProps {
  initialSearch?: string;
  initialBrand?: string;
  initialCategory?: string;
}

interface ProductShelfProps {
  title: string;
  subtitle?: string;
  products: Product[];
  brands: typeof BRANDS;
  categories: typeof CATEGORIES;
}

function ProductShelf({ title, subtitle, products, brands, categories }: ProductShelfProps) {
  const shelfRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (shelfRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      shelfRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 py-6 relative group/shelf">
      <div className="flex justify-between items-end px-2">
        <div className="max-w-[80%]">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{subtitle}</p>}
        </div>
        
        {/* Prev / Next buttons */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-slate-200/50 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Faire défiler à gauche"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-slate-200/50 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Faire défiler à droite"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={shelfRef}
        className="flex overflow-x-auto gap-6 pb-6 pt-2 px-2 scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => {
          const brand = brands.find((b) => b.id === product.brand_id);
          const category = categories.find((c) => c.id === product.category_id);
          return (
            <div
              key={product.id}
              className="flex-none w-[280px] sm:w-[320px] flex flex-col border border-slate-200 bg-white rounded-2xl overflow-hidden hover:border-brand-blue/35 hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300 group relative"
            >
              {/* Product Image Container */}
              <div className="h-44 w-full bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-center relative overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-103"
                  />
                ) : (
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Image non disponible</span>
                )}
              </div>

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

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-blue transition-colors leading-snug min-h-[40px]">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {product.short_description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">
                    {category?.name}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wide bg-emerald-50 text-brand-green border border-brand-green/20">
                      Prix sur demande
                    </span>
                    
                    <Link
                      href={`/produits/${brand?.slug}/${product.slug}`}
                      className="inline-flex items-center justify-center h-8 px-4 rounded-full bg-brand-blue hover:bg-blue-750 text-xs font-bold text-white shadow-sm shadow-brand-blue/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
    </div>
  );
}

export default function ProductGrid({ initialSearch = '', initialBrand = '', initialCategory = '' }: ProductGridProps) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const categoriesRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      categoriesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Map category to icon
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'bruit-et-vibrations': return <Volume2 className="h-6 w-6 sm:h-7 sm:w-7" />;
      case 'echantillonnage-d-air': return <Wind className="h-6 w-6 sm:h-7 sm:w-7" />;
      case 'stress-thermique': return <Thermometer className="h-6 w-6 sm:h-7 sm:w-7" />;
      case 'protection-respiratoire': return <UserCheck className="h-6 w-6 sm:h-7 sm:w-7" />;
      default: return <Activity className="h-6 w-6 sm:h-7 sm:w-7" />;
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
    <div className="w-full space-y-2">
      
      {/* Store Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-200/60">
        <div className="space-y-1">
          <h1 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight leading-none">Store</h1>
        </div>
        <div className="max-w-md md:text-right space-y-2.5">
          <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
            La meilleure façon d&apos;acquérir les équipements que vous aimez.
          </p>
          <div className="flex flex-wrap md:justify-end gap-x-4 gap-y-1.5 text-xs font-semibold">
            <Link href="/info-contact" className="text-brand-blue hover:underline inline-flex items-center gap-0.5 group">
              Contacter un expert <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
            </Link>
            <Link href="/demande-de-prix" className="text-brand-blue hover:underline inline-flex items-center gap-0.5 group">
              Planifier ma demande <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Scrollable Row */}
      <div className="relative group/cats mb-10">
        {/* Left scroll button */}
        <button
          onClick={() => scrollCategories('left')}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all opacity-0 group-hover/cats:opacity-100 cursor-pointer"
          aria-label="Faire défiler les catégories à gauche"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div
          ref={categoriesRef}
          className="flex overflow-x-auto gap-8 pb-4 scrollbar-none items-center justify-start py-4 px-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Toutes les catégories */}
          <button
            onClick={() => setSelectedCategory('')}
            className="flex-none flex flex-col items-center group cursor-pointer"
          >
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border transition-all shadow-sm ${
              !selectedCategory
                ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/15'
                : 'bg-white text-slate-600 border-slate-200 group-hover:border-brand-blue group-hover:bg-slate-50'
            }`}>
              <Activity className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <span className={`text-[10px] sm:text-xs font-bold tracking-tight text-center max-w-[110px] mt-2.5 transition-colors ${
              !selectedCategory ? 'text-brand-blue' : 'text-slate-700 group-hover:text-brand-blue'
            }`}>
              Tous les produits
            </span>
          </button>

          {/* Categories */}
          {CATEGORIES.map((c) => {
            const isActive = selectedCategory === c.slug;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.slug)}
                className="flex-none flex flex-col items-center group cursor-pointer"
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border transition-all shadow-sm ${
                  isActive
                    ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/15'
                    : 'bg-white text-slate-600 border-slate-200 group-hover:border-brand-blue group-hover:bg-slate-50'
                }`}>
                  <span className="shrink-0">{getCategoryIcon(c.slug)}</span>
                </div>
                <span className={`text-[10px] sm:text-xs font-bold tracking-tight text-center max-w-[110px] mt-2.5 transition-colors ${
                  isActive ? 'text-brand-blue' : 'text-slate-700 group-hover:text-brand-blue'
                }`}>
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scrollCategories('right')}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all opacity-0 group-hover/cats:opacity-100 cursor-pointer"
          aria-label="Faire défiler les catégories à droite"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Brand & Search Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-slate-200 p-4 rounded-2xl shadow-sm mb-10">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mr-2">Marques:</span>
          <button
            onClick={() => setSelectedBrand('')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              !selectedBrand
                ? 'bg-brand-green text-white shadow-sm shadow-brand-green/10'
                : 'bg-slate-50 text-slate-650 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Toutes
          </button>
          {BRANDS.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBrand(b.slug)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedBrand === b.slug
                  ? 'bg-brand-green text-white shadow-sm shadow-brand-green/10'
                  : 'bg-slate-50 text-slate-650 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Rechercher un modèle, mot-clé..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all duration-200"
          />
          <Search className="absolute left-3 top-3.5 h-3.5 w-3.5 text-slate-400" />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-3.5 hover:text-slate-900 text-slate-400 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filters list info */}
      {(selectedBrand || search) && (
        <div className="flex flex-wrap gap-2 items-center mb-6">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mr-1">Filtres actifs:</span>
          {selectedBrand && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-700">
              Marque: {activeBrandName}
              <button onClick={() => setSelectedBrand('')} className="hover:text-brand-green ml-1 cursor-pointer">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {search && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-700">
              Recherche: &quot;{search}&quot;
              <button onClick={() => setSearch('')} className="hover:text-brand-green ml-1 cursor-pointer">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Product Shelves List */}
      <div className="space-y-12">
        {selectedCategory ? (
          // Show products of the selected category
          filteredProducts.length > 0 ? (
            <ProductShelf
              title={activeCategoryName}
              subtitle={CATEGORIES.find((c) => c.slug === selectedCategory)?.description}
              products={filteredProducts}
              brands={BRANDS}
              categories={CATEGORIES}
            />
          ) : (
            <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl space-y-3">
              <p className="text-slate-500 text-sm">Aucun produit ne correspond à vos filtres dans cette catégorie.</p>
              <button
                onClick={resetFilters}
                className="text-xs text-brand-green font-bold hover:underline cursor-pointer"
              >
                Effacer tous les filtres
              </button>
            </div>
          )
        ) : (
          // Show products grouped by category
          (() => {
            const categoriesWithProducts = CATEGORIES.map((category) => {
              const categoryProducts = filteredProducts.filter((p) => p.category_id === category.id);
              return { category, products: categoryProducts };
            }).filter((group) => group.products.length > 0);

            if (categoriesWithProducts.length > 0) {
              return categoriesWithProducts.map((group) => (
                <ProductShelf
                  key={group.category.id}
                  title={group.category.name}
                  subtitle={group.category.description}
                  products={group.products}
                  brands={BRANDS}
                  categories={CATEGORIES}
                />
              ));
            } else {
              return (
                <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl space-y-3">
                  <p className="text-slate-500 text-sm">Aucun produit ne correspond à vos filtres.</p>
                  <button
                    onClick={resetFilters}
                    className="text-xs text-brand-green font-bold hover:underline cursor-pointer"
                  >
                    Effacer tous les filtres
                  </button>
                </div>
              );
            }
          })()
        )}
      </div>

    </div>
  );
}
