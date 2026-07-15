'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getStoredRequests, saveStoredRequests, QuoteRequest } from '@/lib/services/mockData';
import { ArrowLeft, User, Building, MapPin, Calendar, MessageSquare, ClipboardList, CheckSquare, Plus, FileText, Send, UserCheck, Check } from 'lucide-react';

interface RequestDetailClientProps {
  id: string;
}

export default function RequestDetailClient({ id }: RequestDetailClientProps) {
  const router = useRouter();
  const [request, setRequest] = useState<QuoteRequest | null>(null);
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [newLogComment, setNewLogComment] = useState('');
  const [newLogAction, setNewLogAction] = useState('note_interne');
  const [success, setSuccess] = useState('');

  const statusList = [
    { value: 'brouillon', label: '1. Brouillon' },
    { value: 'nouvelle', label: '2. Nouvelle' },
    { value: 'en_qualification', label: '3. En qualification' },
    { value: 'informations_requises', label: '4. Informations requises' },
    { value: 'affectee', label: '5. Affectée' },
    { value: 'consultation_fournisseur', label: '6. Consultation fournisseur' },
    { value: 'offre_en_preparation', label: '7. Offre en préparation' },
    { value: 'devis_transmis', label: '8. Devis transmis' },
    { value: 'relance_en_cours', label: '9. Relance en cours' },
    { value: 'acceptee', label: '10. Acceptée' },
    { value: 'refusee', label: '11. Refusée' },
    { value: 'convertie_en_commande', label: '12. Convertie en commande' },
    { value: 'cloturee', label: '13. Clôturée' },
    { value: 'annulee', label: '14. Annulée' },
  ];

  const salesAgents = [
    { value: 'Yao Koffi', label: 'Yao Koffi (Abidjan)' },
    { value: 'Moussa Diallo', label: 'Moussa Diallo (Dakar)' },
    { value: 'Marc Dubois', label: 'Marc Dubois (Paris - Référent)' },
  ];

  useEffect(() => {
    const list = getStoredRequests();
    const found = list.find((r) => r.id === id || r.reference === id);
    if (found) {
      setRequest(found);
      setStatus(found.status);
      setAssignedTo(found.assigned_to || '');
    }
  }, [id]);

  const updateRequestData = (updated: QuoteRequest, comment: string) => {
    const list = getStoredRequests();
    const idx = list.findIndex((r) => r.id === updated.id);
    if (idx > -1) {
      list[idx] = updated;
      saveStoredRequests(list);
      setRequest(updated);
      setSuccess(comment);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleStatusChange = (newStatus: string) => {
    if (!request) return;

    const oldStatusLabel = statusList.find((s) => s.value === request.status)?.label || request.status;
    const newStatusLabel = statusList.find((s) => s.value === newStatus)?.label || newStatus;

    const updated: QuoteRequest = {
      ...request,
      status: newStatus,
      updated_at: new Date().toISOString(),
      activity_logs: [
        {
          id: Math.random().toString(36).substring(2, 9),
          action: 'changement_statut',
          comment: `Statut modifié de [${oldStatusLabel}] à [${newStatusLabel}].`,
          actor: 'Administrateur',
          created_at: new Date().toISOString(),
        },
        ...request.activity_logs,
      ],
    };

    setStatus(newStatus);
    updateRequestData(updated, 'Statut mis à jour avec succès');
  };

  const handleAssigneeChange = (newAgent: string) => {
    if (!request) return;

    const updated: QuoteRequest = {
      ...request,
      assigned_to: newAgent,
      updated_at: new Date().toISOString(),
      activity_logs: [
        {
          id: Math.random().toString(36).substring(2, 9),
          action: 'affectation',
          comment: newAgent ? `Demande affectée au commercial : ${newAgent}.` : 'Affectation retirée.',
          actor: 'Administrateur',
          created_at: new Date().toISOString(),
        },
        ...request.activity_logs,
      ],
    };

    setAssignedTo(newAgent);
    updateRequestData(updated, 'Affectation commerciale mise à jour');
  };

  const handleAddCustomLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request || !newLogComment.trim()) return;

    const updated: QuoteRequest = {
      ...request,
      updated_at: new Date().toISOString(),
      activity_logs: [
        {
          id: Math.random().toString(36).substring(2, 9),
          action: newLogAction,
          comment: newLogComment.trim(),
          actor: 'Administrateur',
          created_at: new Date().toISOString(),
        },
        ...request.activity_logs,
      ],
    };

    setNewLogComment('');
    updateRequestData(updated, 'Note ajoutée à l\'historique');
  };

  const handleTransmitQuote = () => {
    if (!request) return;

    const updated: QuoteRequest = {
      ...request,
      status: 'devis_transmis',
      updated_at: new Date().toISOString(),
      activity_logs: [
        {
          id: Math.random().toString(36).substring(2, 9),
          action: 'envoi_devis',
          comment: `Simulation : Devis commercial PDF généré et transmis à ${request.email}.`,
          actor: 'Service Commercial',
          created_at: new Date().toISOString(),
        },
        {
          id: Math.random().toString(36).substring(2, 9),
          action: 'changement_statut',
          comment: `Statut modifié de [Nouvelle] à [Devis transmis].`,
          actor: 'Système',
          created_at: new Date().toISOString(),
        },
        ...request.activity_logs,
      ],
    };

    setStatus('devis_transmis');
    updateRequestData(updated, 'Devis PDF généré & envoyé (Simulation)');
  };

  if (!request) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center space-y-4">
        <p className="text-slate-400 text-sm">Chargement ou demande de prix introuvable...</p>
        <Link href="/admin/demandes" className="inline-flex items-center gap-2 text-xs text-cyan-400 font-bold hover:underline">
          <ArrowLeft className="h-4 w-4" /> Retourner à la liste
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-8 sm:px-4 lg:px-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <Link href="/admin/demandes" className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 hover:text-brand-blue transition-colors">
            <ArrowLeft className="h-3 w-3" /> Retour aux demandes
          </Link>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            Fiche Demande <span className="font-mono text-brand-blue">{request.reference}</span>
          </h1>
        </div>

        {success && (
          <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-xs font-bold text-brand-green flex items-center gap-1.5 animate-pulse">
            <Check className="h-4 w-4" /> {success}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Client information and items list */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Client & Org Info */}
          <div className="border border-slate-200 bg-white p-6 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Building className="h-4 w-4 text-brand-blue" /> Entreprise
              </h2>
              <div className="space-y-1 text-xs">
                <p className="text-slate-900 font-extrabold text-sm">{request.company_name}</p>
                <p className="text-slate-600">Secteur : {request.sector || 'Non renseigné'}</p>
                <p className="text-slate-600">Lieu de livraison : {request.delivery_location || `${request.city}, ${request.country}`}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <User className="h-4 w-4 text-brand-blue" /> Contact Client
              </h2>
              <div className="space-y-1 text-xs">
                <p className="text-slate-900 font-extrabold text-sm">{request.contact_name}</p>
                <p className="text-slate-600">Fonction : {request.job_title || 'Non renseignée'}</p>
                <p className="text-slate-600">E-mail : {request.email}</p>
                <p className="text-slate-600">Téléphone : {request.phone}</p>
                {request.whatsapp && <p className="text-slate-600">WhatsApp : {request.whatsapp}</p>}
              </div>
            </div>
          </div>

          {/* Delivery & Logistics */}
          <div className="border border-slate-200 bg-white p-6 rounded-3xl space-y-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Calendar className="h-4 w-4 text-brand-blue" /> Logistique & Commentaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Délai de livraison souhaité</span>
                <span className="text-slate-800 font-semibold">{request.desired_delivery_date ? new Date(request.desired_delivery_date).toLocaleDateString('fr-FR') : 'Non spécifié'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Canal privilégié de réponse</span>
                <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-700 text-[10px] uppercase font-bold tracking-wider inline-block mt-0.5">{request.preferred_contact_channel}</span>
              </div>
            </div>
            {request.general_comment && (
              <div className="pt-2 border-t border-slate-100 text-xs">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold mb-1">Commentaire client</span>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">{request.general_comment}</p>
              </div>
            )}
          </div>

          {/* Items requested */}
          <div className="border border-slate-200 bg-white p-6 rounded-3xl space-y-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <ClipboardList className="h-4 w-4 text-brand-blue" /> Spécifications Articles commandés
            </h2>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="min-w-full divide-y divide-slate-100 text-left">
                <thead className="bg-slate-50 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Marque / Modèle</th>
                    <th className="px-4 py-3">Désignation</th>
                    <th className="px-4 py-3">Configuration</th>
                    <th className="px-4 py-3 text-center">Quantité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {request.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-bold text-slate-900 block">{item.product_brand}</span>
                        <span className="text-[10px] font-mono text-brand-blue font-bold">{item.product_model}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">{item.product_name}</div>
                        {item.comment && (
                          <div className="text-[10px] text-slate-500 mt-1 italic">Note client : {item.comment}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {item.configuration}
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-slate-900">
                        {item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Workflow status and logs history */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status and assignee update */}
          <div className="border border-slate-200 bg-white p-6 rounded-3xl space-y-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest border-b border-slate-100 pb-2">
              Statut du Workflow
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Statut commercial (14 étapes)</label>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-blue font-semibold"
                >
                  {statusList.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Commercial assigné</label>
                <select
                  value={assignedTo}
                  onChange={(e) => handleAssigneeChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                >
                  <option value="">Non assigné</option>
                  {salesAgents.map((a) => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
              </div>

              {/* Action Button: Simulate Quote sending */}
              {request.status === 'nouvelle' && (
                <button
                  onClick={handleTransmitQuote}
                  className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 text-xs shadow-lg shadow-cyan-500/10 transition-colors"
                >
                  <FileText className="h-4 w-4 shrink-0" />
                  Transmettre Devis PDF
                </button>
              )}
            </div>
          </div>

          {/* Activity Logs (Timeline) */}
          <div className="border border-slate-200 bg-white p-6 rounded-3xl space-y-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <CheckSquare className="h-4 w-4 text-brand-blue" /> Historique d'Activité
            </h2>

            {/* Form to add note */}
            <form onSubmit={handleAddCustomLog} className="space-y-3">
              <div className="flex gap-2">
                <select
                  value={newLogAction}
                  onChange={(e) => setNewLogAction(e.target.value)}
                  className="px-2 py-1 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-700 focus:outline-none focus:border-brand-blue"
                >
                  <option value="note_interne">Note Interne</option>
                  <option value="relance">Relance effectuée</option>
                  <option value="appel">Échange téléphonique</option>
                  <option value="reunion">Réunion / Négociation</option>
                </select>
              </div>
              <div className="relative">
                <textarea
                  rows={2}
                  value={newLogComment}
                  onChange={(e) => setNewLogComment(e.target.value)}
                  placeholder="Écrire une note ou consigne de suivi..."
                  className="w-full pl-3 pr-10 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-blue"
                />
                <button
                  type="submit"
                  className="absolute right-2 bottom-3 p-1.5 bg-brand-blue hover:bg-blue-700 text-white rounded-lg transition-colors"
                  title="Ajouter"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </form>

            {/* Timeline */}
            <div className="flow-root">
              <ul className="-mb-8">
                {request.activity_logs.map((log, idx) => (
                  <li key={log.id}>
                    <div className="relative pb-8">
                      {idx !== request.activity_logs.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-100" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center ring-8 ring-white">
                            <MessageSquare className="h-3.5 w-3.5 text-brand-blue" />
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 pt-1.5">
                          <div className="text-xs text-slate-700 leading-normal">
                            <p className="font-semibold text-slate-900">{log.comment}</p>
                            <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1.5">
                              <span>Par : {log.actor}</span>
                              <span>&bull;</span>
                              <span>{new Date(log.created_at).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
