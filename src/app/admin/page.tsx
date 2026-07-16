'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStoredRequests, QuoteRequest } from '@/lib/services/mockData';
import { useAdmin } from './layout';
import { 
  FileText, 
  Users, 
  Activity, 
  MapPin, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Percent, 
  ChevronRight,
  Sparkles,
  RefreshCw,
  FolderDot
} from 'lucide-react';

export default function AdminDashboard() {
  const { activeAgent } = useAdmin();
  const [allRequests, setAllRequests] = useState<QuoteRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [metrics, setMetrics] = useState({
    total: 0,
    newCount: 0,
    inProgress: 0,
    completed: 0,
    countries: new Set<string>(),
  });

  const loadData = () => {
    setLoading(true);
    const list = getStoredRequests();
    setAllRequests(list);
    
    // Filter based on active agent
    const filtered = activeAgent === 'all' 
      ? list 
      : list.filter(r => r.assigned_to === activeAgent);
    
    setFilteredRequests(filtered);

    const newCount = filtered.filter((r) => r.status === 'nouvelle').length;
    const inProgress = filtered.filter((r) => [
      'en_qualification', 
      'informations_requises', 
      'affectee',
      'consultation_fournisseur',
      'offre_en_preparation', 
      'devis_transmis', 
      'relance_en_cours'
    ].includes(r.status)).length;
    
    const completed = filtered.filter((r) => [
      'acceptee', 
      'convertie_en_commande',
      'cloturee'
    ].includes(r.status)).length;
    
    const countries = new Set(filtered.map((r) => r.country).filter(Boolean));

    setMetrics({
      total: filtered.length,
      newCount,
      inProgress,
      completed,
      countries,
    });
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [activeAgent]);

  // Handle localstorage updates from other actions
  useEffect(() => {
    const handleUpdate = () => {
      loadData();
    };
    window.addEventListener('ehs_admin_agent_changed', handleUpdate);
    return () => window.removeEventListener('ehs_admin_agent_changed', handleUpdate);
  }, [allRequests]);

  // Compute brand requests distribution for chart
  const brandDistribution = () => {
    const brandsCount: Record<string, number> = {};
    let totalItems = 0;

    filteredRequests.forEach((r) => {
      r.items.forEach((item) => {
        const brand = item.product_brand;
        brandsCount[brand] = (brandsCount[brand] || 0) + item.quantity;
        totalItems += item.quantity;
      });
    });

    return Object.entries(brandsCount)
      .map(([brand, count]) => ({
        brand,
        count,
        percentage: totalItems > 0 ? Math.round((count / totalItems) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);
  };

  // Status mapping to label and color (premium dark theme colors)
  const statusConfig: Record<string, { label: string; color: string; glow: string }> = {
    nouvelle: { 
      label: 'Nouvelle', 
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/25', 
      glow: 'shadow-[0_0_12px_rgba(59,130,246,0.15)]' 
    },
    en_qualification: { 
      label: 'Qualification', 
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/25', 
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.15)]' 
    },
    informations_requises: { 
      label: 'Infos requises', 
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/25', 
      glow: 'shadow-[0_0_12px_rgba(249,115,22,0.15)]' 
    },
    offre_en_preparation: { 
      label: 'Offre en prép.', 
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/25', 
      glow: 'shadow-[0_0_12px_rgba(168,85,247,0.15)]' 
    },
    devis_transmis: { 
      label: 'Devis transmis', 
      color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25', 
      glow: 'shadow-[0_0_12px_rgba(6,182,212,0.15)]' 
    },
    acceptee: { 
      label: 'Acceptée', 
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25', 
      glow: 'shadow-[0_0_12px_rgba(16,185,129,0.15)]' 
    },
    refusee: { 
      label: 'Refusée', 
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/25', 
      glow: 'shadow-[0_0_12px_rgba(244,63,94,0.15)]' 
    },
  };

  const recentLogs = () => {
    // Generate chronological activities based on all logs of filtered requests
    interface LogItem {
      reqId: string;
      ref: string;
      company: string;
      comment: string;
      actor: string;
      date: string;
    }
    const logs: LogItem[] = [];
    filteredRequests.forEach(req => {
      req.activity_logs.forEach(log => {
        logs.push({
          reqId: req.id,
          ref: req.reference,
          company: req.company_name,
          comment: log.comment,
          actor: log.actor,
          date: log.created_at
        });
      });
    });
    return logs.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Dashboard Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-green animate-ping" />
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Tableau de Bord Commercial</h1>
          </div>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            {activeAgent === 'all' 
              ? "Console d'administration globale — EHS LYNX AFRIK" 
              : `Vue commerciale filtrée pour : ${activeAgent}`}
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={loadData}
            className="p-2.5 rounded-xl border border-slate-800 bg-[#0c1224] hover:bg-slate-800/50 text-slate-400 hover:text-white transition-all duration-200"
            title="Rafraîchir les données"
          >
            <RefreshCw className="h-4.5 w-4.5" />
          </button>
          <Link
            href="/admin/demandes"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-750 text-white text-xs font-black shadow-lg shadow-brand-blue/15 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            Gérer les demandes <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="relative group overflow-hidden p-6 rounded-2xl bg-gradient-to-b from-[#0e1428]/80 to-[#0a0f1d]/90 border border-slate-800/70 shadow-xl hover:border-slate-700/60 transition-all duration-300">
          <div className="absolute -right-3 -top-3 w-16 h-16 bg-brand-blue/5 rounded-full blur-xl group-hover:bg-brand-blue/10 transition-all duration-500" />
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-550">Total Demandes</span>
            <div className="p-2 rounded-lg bg-brand-blue/10 border border-brand-blue/20">
              <FileText className="h-4.5 w-4.5 text-brand-blue" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-4">{metrics.total}</p>
          <p className="text-[9px] text-slate-500 mt-1">Demandes affectées au commercial</p>
        </div>

        {/* Metric 2 */}
        <div className="relative group overflow-hidden p-6 rounded-2xl bg-gradient-to-b from-[#0e1428]/80 to-[#0a0f1d]/90 border border-slate-800/70 shadow-xl hover:border-slate-700/60 transition-all duration-300">
          <div className="absolute -right-3 -top-3 w-16 h-16 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all duration-500" />
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-550">Nouvelles Demandes</span>
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <TrendingUp className="h-4.5 w-4.5 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-black text-blue-400 mt-4">{metrics.newCount}</p>
          <p className="text-[9px] text-slate-500 mt-1">En attente de traitement commercial</p>
        </div>

        {/* Metric 3 */}
        <div className="relative group overflow-hidden p-6 rounded-2xl bg-gradient-to-b from-[#0e1428]/80 to-[#0a0f1d]/90 border border-slate-800/70 shadow-xl hover:border-slate-700/60 transition-all duration-300">
          <div className="absolute -right-3 -top-3 w-16 h-16 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all duration-500" />
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-550">En Qualification / Offre</span>
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Activity className="h-4.5 w-4.5 text-amber-400" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-400 mt-4">{metrics.inProgress}</p>
          <p className="text-[9px] text-slate-500 mt-1">Devis en cours de chiffrage</p>
        </div>

        {/* Metric 4 */}
        <div className="relative group overflow-hidden p-6 rounded-2xl bg-gradient-to-b from-[#0e1428]/80 to-[#0a0f1d]/90 border border-slate-800/70 shadow-xl hover:border-slate-700/60 transition-all duration-300">
          <div className="absolute -right-3 -top-3 w-16 h-16 bg-brand-green/5 rounded-full blur-xl group-hover:bg-brand-green/10 transition-all duration-500" />
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-550">Pays Cibles</span>
            <div className="p-2 rounded-lg bg-brand-green/10 border border-brand-green/20">
              <MapPin className="h-4.5 w-4.5 text-brand-green" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-4">{metrics.countries.size}</p>
          <p className="text-[9px] text-slate-500 mt-1">Origine géographique des RFQ</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent requests list */}
        <div className="lg:col-span-2 bg-[#0a0f1d]/85 border border-slate-800/80 p-6 rounded-3xl space-y-6 shadow-2xl backdrop-blur-md">
          <div className="flex justify-between items-center border-b border-slate-800/40 pb-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-355 flex items-center gap-2">
              <FolderDot className="h-4 w-4 text-brand-blue" /> Demandes Récentes
            </h2>
            <Link href="/admin/demandes" className="text-[10px] font-bold text-brand-blue hover:text-cyan-400 flex items-center gap-0.5 transition-colors">
              Voir tout <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {loading ? (
            <div className="py-20 text-center text-xs text-slate-500 animate-pulse">Chargement des demandes...</div>
          ) : filteredRequests.length > 0 ? (
            <div className="divide-y divide-slate-800/50">
              {filteredRequests.slice(0, 5).map((req) => {
                const config = statusConfig[req.status] || { 
                  label: req.status.replace('_', ' '), 
                  color: 'bg-slate-800/30 text-slate-400 border-slate-750',
                  glow: '' 
                };
                return (
                  <div key={req.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group/item hover:bg-slate-850/5 rounded-xl px-2 -mx-2 transition-all">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/demandes/${req.id}`} className="text-xs font-mono font-bold text-brand-blue hover:text-cyan-400 hover:underline">
                          {req.reference}
                        </Link>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider border ${config.color} ${config.glow}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 font-extrabold">{req.company_name} <span className="text-[10px] text-slate-500 font-normal">({req.country})</span></p>
                      <p className="text-[10px] text-slate-400">{req.contact_name} — {req.items.length} {req.items.length > 1 ? 'articles' : 'article'}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-slate-550 font-mono flex items-center gap-1 justify-end">
                        <Clock className="h-3 w-3 text-slate-650" /> {new Date(req.created_at).toLocaleDateString('fr-FR')}
                      </p>
                      <Link 
                        href={`/admin/demandes/${req.id}`} 
                        className="inline-flex items-center gap-0.5 text-[10px] font-black text-slate-400 hover:text-brand-green mt-2 group/btn transition-colors"
                      >
                        Traiter <ArrowRight className="h-3 w-3 transform group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-xs text-slate-500">
              {activeAgent === 'all' 
                ? "Aucune demande reçue pour le moment." 
                : `Aucune demande n'est affectée à ${activeAgent}.`}
            </div>
          )}
        </div>

        {/* Brand popularity charts & Live feed */}
        <div className="space-y-8">
          
          {/* Brand popularity */}
          <div className="bg-[#0a0f1d]/85 border border-slate-800/80 p-6 rounded-3xl space-y-6 shadow-2xl backdrop-blur-md">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-355 border-b border-slate-800/40 pb-4 flex items-center gap-2">
              <Percent className="h-4 w-4 text-brand-green" /> Demande par Marques
            </h2>

            <div className="space-y-4">
              {loading ? (
                <div className="py-10 text-center text-xs text-slate-500 animate-pulse">Analyse en cours...</div>
              ) : brandDistribution().length > 0 ? (
                brandDistribution().map((dist, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-300">
                      <span>{dist.brand}</span>
                      <span className="text-slate-450 font-mono text-[10px]">{dist.count} u. ({dist.percentage}%)</span>
                    </div>
                    {/* Modern Gradient Progress bar */}
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/30">
                      <div
                        className="h-full bg-gradient-to-r from-brand-blue to-cyan-400 rounded-full shadow-[0_0_8px_rgba(18,67,140,0.5)]"
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

          {/* Activity Log feed */}
          <div className="bg-[#0a0f1d]/85 border border-slate-800/80 p-6 rounded-3xl space-y-5 shadow-2xl backdrop-blur-md">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-355 border-b border-slate-800/40 pb-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-400" /> Flux d'Activité Récent
            </h2>

            <div className="space-y-4">
              {loading ? (
                <div className="py-10 text-center text-xs text-slate-500 animate-pulse">Chargement de l'activité...</div>
              ) : recentLogs().length > 0 ? (
                recentLogs().map((log, idx) => (
                  <div key={idx} className="text-xs space-y-1 relative pl-4 border-l border-slate-800 py-1">
                    <span className="absolute -left-1 top-2.5 h-2 w-2 rounded-full bg-brand-blue/60" />
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[9px] font-bold text-brand-blue">{log.ref}</span>
                      <span className="text-[9px] text-slate-500">
                        {new Date(log.date).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <p className="text-slate-300 font-medium leading-normal">{log.comment}</p>
                    <p className="text-[9px] text-slate-500 font-bold">{log.actor} • {log.company}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-500">Aucune activité enregistrée.</div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
