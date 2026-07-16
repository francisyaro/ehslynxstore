'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getStoredRequests, QuoteRequest } from '@/lib/services/mockData';
import { CheckCircle2, MessageSquare, Mail, Home, ArrowRight, ClipboardCheck } from 'lucide-react';

export default function ConfirmationDemandePage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-md px-4 py-24 text-center space-y-4">
        <p className="text-slate-400 text-sm">Chargement de la confirmation...</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const [request, setRequest] = useState<QuoteRequest | null>(null);

  useEffect(() => {
    if (ref) {
      const requests = getStoredRequests();
      const found = requests.find((r) => r.reference === ref);
      if (found) {
        setRequest(found);
      }
    }
  }, [ref]);

  // Target WhatsApp number for MVP (can be changed in env)
  const whatsappNumber = '2250700000000'; // ex: +225 07 00 00 00 00

  const getWhatsAppLink = () => {
    if (!request) return '#';
    
    let text = `Bonjour EHS LYNX AFRIK,\n\nJe souhaite recevoir une offre de prix pour :\n`;
    
    request.items.forEach((item, index) => {
      text += `${index + 1}. ${item.product_brand} — ${item.product_model} — Quantité : ${item.quantity}\n`;
      if (item.configuration && item.configuration !== 'Standard') {
        text += `   Option : ${item.configuration}\n`;
      }
      if (item.comment) {
        text += `   Commentaire : ${item.comment}\n`;
      }
    });

    text += `\nEntreprise : ${request.company_name}\n`;
    text += `Pays : ${request.country}\n`;
    text += `Contact : ${request.phone}\n`;
    text += `E-mail : ${request.email}\n`;
    text += `Référence : ${request.reference}`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const getMailtoLink = () => {
    if (!request) return '#';

    const subject = `Demande de prix - ${request.reference} - ${request.company_name}`;
    let body = `Bonjour EHS LYNX AFRIK,\n\nJe souhaite recevoir une offre de prix pour :\n\n`;

    request.items.forEach((item, index) => {
      body += `${index + 1}. ${item.product_brand} — ${item.product_model} — Quantité : ${item.quantity}\n`;
      body += `   Configuration : ${item.configuration}\n`;
      if (item.comment) {
        body += `   Commentaire : ${item.comment}\n`;
      }
      body += `\n`;
    });

    body += `Entreprise : ${request.company_name}\n`;
    body += `Pays : ${request.country}\n`;
    body += `Ville : ${request.city}\n`;
    body += `Contact : ${request.phone}\n`;
    body += `E-mail : ${request.email}\n\n`;
    body += `Référence unique de la demande : ${request.reference}\n`;

    return `mailto:sales@ehslynxafrik.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (!ref) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center space-y-4">
        <p className="text-slate-400 text-sm">Référence de demande manquante.</p>
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-cyan-400 font-bold hover:underline">
          <Home className="h-4 w-4" /> Retourner à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 text-center space-y-8">
      {/* Success Banner */}
      <div className="space-y-4">
        <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto animate-bounce" />
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Demande Enregistrée !</h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
          Votre demande de prix a été validée avec succès dans nos systèmes.
        </p>
      </div>

      {/* Reference Card */}
      <div className="border border-slate-900 bg-slate-900/10 p-6 rounded-2xl max-w-md mx-auto space-y-3">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Référence Unique</span>
        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-mono tracking-wider">
          {ref}
        </div>
        <p className="text-[10px] text-slate-500 font-semibold uppercase">À conserver pour vos échanges commerciaux</p>
      </div>

      {/* Actions */}
      <div className="max-w-md mx-auto space-y-4">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Choisissez votre canal d'envoi</h2>
        <p className="text-[11px] text-slate-500">
          Pour accélérer le traitement par nos commerciaux, nous vous invitons à transmettre le récapitulatif par WhatsApp ou e-mail.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs shadow-lg shadow-emerald-500/10 transition-colors"
          >
            <MessageSquare className="h-4 w-4 shrink-0" />
            Envoyer via WhatsApp
          </a>

          <a
            href={getMailtoLink()}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold border border-slate-800 bg-slate-900/30 hover:bg-slate-900 text-slate-200 text-xs transition-colors"
          >
            <Mail className="h-4 w-4 shrink-0" />
            Envoyer par E-mail
          </a>
        </div>
      </div>

      {/* Steps checklist */}
      <div className="max-w-md mx-auto border-t border-slate-900 pt-8 space-y-4 text-left">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <ClipboardCheck className="h-4 w-4 text-cyan-400" /> Prochaines étapes
        </h3>
        
        <div className="space-y-3 text-xs text-slate-400">
          <div className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-cyan-400">1</span>
            <p className="leading-tight">Notre service de cotation étudie la faisabilité technique de votre configuration.</p>
          </div>
          <div className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-cyan-400">2</span>
            <p className="leading-tight">Un ingénieur d'affaires qualifie la demande et prend contact si des informations complémentaires sont requises.</p>
          </div>
          <div className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-cyan-400">3</span>
            <p className="leading-tight">Une offre commerciale formelle vous est adressée sous format PDF par e-mail sous 24-48 heures.</p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-white font-bold transition-colors"
        >
          Retourner à la page d'accueil <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
