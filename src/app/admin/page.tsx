'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStoredRequests, QuoteRequest, BRANDS } from '@/lib/services/mockData';
import { FileText, Users, DollarSign, Activity, ShoppingBag, MapPin, ArrowRight, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    newCount: 0,
    inProgress: 0,
    completed: 0,
    countries: new Set<string>(),
  });

  useEffect(() => {
    const list = getStoredRequests();
    setRequests(list);

    const newCount = list.filter((r) => r.status === 'nouvelle').length;
    const inProgress = list.filter((r) => ['en_qualification', 'informations_requises', 'offre_en_preparation', 'devis_transmis', 'relance_en_cours'].includes(r.status)).length;
    const completed = list.filter((r) => ['acceptee', 'convertie_en_commande'].includes(r.status)).length;
    const countries = new Set(list.map((r) => r.country).filter(Boolean));

    setMetrics({
      total: list.length,
      newCount,
      inProgress,
      completed,
      countries,
    });
  }, []);

  // Compute brand requests distribution for chart
  const brandDistribution = () => {
    const brandsCount: Record<string, number> = {};
    let totalItems = 0;

    requests.forEach((r) => {
      r.items.forEach((item) => {
        const brand = item.product_brand;
        brandsCount[brand] = (brandsCount[brand] || 0) + item.quantity;
        totalItems += item.quantity;
      });
    });

    return Object.entries(brandsCount).map(([brand, count]) => ({
      brand,
      count,
      percentage: totalItems > 0 ? Math.round((count / totalItems) * 100) : 0,
    }));
  };

  // Status mapping to label and color (optimized for light theme)
  const statusConfig: Record<string, { label: string; color: string }> = {
    nouvelle: { label: 'Nouvelle', color: 'bg-blue-50 text-blue-600 border-blue-100' },
    en_qualification: { label: 'En qualification', color: 'bg-amber-50 text-amber-700 border-amber-100' },
    offre_en_preparation: { label: 'Offre en préparation', color: 'bg-purple-50 text-purple-700 border-purple-100' },
    devis_transmis: { label: 'Devis transmis', color: 'bg-cyan-50 text-cyan-700 border-cyan-100' },
    acceptee: { label: 'Acceptée', color: 'bg-emerald-50 text-brand-green border-emerald-100' },
    refusee: { label: 'Refusée', color: 'bg-rose-50 text-brand-red border-rose-100' },
  };

  return (
    <div className="mx-auto max-w-7xl px-2 py-8 sm:px-4 lg:px-4 space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Console Commerciale</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">EHS LYNX AFRIK — Suivi d'activité</p>
        </div>
        <Link
          href="/admin/demandes"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-brand-blue hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-brand-blue/10 transition-all hover:scale-[1.01]"
        >
          Gérer les demandes de prix <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Demandes</span>
            <FileText className="h-5 w-5 text-brand-blue" />
          </div>
          <p className="text-3xl font-black text-slate-900">{metrics.total}</p>
          <p className="text-[10px] text-slate-500">Historique complet du site</p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Nouvelles Demandes</span>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-black text-blue-600">{metrics.newCount}</p>
          <p className="text-[10px] text-slate-500">À qualifier rapidement</p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">En cours</span>
            <Activity className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-amber-600">{metrics.inProgress}</p>
          <p className="text-[10px] text-slate-500">Devis et négociations en cours</p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pays Couverts</span>
            <MapPin className="h-5 w-5 text-brand-green" />
          </div>
          <p className="text-3xl font-black text-slate-900">{metrics.countries.size}</p>
          <p className="text-[10px] text-slate-500">Afrique de l'Ouest et Centrale</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent requests list */}
        <div className="lg:col-span-2 border border-slate-200 bg-white p-6 rounded-3xl space-y-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Demandes Récentes
          </h2>

          {requests.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {requests.slice(0, 5).map((req) => {
                const config = statusConfig[req.status] || { label: req.status.replace('_', ' '), color: 'bg-slate-50 text-slate-500 border-slate-200' };
                return (
                  <div key={req.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/demandes/${req.id}`} className="text-xs font-mono font-bold text-brand-blue hover:underline">
                          {req.reference}
                        </Link>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-900 font-bold">{req.company_name} ({req.country})</p>
                      <p className="text-[10px] text-slate-500">{req.contact_name} — {req.items.length} {req.items.length > 1 ? 'articles' : 'article'}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 font-mono">{new Date(req.created_at).toLocaleDateString('fr-FR')}</p>
                      <Link href={`/admin/demandes/${req.id}`} className="inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-500 hover:text-brand-blue mt-1 transition-colors">
                        Traiter <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-xs text-slate-500">Aucune demande reçue pour le moment.</div>
          )}
        </div>

        {/* Brand popularity charts */}
        <div className="border border-slate-200 bg-white p-6 rounded-3xl space-y-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Demande par Marques
          </h2>

          <div className="space-y-4">
            {brandDistribution().length > 0 ? (
              brandDistribution().map((dist, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>{dist.brand}</span>
                    <span className="text-slate-450">{dist.count} u. ({dist.percentage}%)</span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-blue to-brand-green rounded-full"
                      style={{ width: `${dist.percentage}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-xs text-slate-500">Données insuffisantes.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
