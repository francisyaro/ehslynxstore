'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { generateRFQReference, getStoredRequests, saveStoredRequests, QuoteRequest } from '@/lib/services/mockData';
import { FileText, Trash2, Plus, Minus, Send, ArrowLeft, Building2, MapPin, Phone, Mail, User } from 'lucide-react';

export default function DemandeDePrixPage() {
  const { cart, updateQuantity, updateItemDetails, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  // Contact States
  const [contactName, setContactName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');

  // Organization States
  const [companyName, setCompanyName] = useState('');
  const [sector, setSector] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  // Delivery States
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [desiredDeliveryDate, setDesiredDeliveryDate] = useState('');
  const [generalComment, setGeneralComment] = useState('');
  const [preferredContactChannel, setPreferredContactChannel] = useState<'formulaire' | 'whatsapp' | 'email'>('whatsapp');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sectors = [
    'Mines & Carrières',
    'Énergie, Pétrole & Gaz',
    'BTP & Infrastructures',
    'Chimie & Métallurgie',
    'Agroalimentaire & Manufacture',
    'Cabinet de Conseil & Expertise HSE',
    'Laboratoire & Recherche',
    'Institutionnel / Public'
  ];

  const countries = [
    'Côte d\'Ivoire',
    'Sénégal',
    'Cameroun',
    'Gabon',
    'Mali',
    'Guinée',
    'Togo',
    'Bénin',
    'Burkina Faso',
    'Rép. Démocratique du Congo'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError('Votre sélection est vide.');
      return;
    }

    if (!contactName || !email || !phone || !companyName || !country) {
      setError('Veuillez remplir les champs obligatoires (*).');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const reference = generateRFQReference();
      const newRequest: QuoteRequest = {
        id: Math.random().toString(36).substring(2, 9),
        reference,
        contact_name: contactName,
        job_title: jobTitle,
        phone,
        whatsapp: whatsapp || phone,
        email,
        company_name: companyName,
        sector,
        country,
        city,
        delivery_location: deliveryLocation || city,
        desired_delivery_date: desiredDeliveryDate,
        preferred_contact_channel: preferredContactChannel,
        general_comment: generalComment,
        status: 'nouvelle',
        currency: 'XOF',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        items: cart.map((item) => ({
          id: Math.random().toString(36).substring(2, 9),
          product_id: item.product.id,
          product_name: item.product.name,
          product_brand: item.product.brand_id.replace('brand-', '').toUpperCase(),
          product_model: item.product.model,
          quantity: item.quantity,
          configuration: item.configuration,
          comment: item.comment,
        })),
        activity_logs: [
          {
            id: Math.random().toString(36).substring(2, 9),
            action: 'creation',
            comment: 'Demande créée par le client via le formulaire web.',
            actor: contactName,
            created_at: new Date().toISOString(),
          },
        ],
      };

      // Save request to mock database
      const existingRequests = getStoredRequests();
      saveStoredRequests([newRequest, ...existingRequests]);

      // Clear Cart selection
      clearCart();

      // Redirect to confirmation page
      router.push(`/confirmation-demande?ref=${reference}`);
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue lors de l\'enregistrement de votre demande.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
          <FileText className="h-8 w-8 text-cyan-400" /> Panier de Demande
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Validez les produits de votre liste et soumettez votre demande pour recevoir un chiffrage personnalisé sous 24-48h.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-900 rounded-3xl space-y-4">
          <FileText className="h-12 w-12 text-slate-700 mx-auto" />
          <p className="text-slate-400 text-sm">Votre sélection de demande de prix est vide.</p>
          <div className="pt-2">
            <Link
              href="/produits"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs shadow-lg shadow-cyan-500/10 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Retourner au catalogue
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel: List of selected items */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border border-slate-900 bg-slate-900/10 p-5 rounded-2xl space-y-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-3">
                Produits Sélectionnés ({cart.length})
              </h2>

              <div className="divide-y divide-slate-900">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
                          {item.product.model}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase">
                          {item.product.brand_id.replace('brand-', '').toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-white">{item.product.name}</h3>

                      {/* Config & Note */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <div className="space-y-0.5">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Déclinaison</span>
                          <input
                            type="text"
                            value={item.configuration}
                            onChange={(e) => updateItemDetails(item.product.id, e.target.value, item.comment)}
                            className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-900 text-[10px] text-slate-300 focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Note / Consigne</span>
                          <input
                            type="text"
                            placeholder="Optionnel..."
                            value={item.comment}
                            onChange={(e) => updateItemDetails(item.product.id, item.configuration, e.target.value)}
                            className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-900 text-[10px] text-slate-300 focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex sm:flex-col items-center justify-between sm:justify-center sm:items-end gap-3 shrink-0">
                      <div className="flex items-center bg-slate-950 border border-slate-900 rounded-lg overflow-hidden h-8">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 text-slate-400 hover:text-white"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-200">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 text-slate-400 hover:text-white"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 hover:bg-slate-900 text-slate-500 hover:text-rose-400 rounded-lg transition-colors"
                        title="Retirer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: Contact & Delivery Form */}
          <div className="lg:col-span-5">
            <form onSubmit={handleSubmit} className="border border-slate-900 bg-slate-900/20 p-6 rounded-3xl space-y-6 backdrop-blur-md">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-900 pb-3">
                Informations Commerciales
              </h2>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-bold text-rose-400 animate-pulse">
                  {error}
                </div>
              )}

              {/* Block Contact */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-cyan-400" /> Vos Coordonnées
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Nom & Prénom"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Fonction</label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Ex : Responsable HSE"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Téléphone Mobile *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex : +225 07..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Numéro WhatsApp</label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="Laisser vide si identique"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Email Professionnel *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="adresse@entreprise.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Block Organisation */}
              <div className="space-y-4 pt-2 border-t border-slate-900">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-cyan-400" /> Votre Entreprise
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Raison Sociale *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Nom de l'entreprise"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Secteur d'Activité</label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="">Sélectionner...</option>
                      {sectors.map((sec, idx) => (
                        <option key={idx} value={sec}>{sec}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Pays de livraison *</label>
                    <select
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="">Sélectionner...</option>
                      {countries.map((c, idx) => (
                        <option key={idx} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Ville / Localité</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex : Abidjan"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Block Besoins & Logistique */}
              <div className="space-y-4 pt-2 border-t border-slate-900">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" /> Logistique & Préférences
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Adresse / Port / Mine</label>
                    <input
                      type="text"
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      placeholder="Lieu de livraison exact"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Délai souhaité</label>
                    <input
                      type="date"
                      value={desiredDeliveryDate}
                      onChange={(e) => setDesiredDeliveryDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Commentaires Généraux</label>
                  <textarea
                    rows={2}
                    placeholder="Autres précisions d'acheminement, informations douanières..."
                    value={generalComment}
                    onChange={(e) => setGeneralComment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Canal de contact préféré */}
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Canal de contact privilégié</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 select-none cursor-pointer">
                      <input
                        type="radio"
                        name="channel"
                        checked={preferredContactChannel === 'whatsapp'}
                        onChange={() => setPreferredContactChannel('whatsapp')}
                        className="accent-cyan-500"
                      />
                      WhatsApp
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 select-none cursor-pointer">
                      <input
                        type="radio"
                        name="channel"
                        checked={preferredContactChannel === 'email'}
                        onChange={() => setPreferredContactChannel('email')}
                        className="accent-cyan-500"
                      />
                      E-mail
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 select-none cursor-pointer">
                      <input
                        type="radio"
                        name="channel"
                        checked={preferredContactChannel === 'formulaire'}
                        onChange={() => setPreferredContactChannel('formulaire')}
                        className="accent-cyan-500"
                      />
                      Formulaire Web
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 text-sm shadow-xl shadow-cyan-500/10 hover:scale-[1.01] transition-all disabled:opacity-50"
                >
                  <Send className="h-4 w-4 shrink-0" />
                  {loading ? 'Enregistrement...' : 'Valider ma demande de devis'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
