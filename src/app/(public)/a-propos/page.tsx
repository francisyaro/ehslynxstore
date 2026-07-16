import React from 'react';
import { Target, Shield, Users, MapPin, Sparkles, Award } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="h-6 w-6 text-brand-blue" />,
      title: 'Sécurité & Intégrité',
      desc: 'Nous fournissons uniquement des équipements certifiés conformes aux standards internationaux les plus stricts.'
    },
    {
      icon: <Target className="h-6 w-6 text-brand-green" />,
      title: 'Expertise Métier',
      desc: 'Nos techniciens et ingénieurs sont formés par les constructeurs pour calibrer et dépanner vos appareils.'
    },
    {
      icon: <Users className="h-6 w-6 text-brand-red" />,
      title: 'Proximité Africaine',
      desc: 'Avec des bureaux régionaux et des équipes mobiles, nous intervenons rapidement sur vos sites miniers et industriels.'
    }
  ];

  const countries = [
    'Côte d\'Ivoire', 'Sénégal', 'Cameroun', 'Mali', 'Guinée', 'Gabon', 
    'Burkina Faso', 'Togo', 'Bénin', 'Rép. Démocratique du Congo'
  ];

  return (
    <div className="bg-slate-50 py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-blue/20 bg-brand-blue/5 text-xs text-brand-blue font-bold">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Notre Histoire & Mission
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Qui est EHS LYNX AFRIK ?
          </h1>
          <p className="text-slate-650 text-sm leading-relaxed">
            Nous sommes le point d'accès privilégié des entreprises et institutions africaines aux meilleurs outils mondiaux d'évaluation des risques physiques et chimiques au travail.
          </p>
        </div>

        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Notre Engagement</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Fondée pour répondre au besoin croissant d'équipements de mesure fiables en Afrique de l'Ouest et du Centre, EHS LYNX AFRIK comble le fossé entre les fabricants leaders de métrologie et les entreprises opérant localement.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              En tant que distributeur agréé de constructeurs réputés comme <strong>SVANTEK</strong>, <strong>SENSIDYNE</strong>, <strong>SLATESAFETY</strong> et <strong>OHD</strong>, nous assurons non seulement la fourniture mais également la formation et le support technique après-vente, garantissant la pérennité de vos investissements.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-brand-green font-semibold shadow-xs">
              <Award className="h-4 w-4 text-brand-green" /> Importations directes & Certificats d'origine garantis
            </div>
          </div>
          
          <div className="border border-slate-200/80 bg-white p-8 rounded-3xl relative shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
            <h3 className="font-extrabold text-slate-900 text-lg mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-brand-blue" /> Zones d'intervention prioritaires
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Nos ingénieurs et logisticiens coordonnent des livraisons sécurisées avec formalités douanières simplifiées dans plus de 10 pays d'Afrique sub-saharienne.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {countries.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="border-t border-slate-200 pt-20">
          <h3 className="text-center text-xs font-bold uppercase tracking-widest text-brand-blue mb-12">
            Nos Valeurs Fondamentales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="p-8 rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.015)] space-y-4">
                <div className="inline-block p-3 rounded-xl bg-slate-50 border border-slate-200/50">
                  {v.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900">{v.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
