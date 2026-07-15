import React from 'react';
import Link from 'next/link';
import { BRANDS, CATEGORIES, PRODUCTS } from '@/lib/services/mockData';
import { ArrowRight, Volume2, Wind, Thermometer, UserCheck, ShieldCheck, Award, BookOpen, Share2, HelpCircle, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans">
      
      {/* ------------------------------------------------------------- */}
      {/* SPOTLIGHT 1: SVANTEK SV 971 (Apple Style Hero 1 - Light/Premium) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full min-h-[640px] flex flex-col justify-between items-center text-center py-16 bg-gradient-to-b from-white to-slate-50 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,67,140,0.06),transparent_60%)] pointer-events-none" />
        
        {/* Text Group */}
        <div className="space-y-4 max-w-2xl px-4 z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-green">SVANTEK</p>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 leading-none">
            Noise Monitoring Solutions
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto font-medium">
            Sonomètres de Classe 1 de haute précision et stations connectées de surveillance acoustique pour l\'industrie.
          </p>
          <div className="flex justify-center gap-6 pt-2">
            <Link
              href="/produits?brand=svantek"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-blue hover:text-blue-700 transition-colors group"
            >
              Consulter la gamme <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/demande-de-prix"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-green hover:text-green-700 transition-colors"
            >
              Demander un prix
            </Link>
          </div>
        </div>

        {/* Real Svantek Product Image */}
        <div className="relative mt-8 w-full max-w-lg px-4 flex justify-center z-10">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-brand-blue/5 blur-[65px] pointer-events-none" />
          <img
            src="/products/svantek-noise-monitoring.png"
            alt="SVANTEK Noise Monitoring Solutions"
            className="h-80 w-auto object-contain hover:scale-102 transition-transform duration-500"
          />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SPOTLIGHT 2: SENSIDYNE GilAir Plus (Apple Style Hero 2 - Light Contrast) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full min-h-[640px] flex flex-col justify-between items-center text-center py-16 bg-slate-100 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,130,57,0.06),transparent_60%)] pointer-events-none" />
        
        {/* Text Group */}
        <div className="space-y-4 max-w-2xl px-4 z-10 text-slate-900">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-blue">SENSIDYNE</p>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none text-slate-900">
            Gamme GilAir Plus
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-lg mx-auto font-medium">
            L\'échantillonnage d\'air individuel intelligent. Zéro compromis.
          </p>
          <div className="flex justify-center gap-6 pt-2">
            <Link
              href="/produits/sensidyne/pompe-echantillonnage-gilair-plus"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-blue hover:underline group"
            >
              En savoir plus <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/produits/sensidyne/pompe-echantillonnage-gilair-plus"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-green hover:underline"
            >
              Demander un prix
            </Link>
          </div>
        </div>

        {/* Hardware Showcase */}
        <div className="relative mt-12 w-full max-w-md px-4 flex justify-center z-10">
          {/* Air Pump Device Illustration */}
          <div className="relative w-44 h-60 rounded-3xl border-4 border-slate-200 bg-white p-4 shadow-xl flex flex-col justify-between items-center">
            {/* Screen */}
            <div className="w-full h-20 bg-slate-950 rounded-xl p-2.5 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[7px] text-slate-600 font-bold uppercase">
                <span>GILAIR PLUS</span>
                <span className="text-brand-blue font-black font-mono">FLOW: OK</span>
              </div>
              <div className="text-xl font-bold text-white font-mono text-center my-auto flex items-end justify-center gap-0.5">
                2.000 <span className="text-[9px] text-slate-400">LPM</span>
              </div>
            </div>
            {/* Control buttons */}
            <div className="flex gap-2 w-full justify-center mb-2">
              <div className="h-7 w-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500 font-mono">&larr;</div>
              <div className="h-7 w-7 rounded-full bg-brand-blue flex items-center justify-center text-[8px] font-bold text-white font-mono">ok</div>
              <div className="h-7 w-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500 font-mono">&rarr;</div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SPOTLIGHT 3: SLATESAFETY BAND V2 (Apple Style Hero 3 - Light Gradient) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full min-h-[640px] flex flex-col justify-between items-center text-center py-16 bg-gradient-to-br from-slate-100 via-white to-green-50 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-white/10 pointer-events-none" />
        
        {/* Text Group */}
        <div className="space-y-4 max-w-2xl px-4 z-10 text-slate-900">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-blue">SLATESAFETY</p>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none text-slate-900">
            SlateSafety BAND V2
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-md mx-auto font-medium">
            La biosurveillance connectée en temps réel. Protégez vos équipes du stress thermique.
          </p>
          <div className="flex justify-center gap-6 pt-2">
            <Link
              href="/produits/slatesafety/bracelet-biosurveillance-band-v2"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-blue hover:text-blue-700 transition-colors group"
            >
              En savoir plus <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/produits/slatesafety/bracelet-biosurveillance-band-v2"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-green hover:text-green-700 transition-colors"
            >
              Demander un prix
            </Link>
          </div>
        </div>

        {/* Bracelet Showcase */}
        <div className="relative mt-12 w-full max-w-md px-4 flex justify-center z-10 mb-8">
          {/* Smart Band Visualisation */}
          <div className="relative w-64 h-24 rounded-full border-8 border-slate-200 bg-white flex items-center justify-between px-6 shadow-2xl">
            {/* Glowing Sensor Center */}
            <div className="absolute inset-0 bg-brand-green/5 rounded-full animate-pulse" />
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
              <Thermometer className="h-5 w-5 text-brand-red animate-pulse" />
            </div>
            <div className="text-center font-mono space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">TEMP INTERNE</span>
              <span className="text-base font-black text-slate-900 block">37.2 &deg;C</span>
            </div>
            <div className="h-4 w-4 rounded-full bg-brand-green animate-ping" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2x2 BENTO GRID SECTION (Apple Style Grid of spotlights) */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Bento Box 1: OHD QuantiFit2 (Light Theme) */}
        <div className="relative min-h-[500px] flex flex-col justify-between items-center text-center p-8 bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-slate-100 transition-all">
          <div className="space-y-2 z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-green">OHD</p>
            <h2 className="text-3xl font-extrabold text-slate-900">Fit Testing QuantiFit2</h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Essai d\'ajustement quantitatif des masques en moins de 2 minutes par pression négative.
            </p>
            <div className="flex justify-center gap-4 pt-1">
              <Link href="/produits/ohd/fit-test-quantifit2" className="text-xs font-bold text-brand-blue hover:underline">En savoir plus</Link>
              <Link href="/produits/ohd/fit-test-quantifit2" className="text-xs font-bold text-brand-green hover:underline">Demander un prix</Link>
            </div>
          </div>
          
          <div className="w-full flex justify-center z-10 mt-6">
            <div className="w-48 h-32 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-inner">
              <div className="text-[8px] text-slate-500 font-bold uppercase">OHD PNC TEST</div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-green w-3/4 rounded-full" />
              </div>
              <span className="text-[10px] text-brand-green font-bold">FACTEUR FIT: 10,000+</span>
            </div>
          </div>
        </div>

        {/* Bento Box 2: SVANTEK SV 307 (Light Theme) */}
        <div className="relative min-h-[500px] flex flex-col justify-between items-center text-center p-8 bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-slate-100 transition-all">
          <div className="space-y-2 z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-green">SVANTEK</p>
            <h2 className="text-3xl font-extrabold text-slate-900">Station SV 307</h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Station de surveillance continue du bruit extérieur étanche (IP65) avec modem 4G.
            </p>
            <div className="flex justify-center gap-4 pt-1">
              <Link href="/produits/svantek/station-bruit-outdoor-sv-307" className="text-xs font-bold text-brand-blue hover:underline">En savoir plus</Link>
              <Link href="/produits/svantek/station-bruit-outdoor-sv-307" className="text-xs font-bold text-brand-green hover:underline">Demander un prix</Link>
            </div>
          </div>
          
          <div className="w-full flex justify-center z-10 mt-6">
            <div className="w-28 h-40 bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col justify-between">
              <div className="w-6 h-6 rounded-full bg-brand-green/10 border border-brand-green/30 flex items-center justify-center mx-auto">
                <Volume2 className="h-3 w-3 text-brand-green" />
              </div>
              <div className="h-10 w-full bg-white rounded border border-slate-100" />
            </div>
          </div>
        </div>

        {/* Bento Box 3: Services HSE & Diagnostics (Light Theme) */}
        <div className="relative min-h-[500px] flex flex-col justify-between items-center text-center p-8 bg-slate-100 border border-slate-200 rounded-3xl overflow-hidden transition-all">
          <div className="space-y-2 z-10 text-slate-900">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-blue">SERVICES & CONSEIL</p>
            <h2 className="text-3xl font-extrabold text-slate-900">Ingénierie HSE & Étalonnage</h2>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Calibrage d\'appareils, audits de bruit, diagnostics de ventilation et QAI.
            </p>
            <div className="flex justify-center pt-1">
              <Link href="/services" className="text-xs font-bold text-brand-blue hover:underline">Découvrir nos services</Link>
            </div>
          </div>
          
          <div className="w-full max-w-xs text-left z-10 mt-6 space-y-2.5">
            <div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm border border-slate-200">
              <ShieldCheck className="h-4 w-4 text-brand-green shrink-0" />
              <span className="text-[11px] text-slate-700 font-bold">Étalonnage certifié constructeur</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm border border-slate-200">
              <ShieldCheck className="h-4 w-4 text-brand-green shrink-0" />
              <span className="text-[11px] text-slate-700 font-bold">Diagnostics d\'air et amiante</span>
            </div>
          </div>
        </div>

        {/* Bento Box 4: Lynx Academy (Light Red/Orange Accent Theme) */}
        <div className="relative min-h-[500px] flex flex-col justify-between items-center text-center p-8 bg-gradient-to-br from-red-50 to-orange-50 border border-brand-red/20 rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-slate-100 transition-all">
          <div className="space-y-2 z-10 text-slate-900">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-red">FORMATION PROFESSIONNELLE</p>
            <h2 className="text-3xl font-extrabold text-slate-900">Lynx Academy</h2>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Ateliers et formations certifiantes à la métrologie et à la prévention des expositions.
            </p>
            <div className="flex justify-center pt-1">
              <Link href="/info-contact" className="text-xs font-bold text-brand-red hover:text-red-700 hover:underline">S\'inscrire à une session</Link>
            </div>
          </div>

          <div className="w-full flex justify-center z-10 mt-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-brand-red/20 shadow-md">
              <BookOpen className="h-6 w-6 text-brand-red" />
            </div>
          </div>
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTORS TRUST BANNER (Apple TV Carousel Style - Light theme) */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-white py-16 border-t border-b border-slate-200 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
            Partenaire de confiance des industries africaines.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-40 rounded-2xl bg-slate-50 border border-slate-200 p-5 flex flex-col justify-between hover:border-brand-blue/30 hover:shadow-md transition-all">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">SECTEUR 01</span>
              <span className="text-base font-extrabold text-slate-900 leading-tight">Exploitations Minières & Carrières</span>
            </div>
            <div className="h-40 rounded-2xl bg-slate-50 border border-slate-200 p-5 flex flex-col justify-between hover:border-brand-green/30 hover:shadow-md transition-all">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">SECTEUR 02</span>
              <span className="text-base font-extrabold text-slate-900 leading-tight">Pétrole, Gaz & Raffineries</span>
            </div>
            <div className="h-40 rounded-2xl bg-slate-50 border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-350 hover:shadow-md transition-all">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">SECTEUR 03</span>
              <span className="text-base font-extrabold text-slate-900 leading-tight">Bâtiments & Chantiers BTP</span>
            </div>
            <div className="h-40 rounded-2xl bg-slate-50 border border-slate-200 p-5 flex flex-col justify-between hover:border-brand-red/30 hover:shadow-md transition-all">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">SECTEUR 04</span>
              <span className="text-base font-extrabold text-slate-900 leading-tight">Laboratoires & Cabinets HSE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FINAL B2B CTA BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="border border-slate-200 bg-white p-12 rounded-3xl text-center space-y-6 max-w-3xl mx-auto shadow-sm">
          <h2 className="text-3xl font-extrabold text-slate-900">Démarrez votre projet de métrologie</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Parcourez notre catalogue technique, ajoutez vos instruments au panier, et demandez votre devis personnalisé en 1 clic.
          </p>
          <div className="pt-2">
            <Link
              href="/produits"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-brand-blue hover:bg-blue-700 text-white text-xs transition-colors shadow-lg shadow-brand-blue/10"
            >
              Consulter le catalogue
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
