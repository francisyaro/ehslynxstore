'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStoredRequests, QuoteRequest } from '@/lib/services/mockData';
import { useAdmin } from './layout';
import { 
  FileText, 
  Activity, 
  MapPin, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Percent, 
  ChevronRight,
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

  // Status config using EHS-LYNX colors (light theme matching)
  const statusConfig: Record<string, { label: string; color: string }> = {
    nouvelle: { 
      label: 'Nouvelle', 
      color: 'bg-blue-50 text-brand-blue border-blue-100' 
    },
    en_qualification: { 
      label: 'Qualification', 
      color: 'bg-amber-50 text-amber-800 border-amber-100' 
    },
    informations_requises: { 
      label: 'Infos requises', 
      color: 'bg-orange-50 text-orange-850 border-orange-100' 
    },
    offre_en_preparation: { 
      label: 'Offre en prép.', 
      color: 'bg-purple-50 text-purple-800 border-purple-100' 
    },
    devis_transmis: { 
      label: 'Devis transmis', 
      color: 'bg-cyan-50 text-cyan-800 border-cyan-100' 
    },
    acceptee: { 
      label: 'Acceptée', 
      color: 'bg-green-50 text-brand-green border-green-100' 
    },
    refusee: { 
      label: 'Refusée', 
      color: 'bg-red-50 text-brand-red border-red-100' 
    },
  };

  const recentLogs = () => {
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
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Tableau de Bord Commercial</h1>
          </div>
          <p className="text-xs text-slate-500 font-bold mt-1">
            {activeAgent === 'all' 
              ? "Console d'administration globale — EHS LYNX AFRIK" 
              : `Vue commerciale filtrée pour : ${activeAgent}`}
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={loadData}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all duration-200 shadow-2xs"
            title="Rafraîchir les données"
          >
            <RefreshCw className="h-4.5 w-4.5" />
          </button>
          <Link
            href="/admin/demandes"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-750 text-white text-xs font-black shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            Gérer les demandes <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid (Light theme, custom colors) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 - Total (Bleu Roi) */}
        <div className="relative group overflow-hidden p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-blue/40 transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Demandes</span>
            <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
              <FileText className="h-4.5 w-4.5 text-brand-blue" />
            </div>
          </div>
          <p className="text-3.5xl font-black text-brand-blue mt-4">{metrics.total}</p>
          <p className="text-[9px] text-slate-500 mt-1">RFQ affectées au commercial</p>
        </div>

        {/* Metric 2 - Nouvelles (Rouge Rouille - Action requise) */}
        <div className="relative group overflow-hidden p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-red/40 transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Nouvelles Demandes</span>
            <div className="p-2 rounded-lg bg-red-50 border border-red-100">
              <TrendingUp className="h-4.5 w-4.5 text-brand-red" />
            </div>
          </div>
          <p className="text-3.5xl font-black text-brand-red mt-4">{metrics.newCount}</p>
          <p className="text-[9px] text-slate-500 mt-1">À traiter en priorité absolue</p>
        </div>

        {/* Metric 3 - En Qualification (Vert Feuille) */}
        <div className="relative group overflow-hidden p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-green/40 transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">En Qualification</span>
            <div className="p-2 rounded-lg bg-green-50 border border-green-100">
              <Activity className="h-4.5 w-4.5 text-brand-green" />
            </div>
          </div>
          <p className="text-3.5xl font-black text-brand-green mt-4">{metrics.inProgress}</p>
          <p className="text-[9px] text-slate-500 mt-1">Devis et qualification en cours</p>
        </div>

        {/* Metric 4 - Pays (Bleu Roi) */}
        <div className="relative group overflow-hidden p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-blue/40 transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Pays Couverts</span>
            <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
              <MapPin className="h-4.5 w-4.5 text-brand-blue" />
            </div>
          </div>
          <p className="text-3.5xl font-black text-slate-800 mt-4">{metrics.countries.size}</p>
          <p className="text-[9px] text-slate-500 mt-1">Afrique de l'Ouest & Centrale</p>
        </div>

      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent requests list */}
        <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-brand-blue flex items-center gap-2">
              <FolderDot className="h-4 w-4 text-brand-blue" /> Demandes Récentes
            </h2>
            <Link href="/admin/demandes" className="text-[10px] font-bold text-brand-blue hover:text-brand-green flex items-center gap-0.5 transition-colors">
              Voir toutes <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {loading ? (
            <div className="py-20 text-center text-xs text-slate-400 animate-pulse">Chargement des demandes...</div>
          ) : filteredRequests.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {filteredRequests.slice(0, 5).map((req) => {
                const config = statusConfig[req.status] || { 
                  label: req.status.replace('_', ' '), 
                  color: 'bg-slate-100 text-slate-650 border-slate-200'
                };
                return (
                  <div key={req.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group/item hover:bg-slate-50 rounded-xl px-2 -mx-2 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/demandes/${req.id}`} className="text-xs font-mono font-bold text-brand-blue hover:underline">
                          {req.reference}
                        </Link>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider border ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 font-extrabold">{req.company_name} <span className="text-[10px] text-slate-400 font-normal">({req.country})</span></p>
                      <p className="text-[10px] text-slate-500">{req.contact_name} — {req.items.length} {req.items.length > 1 ? 'articles' : 'article'}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1 justify-end">
                        <Clock className="h-3.5 w-3.5 text-slate-400" /> {new Date(req.created_at).toLocaleDateString('fr-FR')}
                      </p>
                      <Link 
                        href={`/admin/demandes/${req.id}`} 
                        className="inline-flex items-center gap-0.5 text-[10px] font-black text-slate-500 hover:text-brand-blue mt-2 group/btn transition-colors"
                      >
                        Traiter <ArrowRight className="h-3 w-3 transform group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-xs text-slate-400">
              {activeAgent === 'all' 
                ? "Aucune demande reçue pour le moment." 
                : `Aucune demande n'est affectée à ${activeAgent}.`}
            </div>
          )}
        </div>

        {/* Right Columns: Brand Chart & Live Feed */}
        <div className="space-y-8">
          
          {/* Brand popularity */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-widest text-brand-green border-b border-slate-100 pb-4 flex items-center gap-2">
              <Percent className="h-4 w-4 text-brand-green" /> Demande par Marques
            </h2>

            <div className="space-y-4">
              {loading ? (
                <div className="py-10 text-center text-xs text-slate-400 animate-pulse">Analyse en cours...</div>
              ) : brandDistribution().length > 0 ? (
                brandDistribution().map((dist, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>{dist.brand}</span>
                      <span className="text-slate-500 font-mono text-[10px]">{dist.count} u. ({dist.percentage}%)</span>
                    </div>
                    {/* Modern gradient bar in brand colors */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                      <div
                        className="h-full bg-gradient-to-r from-brand-blue to-brand-green rounded-full"
                        style={{ width: `${dist.percentage}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-xs text-slate-400">Données insuffisantes.</div>
              )}
            </div>
          </div>

          {/* Activity Log feed */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-5 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-widest text-brand-red border-b border-slate-100 pb-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-red" /> Flux d'Activité Récent
            </h2>

            <div className="space-y-4">
              {loading ? (
                <div className="py-10 text-center text-xs text-slate-400 animate-pulse">Chargement de l'activité...</div>
              ) : recentLogs().length > 0 ? (
                recentLogs().map((log, idx) => (
                  <div key={idx} className="text-xs space-y-1 relative pl-4 border-l border-slate-200 py-1">
                    <span className="absolute -left-1 top-2.5 h-2 w-2 rounded-full bg-brand-blue" />
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[9px] font-bold text-brand-blue">{log.ref}</span>
                      <span className="text-[9px] text-slate-400">
                        {new Date(log.date).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium leading-normal">{log.comment}</p>
                    <p className="text-[9px] text-slate-450 font-bold">{log.actor} • {log.company}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-400">Aucune activité enregistrée.</div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
