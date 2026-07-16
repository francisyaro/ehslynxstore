'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { getStoredRequests, QuoteRequest } from '@/lib/services/mockData';
import { useAdmin } from '../layout';
import { 
  FileText, 
  ArrowLeft, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Clock, 
  Building,
  User,
  LayoutGrid,
  Sparkles,
  Inbox,
  UserCheck
} from 'lucide-react';

export default function AdminRequestsList() {
  const { activeAgent } = useAdmin();
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    setRequests(getStoredRequests());
  }, []);

  // Filter requests by search text, status, and active agent context
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      // 1. Filter by Active Sales Agent from top context selector
      const matchesAgent = activeAgent === 'all' || req.assigned_to === activeAgent;

      // 2. Filter by search query
      const matchesSearch =
        !search ||
        req.reference.toLowerCase().includes(search.toLowerCase()) ||
        req.company_name.toLowerCase().includes(search.toLowerCase()) ||
        req.contact_name.toLowerCase().includes(search.toLowerCase()) ||
        req.email.toLowerCase().includes(search.toLowerCase()) ||
        (req.country && req.country.toLowerCase().includes(search.toLowerCase()));

      // 3. Filter by selected workflow status
      const matchesStatus = !statusFilter || req.status === statusFilter;

      return matchesAgent && matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter, activeAgent]);

  const statuses = [
    { value: 'nouvelle', label: '1. Nouvelles' },
    { value: 'en_qualification', label: '2. En qualification' },
    { value: 'informations_requises', label: '3. Informations requises' },
    { value: 'affectee', label: '4. Affectée' },
    { value: 'consultation_fournisseur', label: '5. Consultation Fournisseur' },
    { value: 'offre_en_preparation', label: '6. Offre en préparation' },
    { value: 'devis_transmis', label: '7. Devis transmis' },
    { value: 'acceptee', label: '8. Acceptées' },
    { value: 'refusee', label: '9. Refusées' },
  ];

  const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
    nouvelle: { label: 'Nouvelle', color: 'bg-blue-500/10 text-blue-400 border-blue-500/25', dot: 'bg-blue-450' },
    en_qualification: { label: 'En qualification', color: 'bg-amber-500/10 text-amber-400 border-amber-500/25', dot: 'bg-amber-450' },
    informations_requises: { label: 'Infos requises', color: 'bg-orange-500/10 text-orange-400 border-orange-500/25', dot: 'bg-orange-450' },
    affectee: { label: 'Affectée', color: 'bg-pink-500/10 text-pink-400 border-pink-500/25', dot: 'bg-pink-450' },
    consultation_fournisseur: { label: 'Consultation Fournisseur', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25', dot: 'bg-indigo-450' },
    offre_en_preparation: { label: 'Offre en préparation', color: 'bg-purple-500/10 text-purple-400 border-purple-500/25', dot: 'bg-purple-450' },
    devis_transmis: { label: 'Devis transmis', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25', dot: 'bg-cyan-450' },
    acceptee: { label: 'Acceptée', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25', dot: 'bg-emerald-450' },
    refusee: { label: 'Refusée', color: 'bg-rose-500/10 text-rose-400 border-rose-500/25', dot: 'bg-rose-450' },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/40">
        <div className="space-y-1">
          <Link href="/admin" className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 hover:text-brand-blue transition-colors group">
            <ArrowLeft className="h-3.5 w-3.5 transform group-hover:-translate-x-0.5 transition-transform" /> Console d'administration
          </Link>
          <h1 className="text-2xl font-black text-white sm:text-3xl">Gestion des Demandes</h1>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            {activeAgent === 'all' 
              ? `Toutes les demandes enregistrées (${filteredRequests.length})` 
              : `Demandes affectées à ${activeAgent} (${filteredRequests.length})`}
          </p>
        </div>
      </div>

      {/* Filter and search panel */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0a0f1d]/60 border border-slate-800/80 p-4 rounded-2xl shadow-xl backdrop-blur-md">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Rechercher par référence, client, e-mail, pays..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080d19] border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-brand-blue placeholder:text-slate-500 transition-colors"
          />
          <Search className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-slate-500" />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-4 w-4 text-slate-500 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-60 px-3 py-2.5 rounded-xl bg-[#080d19] border border-slate-800 text-xs text-slate-250 font-bold focus:outline-none focus:border-brand-blue cursor-pointer"
          >
            <option value="">Tous les statuts du workflow</option>
            {statuses.map((st) => (
              <option key={st.value} value={st.value}>{st.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Requests table list */}
      <div className="border border-slate-800/80 rounded-2xl overflow-hidden bg-[#0a0f1d]/75 shadow-2xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800/60 text-left">
            <thead className="bg-[#0b1123] text-[10px] text-slate-450 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4.5">Référence</th>
                <th className="px-6 py-4.5">Date</th>
                <th className="px-6 py-4.5">Entreprise & Pays</th>
                <th className="px-6 py-4.5">Contact Client</th>
                <th className="px-6 py-4.5">Affectation</th>
                <th className="px-6 py-4.5">Statut</th>
                <th className="px-6 py-4.5">Matériel</th>
                <th className="px-6 py-4.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-xs text-slate-300">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => {
                  const config = statusConfig[req.status] || { 
                    label: req.status.replace('_', ' '), 
                    color: 'bg-slate-800/40 text-slate-400 border-slate-750',
                    dot: 'bg-slate-500'
                  };
                  return (
                    <tr key={req.id} className="hover:bg-slate-850/20 transition-colors group">
                      {/* Ref */}
                      <td className="px-6 py-4.5 font-mono font-bold text-brand-blue group-hover:text-cyan-400 transition-colors">
                        {req.reference}
                      </td>
                      {/* Date */}
                      <td className="px-6 py-4.5 text-slate-450 font-mono flex items-center gap-1.5 mt-2.5 border-0">
                        <Clock className="h-3.5 w-3.5 text-slate-650" /> {new Date(req.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      {/* Company & Country */}
                      <td className="px-6 py-4.5">
                        <div className="font-extrabold text-white flex items-center gap-1.5">
                          <Building className="h-3.5 w-3.5 text-slate-500" /> {req.company_name}
                        </div>
                        <div className="text-[10px] text-slate-500 font-semibold pl-5 mt-0.5">{req.country}</div>
                      </td>
                      {/* Contact client */}
                      <td className="px-6 py-4.5">
                        <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-slate-500" /> {req.contact_name}
                        </div>
                        <div className="text-[10px] text-slate-500 pl-5 mt-0.5 truncate max-w-[180px]">{req.email}</div>
                      </td>
                      {/* Assignee */}
                      <td className="px-6 py-4.5">
                        {req.assigned_to ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-350 bg-slate-800/40 px-2.5 py-1 rounded-lg border border-slate-700/50">
                            <UserCheck className="h-3 w-3 text-brand-green" /> {req.assigned_to.split(' ')[0]}
                          </span>
                        ) : (
                          <span className="text-[10px] italic text-slate-600">Non assignée</span>
                        )}
                      </td>
                      {/* Status */}
                      <td className="px-6 py-4.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${config.color}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                          {config.label}
                        </span>
                      </td>
                      {/* Qty items */}
                      <td className="px-6 py-4.5 font-bold text-slate-400">
                        {req.items.length} {req.items.length > 1 ? 'articles' : 'article'}
                      </td>
                      {/* Actions */}
                      <td className="px-6 py-4.5 text-right">
                        <Link
                          href={`/admin/demandes/${req.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-800 bg-[#0d1326] hover:bg-brand-blue/20 hover:border-brand-blue hover:text-white text-[10px] font-black text-slate-400 transition-all group/action"
                        >
                          Traiter <ArrowUpRight className="h-3 w-3 transform group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5 transition-transform" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center">
                    <div className="max-w-md mx-auto flex flex-col items-center justify-center space-y-3">
                      <Inbox className="h-10 w-10 text-slate-650" />
                      <p className="text-xs text-slate-500 font-bold">Aucune demande trouvée avec les critères sélectionnés.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
