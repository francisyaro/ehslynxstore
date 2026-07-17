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
  const [showAllFaqs, setShowAllFaqs] = useState(false);

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
    },
    {
      q: 'Comment puis-je obtenir un devis personnalisé ?',
      a: 'Il vous suffit de parcourir notre Store, d\'ajouter les équipements souhaités à votre panier de devis, puis de remplir le formulaire de validation. Nos ingénieurs HSE vous enverront une offre technico-commerciale détaillée sous 24 à 48 heures.'
    },
    {
      q: 'Proposez-vous des formations à l\'utilisation des instruments ?',
      a: 'Oui, à travers la Lynx Academy, nous organisons des sessions de formation théoriques et pratiques sur site ou dans nos locaux pour vos équipes (prise en main des appareils, traitement des données de mesure, et bonnes pratiques HSE).'
    }
  ];

  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 4);

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
    <div className="bg-slate-50 py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-[30%] right-[-10%] w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h1 className="text-xs font-bold uppercase tracking-widest text-brand-blue">Assistance Client</h1>
          <p className="text-4xl font-black text-slate-900 tracking-tight">
            Contactez un Expert Métier
          </p>
          <p className="text-slate-600 text-sm">
            Vous avez un projet ou besoin de spécifications sur un instrument ? Nos ingénieurs HSE vous répondent.
          </p>
        </div>

        {/* 2-Column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Coordinates & FAQ */}
          <div className="lg:col-span-6 space-y-12">
            {/* Coordinates */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Bureau Principal Afrique</h2>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-brand-green text-white shrink-0 shadow-sm shadow-brand-green/10">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Adresse</h3>
                    <p className="text-xs text-slate-800 mt-1 font-semibold">Rue de Saponé, Ouaga 2000, Ouagadougou, Burkina Faso</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-brand-green text-white shrink-0 shadow-sm shadow-brand-green/10">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Téléphones (WhatsApp)</h3>
                    <p className="text-xs text-slate-800 mt-1 font-semibold">00226 05 - 18 - 18 - 81</p>
                    <p className="text-xs text-slate-800 font-semibold">00226 63 - 62 - 71 - 71</p>
                    <p className="text-xs text-slate-800 font-semibold">+1 - 646 - 269  - 8937</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-brand-green text-white shrink-0 shadow-sm shadow-brand-green/10">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">E-mail & Site</h3>
                    <p className="text-xs text-slate-800 mt-1 font-semibold">info@ehslynx.com</p>
                    <p className="text-xs text-slate-550 font-semibold">ehslynxafrik.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Networks */}
            <div className="space-y-4 pt-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2">Suivez-nous sur les Réseaux</h2>
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                <a href="http://www.linkedin.com/in/ehs-lynx-322202225" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-650 hover:text-brand-blue transition-colors">
                  <svg className="h-4.5 w-4.5 text-brand-blue shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
                <a href="http://www.linkedin.com/in/ehs-lynx-322202225" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-650 hover:text-brand-blue transition-colors">
                  <svg className="h-4.5 w-4.5 text-brand-blue shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a href="https://x.com/ehslynx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-650 hover:text-brand-blue transition-colors">
                  <svg className="h-4.5 w-4.5 text-brand-blue shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span>X (Twitter)</span>
                </a>
                <a href="https://www.youtube.com/@EHSLYNX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-655 hover:text-brand-red transition-colors">
                  <svg className="h-4.5 w-4.5 text-brand-red shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                  </svg>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6 border-t-4 border-t-brand-blue border-x border-b border-slate-200 bg-white p-8 rounded-3xl relative shadow-2xl shadow-slate-100/90 transition-shadow hover:shadow-slate-200/90">
            <h2 className="text-xl font-black text-slate-900 tracking-tight mb-2">Envoyer un message</h2>
            <p className="text-xs text-slate-500 mb-6">
              Remplissez ce formulaire et notre équipe technique vous contactera dans les plus brefs délais.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 shadow-sm shadow-emerald-500/5">
                  <Check className="h-4 w-4 text-brand-green shrink-0" />
                  <span>Message envoyé avec succès. Nos experts vous répondront sous peu.</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold block">Votre nom complet *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : M. KOFFI Yao"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 placeholder:text-slate-400 hover:border-slate-300 transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold block">E-mail de contact *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="adresse@mail.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 placeholder:text-slate-400 hover:border-slate-300 transition-all duration-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold block">Téléphone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex : +226 05..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 placeholder:text-slate-400 hover:border-slate-300 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold block">Votre Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre besoin technique ou projet d'acquisition d'équipements..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 hover:border-slate-300 transition-all duration-200"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold bg-brand-blue hover:bg-blue-750 text-white text-xs shadow-lg shadow-brand-blue/15 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer"
                >
                  <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /> Envoyer le message
                </button>
              </div>
            </form>

            <p className="text-[10px] text-slate-400 text-center mt-5 flex items-center justify-center gap-1">
              <svg className="h-3.5 w-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Vos données sont protégées. Envoi sécurisé SSL.
            </p>
          </div>
        </div>

        {/* FAQ Section (Full Width, Centered, style benchmark) */}
        <div className="mt-28 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
              <HelpCircle className="h-6 w-6 text-brand-blue" /> FAQ Commerciale & Technique
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Retrouvez les réponses aux questions les plus fréquentes sur nos instruments, étalonnages et livraisons.
            </p>
          </div>
          
          <div className="space-y-4">
            {visibleFaqs.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center text-left cursor-pointer group"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-slate-800 shrink-0 ml-4 transition-all duration-250 ${
                      isOpen 
                        ? 'bg-brand-green border-brand-green text-white shadow-md shadow-brand-green/20' 
                        : 'bg-slate-50 border-slate-200 group-hover:bg-slate-100 group-hover:border-slate-300'
                    }`}>
                      {isOpen ? (
                        <span className="text-base font-bold leading-none">-</span>
                      ) : (
                        <span className="text-base font-bold leading-none">+</span>
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-650 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Show More Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                setShowAllFaqs(!showAllFaqs);
                setFaqOpen(null); // Close any open FAQ to avoid index mismatches
              }}
              className="px-6 py-2.5 rounded-xl font-bold bg-brand-green hover:bg-green-750 text-white text-xs shadow-md shadow-brand-green/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              {showAllFaqs ? 'Afficher moins' : 'Afficher plus'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
