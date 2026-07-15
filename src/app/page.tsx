import React from 'react';
import Link from 'next/link';
import { BRANDS, CATEGORIES, PRODUCTS } from '@/lib/services/mockData';
import { ArrowRight, Volume2, Wind, Thermometer, UserCheck, ShieldCheck, Award, BookOpen, Share2, HelpCircle, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans">
      
      {/* ------------------------------------------------------------- */}
      {/* SPOTLIGHT 1: SVANTEK SV 971 (Apple Style Hero 1 - Dark/Premium) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full min-h-[640px] flex flex-col justify-between items-center text-center py-16 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,67,140,0.15),transparent_60%)] pointer-events-none" />
        
        {/* Text Group */}
        <div className="space-y-4 max-w-2xl px-4 z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-green">SVANTEK</p>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-none">
            Sonomètre SV 971
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-lg mx-auto font-medium">
            Le plus petit sonomètre de Classe 1 de précision au monde.
          </p>
          <div className="flex justify-center gap-6 pt-2">
            <Link
              href="/produits/svantek/sonometre-compact-sv-971"
              className="inline-flex items-center gap-1 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              En savoir plus <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/produits/svantek/sonometre-compact-sv-971"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-green hover:text-green-400 transition-colors"
            >
              Demander un prix
            </Link>
          </div>
        </div>

        {/* Apple Style Hardware Mockup Showcase (CSS Graphic) */}
        <div className="relative mt-12 w-full max-w-xl px-4 flex justify-center z-10">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-brand-blue/10 blur-[60px] pointer-events-none" />
          {/* Sonometer device mockup */}
          <div className="relative w-48 h-80 rounded-[32px] border-4 border-slate-800 bg-slate-950 p-4 shadow-2xl flex flex-col justify-between items-center">
            {/* Display screen */}
            <div className="w-full h-32 bg-slate-900 rounded-xl border border-slate-800 p-3 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-brand-green/5 rounded-full blur-md" />
              <div className="flex justify-between items-center text-[8px] text-slate-500 font-bold uppercase">
                <span>SV 971</span>
                <span className="text-brand-green">RUNNING</span>
              </div>
              <div className="text-2xl font-black text-white font-mono text-center my-auto flex items-end justify-center gap-1">
                <span>72.4</span> <span className="text-[10px] text-brand-green uppercase">dBA</span>
              </div>
              <div className="flex gap-1 items-end h-6 w-full">
                <div className="bg-brand-green/40 w-full h-[30%] rounded-sm" />
                <div className="bg-brand-green/60 w-full h-[50%] rounded-sm" />
                <div className="bg-brand-green/80 w-full h-[80%] rounded-sm" />
                <div className="bg-brand-green w-full h-[95%] rounded-sm" />
                <div className="bg-brand-green/70 w-full h-[60%] rounded-sm" />
              </div>
            </div>
            {/* Buttons */}
            <div className="grid grid-cols-3 gap-2 w-full px-2 mb-4">
              <div className="h-6 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center text-[7px] font-bold text-slate-500 uppercase">esc</div>
              <div className="h-6 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center text-[7px] font-bold text-slate-500 uppercase">&uarr;</div>
              <div className="h-6 rounded-md bg-brand-blue border border-brand-blue/30 flex items-center justify-center text-[7px] font-bold text-white uppercase">enter</div>
              <div className="h-6 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center text-[7px] font-bold text-slate-500 uppercase">&larr;</div>
              <div className="h-6 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center text-[7px] font-bold text-slate-500 uppercase">&darr;</div>
              <div className="h-6 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center text-[7px] font-bold text-slate-500 uppercase">&rarr;</div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SPOTLIGHT 2: SENSIDYNE GilAir Plus (Apple Style Hero 2 - Light Contrast) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full min-h-[640px] flex flex-col justify-between items-center text-center py-16 bg-slate-100 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,130,57,0.06),transparent_60%)] pointer-events-none" />
        
        {/* Text Group */}
        <div className="space-y-4 max-w-2xl px-4 z-10 text-slate-950">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-blue">SENSIDYNE</p>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none">
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
          <div className="relative w-44 h-60 rounded-3xl border-4 border-slate-300 bg-white p-4 shadow-xl flex flex-col justify-between items-center">
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
              <div className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500 font-mono">&larr;</div>
              <div className="h-7 w-7 rounded-full bg-brand-blue flex items-center justify-center text-[8px] font-bold text-white font-mono">ok</div>
              <div className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500 font-mono">&rarr;</div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SPOTLIGHT 3: SLATESAFETY BAND V2 (Apple Style Hero 3 - Colorful Gradient) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full min-h-[640px] flex flex-col justify-between items-center text-center py-16 bg-gradient-to-br from-brand-blue via-indigo-950 to-brand-green overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
        
        {/* Text Group */}
        <div className="space-y-4 max-w-2xl px-4 z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-green">SLATESAFETY</p>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-none">
            SlateSafety BAND V2
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-md mx-auto font-medium">
            La biosurveillance connectée en temps réel. Protégez vos équipes du stress thermique.
          </p>
          <div className="flex justify-center gap-6 pt-2">
            <Link
              href="/produits/slatesafety/bracelet-biosurveillance-band-v2"
              className="inline-flex items-center gap-1 text-sm font-bold text-cyan-300 hover:text-cyan-200 transition-colors group"
            >
              En savoir plus <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/produits/slatesafety/bracelet-biosurveillance-band-v2"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-green hover:text-green-400 transition-colors"
            >
              Demander un prix
            </Link>
          </div>
        </div>

        {/* Bracelet Showcase */}
        <div className="relative mt-12 w-full max-w-md px-4 flex justify-center z-10 mb-8">
          {/* Smart Band Visualisation */}
          <div className="relative w-64 h-24 rounded-full border-8 border-slate-900 bg-slate-950 flex items-center justify-between px-6 shadow-2xl">
            {/* Glowing Sensor Center */}
            <div className="absolute inset-0 bg-brand-green/5 rounded-full animate-pulse" />
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800">
              <Thermometer className="h-5 w-5 text-brand-red animate-pulse" />
            </div>
            <div className="text-center font-mono space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">TEMP INTERNAL</span>
              <span className="text-base font-black text-white block">37.2 &deg;C</span>
            </div>
            <div className="h-4 w-4 rounded-full bg-brand-green animate-ping" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2x2 BENTO GRID SECTION (Apple Style Grid of spotlights) */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Bento Box 1: OHD QuantiFit2 (Dark Theme) */}
        <div className="relative min-h-[500px] flex flex-col justify-between items-center text-center p-8 bg-slate-900/60 border border-slate-900 rounded-3xl overflow-hidden hover:border-slate-850 transition-all">
          <div className="space-y-2 z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-green">OHD</p>
            <h2 className="text-3xl font-extrabold text-white">Fit Testing QuantiFit2</h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Essai d\'ajustement quantitatif des masques en moins de 2 minutes par pression négative.
            </p>
            <div className="flex justify-center gap-4 pt-1">
              <Link href="/produits/ohd/fit-test-quantifit2" className="text-xs font-bold text-cyan-400 hover:underline">En savoir plus</Link>
              <Link href="/produits/ohd/fit-test-quantifit2" className="text-xs font-bold text-brand-green hover:underline">Demander un prix</Link>
            </div>
          </div>
          
          <div className="w-full flex justify-center z-10 mt-6">
            <div className="w-48 h-32 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
              <div className="text-[8px] text-slate-500 font-bold uppercase">OHD PNC TEST</div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-brand-green w-3/4 rounded-full" />
              </div>
              <span className="text-[10px] text-brand-green font-bold">FACTEUR FIT: 10,000+</span>
            </div>
          </div>
        </div>

        {/* Bento Box 2: SVANTEK SV 307 (Dark Theme) */}
        <div className="relative min-h-[500px] flex flex-col justify-between items-center text-center p-8 bg-slate-900/60 border border-slate-900 rounded-3xl overflow-hidden hover:border-slate-850 transition-all">
          <div className="space-y-2 z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-green">SVANTEK</p>
            <h2 className="text-3xl font-extrabold text-white">Station SV 307</h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Station de surveillance continue du bruit extérieur étanche (IP65) avec modem 4G.
            </p>
            <div className="flex justify-center gap-4 pt-1">
              <Link href="/produits/svantek/station-bruit-outdoor-sv-307" className="text-xs font-bold text-cyan-400 hover:underline">En savoir plus</Link>
              <Link href="/produits/svantek/station-bruit-outdoor-sv-307" className="text-xs font-bold text-brand-green hover:underline">Demander un prix</Link>
            </div>
          </div>
          
          <div className="w-full flex justify-center z-10 mt-6">
            <div className="w-28 h-40 bg-slate-950 border border-slate-800 rounded-2xl p-3 flex flex-col justify-between">
              <div className="w-6 h-6 rounded-full bg-brand-green/10 border border-brand-green/30 flex items-center justify-center mx-auto">
                <Volume2 className="h-3 w-3 text-brand-green" />
              </div>
              <div className="h-10 w-full bg-slate-900 rounded border border-slate-850" />
            </div>
          </div>
        </div>

        {/* Bento Box 3: Services HSE & Diagnostics (Light Theme) */}
        <div className="relative min-h-[500px] flex flex-col justify-between items-center text-center p-8 bg-slate-100 rounded-3xl overflow-hidden transition-all">
          <div className="space-y-2 z-10 text-slate-950">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-blue">SERVICES & CONSEIL</p>
            <h2 className="text-3xl font-extrabold">Ingénierie HSE & Étalonnage</h2>
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

        {/* Bento Box 4: Lynx Academy (Rust Accent Theme) */}
        <div className="relative min-h-[500px] flex flex-col justify-between items-center text-center p-8 bg-gradient-to-br from-brand-red/90 to-amber-950 rounded-3xl overflow-hidden">
          <div className="space-y-2 z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">FORMATION PROFESSIONNELLE</p>
            <h2 className="text-3xl font-extrabold text-white">Lynx Academy</h2>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Ateliers et formations certifiantes à la métrologie et à la prévention des expositions.
            </p>
            <div className="flex justify-center pt-1">
              <Link href="/info-contact" className="text-xs font-bold text-white hover:underline">S'inscrire à une session</Link>
            </div>
          </div>

          <div className="w-full flex justify-center z-10 mt-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 border border-slate-900 shadow-2xl">
              <BookOpen className="h-6 w-6 text-brand-green" />
            </div>
          </div>
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTORS TRUST BANNER (Apple TV Carousel Style) */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-slate-950 py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-white tracking-tight mb-8">
            Partenaire de confiance des industries africaines.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-40 rounded-2xl bg-gradient-to-br from-slate-900 to-brand-blue/30 border border-slate-900 p-5 flex flex-col justify-between hover:border-slate-800 transition-colors">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">SECTEUR 01</span>
              <span className="text-base font-extrabold text-white leading-tight">Exploitations Minières & Carrières</span>
            </div>
            <div className="h-40 rounded-2xl bg-gradient-to-br from-slate-900 to-brand-green/30 border border-slate-900 p-5 flex flex-col justify-between hover:border-slate-800 transition-colors">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">SECTEUR 02</span>
              <span className="text-base font-extrabold text-white leading-tight">Pétrole, Gaz & Raffineries</span>
            </div>
            <div className="h-40 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-900 p-5 flex flex-col justify-between hover:border-slate-800 transition-colors">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">SECTEUR 03</span>
              <span className="text-base font-extrabold text-white leading-tight">Bâtiments & Chantiers BTP</span>
            </div>
            <div className="h-40 rounded-2xl bg-gradient-to-br from-slate-900 to-brand-red/20 border border-slate-900 p-5 flex flex-col justify-between hover:border-slate-800 transition-colors">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">SECTEUR 04</span>
              <span className="text-base font-extrabold text-white leading-tight">Laboratoires & Cabinets HSE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FINAL B2B CTA BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="border border-slate-900 bg-slate-900/10 p-12 rounded-3xl text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white">Démarrez votre projet de métrologie</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Parcourez notre catalogue technique, ajoutez vos instruments au panier, et demandez votre devis personnalisé en 1 clic.
          </p>
          <div className="pt-2">
            <Link
              href="/produits"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-brand-blue hover:bg-blue-700 text-white text-xs transition-colors shadow-lg shadow-brand-blue/20"
            >
              Consulter le catalogue
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
