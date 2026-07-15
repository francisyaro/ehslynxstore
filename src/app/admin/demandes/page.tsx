'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { getStoredRequests, QuoteRequest } from '@/lib/services/mockData';
import { FileText, ArrowLeft, Search, Filter, ArrowUpRight, Check, AlertCircle } from 'lucide-react';

export default function AdminRequestsList() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    setRequests(getStoredRequests());
  }, []);

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesSearch =
        !search ||
        req.reference.toLowerCase().includes(search.toLowerCase()) ||
        req.company_name.toLowerCase().includes(search.toLowerCase()) ||
        req.contact_name.toLowerCase().includes(search.toLowerCase()) ||
        req.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = !statusFilter || req.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  const statuses = [
    { value: 'nouvelle', label: 'Nouvelles' },
    { value: 'en_qualification', label: 'En qualification' },
    { value: 'informations_requises', label: 'Informations requises' },
    { value: 'offre_en_preparation', label: 'Offre en préparation' },
    { value: 'devis_transmis', label: 'Devis transmis' },
    { value: 'acceptee', label: 'Acceptées' },
    { value: 'refusee', label: 'Refusées' },
  ];

  const statusConfig: Record<string, { label: string; color: string }> = {
    nouvelle: { label: 'Nouvelle', color: 'bg-blue-50 text-blue-600 border-blue-100' },
    en_qualification: { label: 'En qualification', color: 'bg-amber-50 text-amber-700 border-amber-100' },
    informations_requises: { label: 'Infos requises', color: 'bg-orange-50 text-orange-700 border-orange-100' },
    offre_en_preparation: { label: 'Offre en préparation', color: 'bg-purple-50 text-purple-700 border-purple-100' },
    devis_transmis: { label: 'Devis transmis', color: 'bg-cyan-50 text-cyan-700 border-cyan-100' },
    acceptee: { label: 'Acceptée', color: 'bg-emerald-50 text-brand-green border-emerald-100' },
    refusee: { label: 'Refusée', color: 'bg-rose-50 text-brand-red border-rose-100' },
  };

  return (
    <div className="mx-auto max-w-7xl px-2 py-8 sm:px-4 lg:px-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <Link href="/admin" className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 hover:text-brand-blue transition-colors">
            <ArrowLeft className="h-3 w-3" /> Console
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Demandes de Prix</h1>
        </div>
      </div>

      {/* Filter panel */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white border border-slate-200 p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Rechercher par réf, entreprise, contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-brand-blue placeholder:text-slate-400"
          />
          <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
        </div>

        {/* Status Select */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-48 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
          >
            <option value="">Tous les statuts</option>
            {statuses.map((st) => (
              <option key={st.value} value={st.value}>{st.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Requests table list */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-left">
            <thead className="bg-slate-50/50 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Référence</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Entreprise & Pays</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Articles</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => {
                  const config = statusConfig[req.status] || { label: req.status.replace('_', ' '), color: 'bg-slate-50 text-slate-500 border-slate-200' };
                  return (
                    <tr key={req.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-brand-blue">
                        {req.reference}
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-mono">
                        {new Date(req.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{req.company_name}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{req.country}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold">{req.contact_name}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{req.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${config.color}`}>
                          {config.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-600">
                        {req.items.length} {req.items.length > 1 ? 'articles' : 'article'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/demandes/${req.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[10px] font-bold text-slate-800 transition-colors"
                        >
                          Gérer <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    Aucune demande trouvée.
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
