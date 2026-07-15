'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, Check, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Quels sont vos délais de livraison en Afrique ?',
      a: 'Pour les équipements en stock, le délai de livraison est généralement de 3 à 7 jours ouvrables. Pour les matériels sur commande (comme le QuantiFit2 ou des configurations spécifiques de SV 977D), le délai varie entre 3 et 5 semaines selon le plan de production du constructeur. Nous assurons le dédouanement et le transport.'
    },
    {
      q: 'Vos équipements sont-ils livrés avec des certificats d\'étalonnage ?',
      a: 'Oui, tous nos équipements de mesure (sonomètres Svantek, pompes Sensidyne, etc.) sont fournis avec leur certificat d\'étalonnage d\'usine d\'origine. Nous proposons également, en option, des certificats d\'étalonnage raccordés COFRAC/ISO 17025.'
    },
    {
      q: 'Assurez-vous la maintenance et le calibrage en Afrique ?',
      a: 'Absolument. EHS LYNX AFRIK dispose d\'un laboratoire technique basé à Abidjan pour réaliser la maintenance de premier niveau, les vérifications périodiques d\'étalonnage et le remplacement des capteurs ou consommables d\'origine.'
    },
    {
      q: 'Vos appareils disposent-ils d\'homologations ATEX / sécurité intrinsèque ?',
      a: 'Oui, une large gamme de nos équipements (notamment les dosimètres SV 104A et les pompes GilAir Plus) est certifiée Intrinsèquement Sûre (ATEX Zone 0/1, IECEx, MSHA) pour une utilisation sécurisée en mine souterraine ou en site pétrochimique.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-slate-950 py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-[30%] right-[-10%] w-96 h-96 bg-cyan-950/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h1 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Assistance Client</h1>
          <p className="text-4xl font-extrabold text-white tracking-tight">
            Contactez un Expert Métier
          </p>
          <p className="text-slate-400 text-sm">
            Vous avez un projet ou besoin de spécifications sur un instrument ? Nos ingénieurs HSE vous répondent.
          </p>
        </div>

        {/* 2-Column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Coordinates & FAQ */}
          <div className="lg:col-span-6 space-y-12">
            {/* Coordinates */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Bureau Principal Afrique</h2>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Adresse</h3>
                    <p className="text-xs text-slate-300 mt-1">Zone Industrielle Vridi, Abidjan, Côte d\'Ivoire</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Téléphones</h3>
                    <p className="text-xs text-slate-300 mt-1">+225 07 00 00 00 00 (Service Client)</p>
                    <p className="text-xs text-slate-500">+225 21 00 00 00 (Standard)</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">E-mails</h3>
                    <p className="text-xs text-slate-300 mt-1">contact@ehslynxafrik.com (Général)</p>
                    <p className="text-xs text-slate-500">sales@ehslynxafrik.com (Service Devis)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                <HelpCircle className="h-5 w-5 text-cyan-400" /> FAQ Commerciale & Technique
              </h2>

              <div className="divide-y divide-slate-900 border-t border-b border-slate-900">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                      className="w-full flex justify-between items-center text-left text-xs font-bold text-slate-200 hover:text-cyan-400 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="text-cyan-400 text-lg font-mono ml-2">
                        {faqOpen === idx ? '-' : '+'}
                      </span>
                    </button>
                    {faqOpen === idx && (
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-2.5 pl-1.5 border-l border-slate-800">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6 border border-slate-900 bg-slate-900/10 p-6 rounded-3xl backdrop-blur-md relative">
            <h2 className="text-lg font-bold text-white mb-4">Envoyer un message</h2>
            <p className="text-xs text-slate-400 mb-6">
              Remplissez ce formulaire et notre équipe technique vous contactera dans les plus brefs délais.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {submitted && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400 flex items-center gap-2">
                  <Check className="h-4 w-4" /> Message envoyé avec succès. Nous vous répondrons sous peu.
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Votre nom complet *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : M. KOFFI Yao"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">E-mail de contact *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="adresse@mail.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Téléphone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex : +225 05..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Votre Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre besoin technique ou projet d'acquisition d'équipements..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 text-xs shadow-lg shadow-cyan-500/10 transition-colors"
                >
                  <Send className="h-4 w-4" /> Envoyer le message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
