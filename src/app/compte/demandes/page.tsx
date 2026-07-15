'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredRequests, QuoteRequest } from '@/lib/services/mockData';
import { FileText, Search, ArrowRight, Clock, ShieldAlert, Award } from 'lucide-react';

export default function ClientRequestsPage() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [activeEmail, setActiveEmail] = useState('');
  const [filtered, setFiltered] = useState<QuoteRequest[]>([]);

  useEffect(() => {
    // If user has submitted a request during the session, grab their email from localStorage
    const list = getStoredRequests();
    setRequests(list);
    
    if (list.length > 0) {
      // Prefill with the email from the most recent request
      const recentEmail = list[0].email;
      setEmailInput(recentEmail);
      setActiveEmail(recentEmail);
    }
  }, []);

  useEffect(() => {
    if (activeEmail) {
      const list = requests.filter((r) => r.email.toLowerCase() === activeEmail.toLowerCase());
      setFiltered(list);
    } else {
      setFiltered([]);
    }
  }, [activeEmail, requests]);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveEmail(emailInput.trim());
  };

  const statusConfig: Record<string, { label: string; color: string }> = {
    nouvelle: { label: 'En attente', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    en_qualification: { label: 'Qualification', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    informations_requises: { label: 'Compléments requis', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    devis_transmis: { label: 'Devis disponible', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    acceptee: { label: 'Accepté', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    refusee: { label: 'Décliné', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left border-b border-slate-900 pb-6 space-y-2">
        <h1 className="text-2xl font-black text-white flex items-center justify-center sm:justify-start gap-2">
          <Clock className="h-6 w-6 text-cyan-400" /> Suivi de mes Demandes
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Saisissez votre e-mail professionnel pour accéder à l'historique et suivre l'avancement de vos demandes de devis.
        </p>
      </div>

      {/* Email search form */}
      <form onSubmit={handleFilter} className="flex gap-4 max-w-md items-end bg-slate-900/10 border border-slate-900 p-5 rounded-2xl">
        <div className="space-y-1.5 flex-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">E-mail professionnel</label>
          <input
            type="email"
            required
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="nom@entreprise.com"
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs transition-colors shrink-0"
        >
          Consulter
        </button>
      </form>

      {/* Requests output */}
      {activeEmail ? (
        <div className="space-y-6">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Résultats pour : <span className="text-white font-mono">{activeEmail}</span> ({filtered.length})
          </h2>

          {filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((req) => {
                const config = statusConfig[req.status] || { label: req.status.replace('_', ' '), color: 'bg-slate-900 text-slate-400 border-slate-800' };
                return (
                  <div
                    key={req.id}
                    className="border border-slate-900 bg-slate-950 p-6 rounded-2xl space-y-4"
                  >
                    {/* Top line */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-bold text-cyan-400">{req.reference}</span>
                        <p className="text-xs text-slate-500">Soumise le : {new Date(req.created_at).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${config.color}`}>
                        {config.label}
                      </span>
                    </div>

                    {/* Organization details */}
                    <div className="grid grid-cols-2 gap-4 text-[11px] text-slate-400 border-t border-b border-slate-900 py-3">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Entreprise</span>
                        <span className="text-slate-300 font-semibold">{req.company_name}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Livraison</span>
                        <span className="text-slate-300 font-semibold">{req.city}, {req.country}</span>
                      </div>
                    </div>

                    {/* Items requested */}
                    <div className="space-y-2">
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Articles demandés</span>
                      <ul className="space-y-1.5 text-[11px]">
                        {req.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between text-slate-300">
                            <span>
                              {item.product_brand} {item.product_model} ({item.configuration})
                            </span>
                            <span className="font-bold">x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Message section / Quote PDF download link simulation */}
                    {req.status === 'devis_transmis' && (
                      <div className="mt-4 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 flex flex-col sm:flex-row justify-between items-center gap-3">
                        <div className="text-[11px] text-slate-400 text-center sm:text-left">
                          <span className="text-cyan-400 font-bold block">Votre devis PDF est prêt !</span>
                          Notre commercial a chiffré votre demande. Téléchargez votre offre commerciale formelle.
                        </div>
                        <button className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[10px] font-bold transition-colors">
                          Télécharger Devis PDF
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-slate-900 rounded-3xl text-xs text-slate-500">
              Aucune demande enregistrée sous cette adresse e-mail.
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-slate-900 rounded-3xl text-xs text-slate-500">
          Veuillez renseigner votre e-mail ci-dessus pour consulter l'historique de vos demandes de prix.
        </div>
      )}
    </div>
  );
}
