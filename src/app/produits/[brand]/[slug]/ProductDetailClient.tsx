'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, Brand, Category } from '@/lib/services/mockData';
import { useCart } from '@/context/CartContext';
import { ShieldCheck, Plus, Minus, FileText, Check, ArrowRight, Download, Activity, Heart, Info } from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
  brand: Brand;
  category?: Category;
}

export default function ProductDetailClient({ product, brand, category }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [configuration, setConfiguration] = useState('Standard / Appareil seul');
  const [comment, setComment] = useState('');
  const [added, setAdded] = useState(false);

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart(product, quantity, configuration, comment);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const configurations = [
    'Standard / Appareil seul',
    'Kit complet avec mallette de transport',
    'Version Intrinsèquement Sûre (ATEX)',
    'Kit avec calibrateur & certificat d\'étalonnage',
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Left Column: Description & Metadata */}
      <div className="lg:col-span-7 space-y-10">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 items-center text-xs">
            {brand.logo.startsWith('/') ? (
              <img src={brand.logo} alt={brand.name} className="h-6 object-contain bg-slate-50 border border-slate-200 px-2 py-0.5 rounded shadow-sm" />
            ) : (
              <span className="px-2 py-0.5 rounded font-bold bg-slate-100 border border-slate-200 text-brand-green">
                {brand.name}
              </span>
            )}
            {category && (
              <span className="px-2 py-0.5 rounded font-bold bg-slate-100 border border-slate-200 text-slate-600">
                {category.name}
              </span>
            )}
            <span className={`px-2 py-0.5 rounded font-bold border text-[10px] uppercase tracking-wider ${
              product.availability_status === 'disponible'
                ? 'bg-emerald-50 text-brand-green border-emerald-200'
                : 'bg-orange-50 text-orange-600 border-orange-200'
            }`}>
              {product.availability_status === 'disponible' ? 'Disponible' : 'Sur commande'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {product.name}
          </h1>
          <p className="text-sm text-slate-600 font-bold">Référence constructeur : {product.manufacturer_reference} (Modèle: {product.model})</p>
        </div>

        {/* Detailed description */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">Description</h2>
          <p className="text-sm text-slate-655 leading-relaxed whitespace-pre-line">
            {product.long_description}
          </p>
        </div>

        {/* Applications & Sectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Applications Clés</h3>
            <ul className="space-y-2">
              {product.applications.map((app, i) => (
                <li key={i} className="flex gap-2 items-start text-xs text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Secteurs Recommandés</h3>
            <div className="flex flex-wrap gap-2">
              {product.sectors.map((sec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold"
                >
                  {sec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Advantages */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">Avantages Clés</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.advantages.map((adv, i) => (
              <div key={i} className="flex gap-2 items-start p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                <Check className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-normal">{adv}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Standards & Certifications */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Normes & Homologations</h3>
          <div className="flex flex-wrap gap-2">
            {product.standards_certifications.map((std, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-brand-blue" />
                {std}
              </span>
            ))}
          </div>
        </div>

        {/* Technical Documents (Public) */}
        {product.public_documents.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">Brochures & Documents</h2>
            <div className="space-y-2">
              {product.public_documents.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-brand-blue" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{doc.name}</p>
                      <p className="text-[10px] text-slate-500">{doc.size}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors" title="Télécharger">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Configurator & Specs */}
      <div className="lg:col-span-5 space-y-8">
        {/* Quote Configurator Form */}
        <div className="border border-slate-200 bg-white p-6 rounded-3xl relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 h-16 w-16 bg-brand-blue/5 rounded-full blur-xl pointer-events-none" />
          
          <h2 className="font-extrabold text-slate-900 text-lg mb-4 flex items-center gap-2">
            Demander un prix
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Ajoutez cet équipement à votre sélection. Configurez la quantité et la déclinaison souhaitées pour recevoir votre cotation.
          </p>

          <form onSubmit={handleAddToCartSubmit} className="space-y-5">
            {/* Configuration selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Configuration</label>
              <select
                value={configuration}
                onChange={(e) => setConfiguration(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
              >
                {configurations.map((cfg, i) => (
                  <option key={i} value={cfg}>{cfg}</option>
                ))}
              </select>
            </div>

            {/* Quantity selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Quantité</label>
              <div className="flex items-center w-28 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="p-2.5 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="flex-1 text-center text-xs font-bold text-slate-800 select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="p-2.5 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Comments / Details */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Commentaire / Options complémentaires</label>
              <textarea
                rows={3}
                placeholder="Ex : Calibration certifiée demandée, besoin d'accessoires de fixation, etc."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-blue"
              />
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              {added ? (
                <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 border border-brand-green/20 text-xs font-bold text-brand-green animate-fade-in">
                  <Check className="h-4 w-4" /> Produit ajouté à la sélection !
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-brand-blue hover:bg-blue-700 text-white text-xs shadow-lg shadow-brand-blue/10 transition-all hover:scale-[1.01]"
                >
                  Ajouter à ma demande de prix
                </button>
              )}

              <Link
                href="/demande-de-prix"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                Voir ma sélection
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </form>
        </div>

        {/* Technical Specifications Table */}
        <div className="border border-slate-200 bg-white p-6 rounded-3xl space-y-6 shadow-md">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-3">
            <Info className="h-4 w-4 text-brand-blue" /> Spécifications Techniques
          </h2>
          
          <div className="space-y-6">
            {product.technical_specifications.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  {group.group}
                </h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="min-w-full divide-y divide-slate-200 text-left">
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {group.items.map((spec, sIdx) => (
                        <tr key={sIdx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-2.5 text-xs text-slate-500 font-medium w-1/2">
                            {spec.key}
                          </td>
                          <td className="px-4 py-2.5 text-xs text-slate-800 font-semibold w-1/2">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
