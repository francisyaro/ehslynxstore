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

  // Status mapping to label and color
  const statusConfig: Record<string, { label: string; color: string }> = {
    nouvelle: { label: 'Nouvelle', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    en_qualification: { label: 'En qualification', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    offre_en_preparation: { label: 'Offre en préparation', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    devis_transmis: { label: 'Devis transmis', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    acceptee: { label: 'Acceptée', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    refusee: { label: 'Refusée', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-900">
        <div>
          <h1 className="text-2xl font-black text-white">Console Commerciale</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">EHS LYNX AFRIK — Suivi d'activité</p>
        </div>
        <Link
          href="/admin/demandes"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors"
        >
          Gérer les demandes de prix <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/10 space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Demandes</span>
            <FileText className="h-5 w-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-black text-white">{metrics.total}</p>
          <p className="text-[10px] text-slate-500">Historique complet du site</p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/10 space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Nouvelles Demandes</span>
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </div>
          <p className="text-3xl font-black text-blue-400">{metrics.newCount}</p>
          <p className="text-[10px] text-slate-500">À qualifier rapidement</p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/10 space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">En cours</span>
            <Activity className="h-5 w-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-black text-yellow-400">{metrics.inProgress}</p>
          <p className="text-[10px] text-slate-500">Devis et négociations en cours</p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/10 space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Pays Couverts</span>
            <MapPin className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-white">{metrics.countries.size}</p>
          <p className="text-[10px] text-slate-500">Afrique de l'Ouest et Centrale</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent requests list */}
        <div className="lg:col-span-2 border border-slate-900 bg-slate-950 p-6 rounded-3xl space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-900 pb-3">
            Demandes Récentes
          </h2>

          {requests.length > 0 ? (
            <div className="divide-y divide-slate-900">
              {requests.slice(0, 5).map((req) => {
                const config = statusConfig[req.status] || { label: req.status.replace('_', ' '), color: 'bg-slate-900 text-slate-400' };
                return (
                  <div key={req.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/demandes/${req.id}`} className="text-xs font-mono font-bold text-cyan-400 hover:underline">
                          {req.reference}
                        </Link>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-xs text-white font-semibold">{req.company_name} ({req.country})</p>
                      <p className="text-[10px] text-slate-500">{req.contact_name} — {req.items.length} {req.items.length > 1 ? 'articles' : 'article'}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 font-mono">{new Date(req.created_at).toLocaleDateString('fr-FR')}</p>
                      <Link href={`/admin/demandes/${req.id}`} className="inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-400 hover:text-white mt-1">
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
        <div className="border border-slate-900 bg-slate-950 p-6 rounded-3xl space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-900 pb-3">
            Demande par Marques
          </h2>

          <div className="space-y-4">
            {brandDistribution().length > 0 ? (
              brandDistribution().map((dist, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>{dist.brand}</span>
                    <span className="text-slate-500">{dist.count} u. ({dist.percentage}%)</span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
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
