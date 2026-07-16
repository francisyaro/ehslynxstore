'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getStoredRequests, saveStoredRequests, QuoteRequest } from '@/lib/services/mockData';
import { 
  ArrowLeft, 
  User, 
  Building, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  ClipboardList, 
  CheckSquare, 
  Plus, 
  FileText, 
  Send, 
  UserCheck, 
  Check, 
  Phone, 
  Mail,
  Loader2,
  FileSignature,
  Activity,
  Workflow,
  Sparkles,
  Download
} from 'lucide-react';

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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfGenStep, setPdfGenStep] = useState(0);

  const statusList = [
    { value: 'brouillon', label: '1. Brouillon', phase: 'A' },
    { value: 'nouvelle', label: '2. Nouvelle', phase: 'A' },
    { value: 'en_qualification', label: '3. En qualification', phase: 'A' },
    { value: 'informations_requises', label: '4. Infos requises', phase: 'A' },
    { value: 'affectee', label: '5. Affectée', phase: 'A' },
    { value: 'consultation_fournisseur', label: '6. Consult. fournisseur', phase: 'B' },
    { value: 'offre_en_preparation', label: '7. Offre en prép.', phase: 'B' },
    { value: 'devis_transmis', label: '8. Devis transmis', phase: 'C' },
    { value: 'relance_en_cours', label: '9. Relance en cours', phase: 'C' },
    { value: 'acceptee', label: '10. Acceptée', phase: 'C' },
    { value: 'refusee', label: '11. Refusée', phase: 'C' },
    { value: 'convertie_en_commande', label: '12. Commande', phase: 'D' },
    { value: 'cloturee', label: '13. Clôturée', phase: 'D' },
    { value: 'annulee', label: '14. Annulée', phase: 'D' },
  ];

  const salesAgents = [
    { value: 'Yao Koffi', label: 'Yao Koffi (Abidjan)' },
    { value: 'Moussa Diallo', label: 'Moussa Diallo (Dakar)' },
    { value: 'Marc Dubois', label: 'Marc Dubois (Paris)' },
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

    setIsGeneratingPdf(true);
    setPdfGenStep(1);

    setTimeout(() => {
      setPdfGenStep(2);
      setTimeout(() => {
        setPdfGenStep(3);
        setTimeout(() => {
          const oldStatusLabel = statusList.find((s) => s.value === request.status)?.label || request.status;
          
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
                comment: `Statut automatiquement mis à jour de [${oldStatusLabel}] à [8. Devis transmis].`,
                actor: 'Système',
                created_at: new Date().toISOString(),
              },
              ...request.activity_logs,
            ],
          };

          setStatus('devis_transmis');
          updateRequestData(updated, 'Devis PDF généré & envoyé !');
          setIsGeneratingPdf(false);
          setPdfGenStep(0);
        }, 1200);
      }, 1050);
    }, 1050);
  };

  const getWhatsAppLink = () => {
    if (!request) return '';
    const number = request.whatsapp || request.phone || '';
    const cleanNumber = number.replace(/[^0-9]/g, '');
    const text = `Bonjour ${request.contact_name}, Yao Koffi d'EHS LYNX AFRIK. J'ai bien reçu votre demande de devis n° ${request.reference}. Nous étudions votre besoin concernant le matériel de métrologie. Vos coordonnées de livraison sont bien ${request.delivery_location || request.city}. Quel serait votre créneau idéal pour un court échange téléphonique ?`;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  const getEmailLink = () => {
    if (!request) return '';
    const subject = `EHS LYNX AFRIK — Qualification de votre demande de prix ${request.reference}`;
    const body = `Bonjour ${request.contact_name},\n\nJ'accuse bonne réception de votre demande de devis référencée ${request.reference} pour l'entreprise ${request.company_name}.\n\nJe suis en charge de la qualification de votre besoin et je prépare les spécifications de nos solutions.\n\nPour affiner notre offre commerciale, pourriez-vous me préciser :\n- Le secteur d'activité exact lié à ces mesures.\n- Si vous préférez une livraison directe DDP ou en formule CIF.\n\nJe reste à votre entière disposition par retour d'e-mail ou par téléphone.\n\nCordialement,\n\nYao Koffi\nResponsable Commercial Afrique de l'Ouest\nEHS LYNX AFRIK\n+225 01 02 03 04 05`;
    return `mailto:${request.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (!request) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center space-y-4">
        <p className="text-slate-500 text-sm">Chargement ou demande de devis introuvable...</p>
        <Link href="/admin/demandes" className="inline-flex items-center gap-2 text-xs text-brand-blue font-bold hover:underline">
          <ArrowLeft className="h-4 w-4" /> Retourner à la liste
        </Link>
      </div>
    );
  }

  const phases = [
    { id: 'A', name: '1. Qualification', steps: statusList.filter(s => s.phase === 'A') },
    { id: 'B', name: '2. Chiffrage', steps: statusList.filter(s => s.phase === 'B') },
    { id: 'C', name: '3. Proposition', steps: statusList.filter(s => s.phase === 'C') },
    { id: 'D', name: '4. Décision', steps: statusList.filter(s => s.phase === 'D') },
  ];

  const currentPhase = statusList.find(s => s.value === status)?.phase || 'A';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <Link href="/admin/demandes" className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 hover:text-brand-blue transition-colors group">
            <ArrowLeft className="h-3.5 w-3.5 transform group-hover:-translate-x-0.5 transition-transform" /> Retour aux demandes
          </Link>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            Fiche Demande <span className="font-mono text-brand-blue bg-blue-50 border border-blue-100 px-3 py-1 rounded-xl text-lg font-bold shadow-2xs">{request.reference}</span>
          </h1>
        </div>

        {success && (
          <div className="px-4 py-2.5 rounded-xl bg-green-50 border border-green-150 text-xs font-bold text-brand-green flex items-center gap-1.5 animate-pulse shadow-xs">
            <Check className="h-4.5 w-4.5" /> {success}
          </div>
        )}
      </div>

      {/* WORKFLOW PIPELINE stepper (Light theme) */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-5 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-widest text-brand-blue flex items-center gap-2">
            <Workflow className="h-4.5 w-4.5 text-brand-blue" /> Pipeline du Workflow Commercial
          </h2>
          <span className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg font-bold">
            Phase Active : {phases.find(p=>p.id===currentPhase)?.name}
          </span>
        </div>

        {/* Phase-based Workflow visualization */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          {phases.map((ph) => {
            const isPhaseActive = ph.id === currentPhase;
            const isPhasePassed = ph.id.charCodeAt(0) < currentPhase.charCodeAt(0);
            return (
              <div 
                key={ph.id}
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  isPhaseActive 
                    ? 'bg-blue-50/15 border-brand-blue shadow-2xs' 
                    : isPhasePassed
                    ? 'bg-slate-50/50 border-slate-200 opacity-90'
                    : 'bg-slate-50/20 border-slate-100 opacity-50'
                }`}
              >
                <p className={`text-[10px] font-black uppercase tracking-wider mb-2.5 ${
                  isPhaseActive ? 'text-brand-blue' : isPhasePassed ? 'text-brand-green' : 'text-slate-400'
                }`}>
                  {ph.name}
                </p>
                <div className="space-y-1.5">
                  {ph.steps.map((st) => {
                    const isStepActive = st.value === status;
                    return (
                      <button
                        key={st.value}
                        onClick={() => handleStatusChange(st.value)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-between ${
                          isStepActive
                            ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/30 shadow-2xs'
                            : 'text-slate-500 hover:text-brand-blue hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{st.label.substring(3)}</span>
                        {isStepActive && <span className="h-1.5 w-1.5 rounded-full bg-brand-blue shadow-[0_0_4px_rgba(18,67,140,0.5)]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main content columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Details & Items */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Client & Org Info Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xs">
            
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-brand-blue uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3.5">
                <Building className="h-4 w-4 text-brand-blue" /> Informations Entreprise
              </h2>
              <div className="space-y-2 text-xs">
                <p className="text-slate-900 font-extrabold text-sm tracking-wide">{request.company_name}</p>
                <p className="text-slate-650 flex items-center gap-1.5">
                  <span className="text-slate-400 font-bold">Secteur :</span> {request.sector || 'Non renseigné'}
                </p>
                <p className="text-slate-650 flex items-start gap-1.5">
                  <span className="text-slate-400 font-bold shrink-0">Livraison :</span> 
                  <span className="leading-tight">{request.delivery_location || `${request.city}, ${request.country}`}</span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-brand-blue uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3.5">
                <User className="h-4 w-4 text-brand-blue" /> Contact Principal
              </h2>
              <div className="space-y-2 text-xs">
                <p className="text-slate-900 font-extrabold text-sm tracking-wide">{request.contact_name}</p>
                <p className="text-slate-650">
                  <span className="text-slate-400 font-bold">Fonction :</span> {request.job_title || 'Non renseignée'}
                </p>
                <p className="text-slate-650 flex items-center gap-1.5">
                  <span className="text-slate-400 font-bold">E-mail :</span> 
                  <a href={`mailto:${request.email}`} className="text-brand-blue hover:underline font-semibold">{request.email}</a>
                </p>
                <p className="text-slate-655">
                  <span className="text-slate-400 font-bold">Téléphone :</span> {request.phone}
                </p>
              </div>
            </div>

          </div>

          {/* Quick Communication Tool Panel */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
            <h2 className="text-[10px] font-black text-brand-blue uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3.5">
              <Phone className="h-4 w-4 text-brand-green" /> Actions de Contact Commercial Direct
            </h2>
            <p className="text-xs text-slate-500">
              Utilisez ces raccourcis pré-remplis pour contacter directement le prospect afin de qualifier son besoin ou clarifier sa demande :
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-50 border border-green-200 text-brand-green hover:bg-green-100/50 text-xs font-bold transition-all shadow-2xs"
              >
                <MessageSquare className="h-4 w-4" /> Contacter par WhatsApp
              </a>
              <a
                href={getEmailLink()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-brand-blue hover:bg-blue-100/50 text-xs font-bold transition-all shadow-2xs"
              >
                <Mail className="h-4 w-4" /> Envoyer un E-mail Qualif.
              </a>
            </div>
          </div>

          {/* Delivery & Logistics */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
            <h2 className="text-[10px] font-black text-brand-blue uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3.5">
              <Calendar className="h-4 w-4 text-brand-blue" /> Logistique & Exigences
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[9px] text-slate-450 uppercase tracking-wider block font-bold">Délai de livraison souhaité</span>
                <span className="text-slate-700 font-bold">{request.desired_delivery_date ? new Date(request.desired_delivery_date).toLocaleDateString('fr-FR') : 'Non spécifié'}</span>
              </div>
              <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[9px] text-slate-455 uppercase tracking-wider block font-bold">Canal privilégié de réponse</span>
                <span className="px-2.5 py-0.5 rounded bg-blue-50 border border-blue-100 text-brand-blue text-[9px] uppercase font-black tracking-widest inline-block mt-1">{request.preferred_contact_channel}</span>
              </div>
            </div>
            {request.general_comment && (
              <div className="pt-2 border-t border-slate-100 text-xs">
                <span className="text-[9px] text-slate-450 uppercase tracking-wider block font-bold mb-1.5">Commentaire général client</span>
                <p className="text-slate-650 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{request.general_comment}</p>
              </div>
            )}
          </div>

          {/* Items requested */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
            <h2 className="text-[10px] font-black text-brand-blue uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3.5">
              <ClipboardList className="h-4 w-4 text-brand-blue" /> Spécifications Articles demandés
            </h2>

            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="min-w-full divide-y divide-slate-100 text-left">
                <thead className="bg-slate-50 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3.5">Marque / Modèle</th>
                    <th className="px-4 py-3.5">Désignation</th>
                    <th className="px-4 py-3.5">Configuration Optionnelle</th>
                    <th className="px-4 py-3.5 text-center">Quantité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {request.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3.5">
                        <span className="font-extrabold text-slate-900 block">{item.product_brand}</span>
                        <span className="text-[10px] font-mono text-brand-blue font-bold">{item.product_model}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-800">{item.product_name}</div>
                        {item.comment && (
                          <div className="text-[10px] text-slate-500 mt-1 italic">Note client : {item.comment}</div>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600">
                        {item.configuration}
                      </td>
                      <td className="px-4 py-3.5 text-center font-black text-slate-800 text-sm">
                        {item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Workflow update, simulated PDF, logs history */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Status & assignment configuration panel */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
            <h2 className="text-[10px] font-black text-brand-blue uppercase tracking-widest border-b border-slate-100 pb-3.5">
              Paramètres Dossier Commercial
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Commercial Assigné</label>
                <div className="relative">
                  <select
                    value={assignedTo}
                    onChange={(e) => handleAssigneeChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-bold focus:outline-none focus:bg-white focus:border-brand-blue cursor-pointer"
                  >
                    <option value="">Non assigné (Libre)</option>
                    {salesAgents.map((a) => (
                      <option key={a.value} value={a.value}>{a.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PDF Quotation generator simulation button */}
              {(request.status === 'nouvelle' || request.status === 'en_qualification' || request.status === 'affectee') && (
                <div className="pt-2">
                  <button
                    onClick={handleTransmitQuote}
                    disabled={isGeneratingPdf}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-brand-blue hover:bg-blue-750 text-white text-xs shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingPdf ? (
                      <>
                        <Loader2 className="h-4.5 w-4.5 animate-spin text-white" />
                        <span>
                          {pdfGenStep === 1 && "Calcul des spécifications..."}
                          {pdfGenStep === 2 && "Génération du PDF commercial..."}
                          {pdfGenStep === 3 && "Envoi de l'e-mail de devis..."}
                        </span>
                      </>
                    ) : (
                      <>
                        <FileSignature className="h-4.5 w-4.5 shrink-0" />
                        <span>Générer & Transmettre Devis PDF</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Interactive PDF quote preview */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
            <h2 className="text-[10px] font-black text-brand-blue uppercase tracking-widest border-b border-slate-100 pb-3.5 flex items-center justify-between">
              <span>Aperçu du Devis de Vente</span>
              <span className="text-[9px] text-brand-green font-bold flex items-center gap-0.5"><Sparkles className="h-3 w-3" /> Fictif</span>
            </h2>

            <div className="bg-white text-slate-900 p-4 rounded-xl border border-slate-200 text-[10px] space-y-3 font-mono overflow-y-auto max-h-[360px] shadow-inner">
              <div className="flex justify-between items-start border-b border-slate-200 pb-2">
                <div>
                  <p className="font-extrabold text-slate-900 text-xs">EHS LYNX AFRIK</p>
                  <p className="text-[8px] text-slate-500">Hygiène & Métrologie</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-blue">DEVIS COMM.</p>
                  <p className="text-[8px] text-slate-500">Ref: {request.reference}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p><span className="text-slate-500">Date :</span> {new Date(request.created_at).toLocaleDateString('fr-FR')}</p>
                <p><span className="text-slate-500">Client :</span> {request.company_name}</p>
                <p><span className="text-slate-500">Contact :</span> {request.contact_name} ({request.country})</p>
              </div>

              <div className="border-t border-b border-slate-250 py-2 space-y-1.5">
                {request.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-[9px] gap-2 border-b border-dashed border-slate-100 last:border-b-0 pb-1 last:pb-0">
                    <div className="flex-1">
                      <p className="font-extrabold">{item.product_brand} - {item.product_model}</p>
                      <p className="text-[8px] text-slate-500 leading-none">{item.configuration}</p>
                    </div>
                    <p className="font-bold whitespace-nowrap">x{item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="text-[8px] text-slate-500 space-y-1">
                <p>• Conditions : Réglement à 100% à la livraison.</p>
                <p>• Devise de facturation : EUR / XOF (simulation).</p>
                <p>• Validité commerciale : 30 jours à dater de l'émission.</p>
              </div>

              <div className="pt-2 flex justify-between items-center text-slate-400 border-t border-slate-150">
                <span className="text-[8px] italic">EHS LYNX SYSTEM v0.1</span>
                <span className="text-[8px] font-bold text-slate-700">Signature officielle</span>
              </div>
            </div>
            
            <button 
              onClick={() => alert("Simulation : Fichier PDF généré en local et téléchargé.")}
              className="w-full flex items-center justify-center gap-1 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Télécharger Copie PDF
            </button>
          </div>

          {/* Activity Logs Timeline */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-xs">
            <h2 className="text-[10px] font-black text-brand-blue uppercase tracking-widest border-b border-slate-100 pb-3.5 flex items-center gap-2">
              <Activity className="h-4.5 w-4.5 text-brand-blue" /> Journal d'Activité Interne
            </h2>

            {/* Form to add note */}
            <form onSubmit={handleAddCustomLog} className="space-y-3.5">
              <div className="flex gap-2">
                <select
                  value={newLogAction}
                  onChange={(e) => setNewLogAction(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-650 font-bold focus:outline-none focus:bg-white focus:border-brand-blue cursor-pointer"
                >
                  <option value="note_interne">Note Interne</option>
                  <option value="relance">Relance effectuée</option>
                  <option value="appel">Échange téléphonique</option>
                  <option value="reunion">Négociation commerciale</option>
                </select>
              </div>
              <div className="relative">
                <textarea
                  rows={2}
                  value={newLogComment}
                  onChange={(e) => setNewLogComment(e.target.value)}
                  placeholder="Inscrire une note commerciale ou compte-rendu d'échange..."
                  className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-brand-blue"
                />
                <button
                  type="submit"
                  className="absolute right-2 bottom-3 p-1.5 bg-brand-blue hover:bg-blue-750 text-white rounded-lg transition-colors"
                  title="Ajouter au journal"
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
                          <span className="h-8 w-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center ring-4 ring-white shadow-2xs">
                            <MessageSquare className="h-3.5 w-3.5 text-brand-blue" />
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 pt-1">
                          <div className="text-xs text-slate-600 leading-normal">
                            <p className="font-semibold text-slate-800">{log.comment}</p>
                            <p className="text-[9px] text-slate-450 mt-1 flex items-center gap-1.5">
                              <span className="font-bold text-slate-600">Par : {log.actor}</span>
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
