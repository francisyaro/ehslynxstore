import React from 'react';
import { ShieldAlert, Activity, BookOpen, HeartPulse, LineChart, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      id: 'prevention',
      icon: <ShieldAlert className="h-8 w-8 text-brand-blue" />,
      title: 'Évaluation des risques d’exposition professionnels et communautaires',
      desc: 'Accompagnement complet dans l\'évaluation des risques liés au bruit, aux vibrations mécaniques, à l\'inhalation de poussières et au stress thermique en milieu industriel et minier.',
      points: [
        'Campagne de mesures individuelles du bruit (dosimétrie)',
        'Cartographie sonore de sites de production',
        'Étude de l\'exposition aux vibrations transmises aux membres supérieurs ou corps entier',
        'Prélèvements de poussières de silice, plomb et autres agents chimiques'
      ]
    },
    {
      id: 'indoor-air',
      icon: <Activity className="h-8 w-8 text-brand-green" />,
      title: 'Qualité de l\'environnement intérieur (QAI)',
      desc: 'Diagnostic de la qualité de l\'air dans les espaces de bureau, laboratoires et infrastructures collectives pour prévenir le syndrome des bâtiments malsains.',
      points: [
        'Mesure continue du CO2, CO, COV, Formaldéhyde et particules fines',
        'Audit des systèmes de ventilation et taux de renouvellement d\'air',
        'Recherche et identification de moisissures et polluants biologiques',
        'Rapports de recommandations opérationnelles d\'assainissement'
      ]
    },
    {
      id: 'research',
      icon: <HeartPulse className="h-8 w-8 text-brand-red" />,
      title: 'Recherche en santé publique environnementale',
      desc: 'Appui scientifique et technique aux universités, laboratoires et ONG menant des études épidémiologiques ou environnementales en Afrique.',
      points: [
        'Fourniture et installation de stations de surveillance de bruit environnemental',
        'Prêteurs haut débit d\'air ambiant calibrés pour analyses particulaires',
        'Aide au paramétrage et à l\'extraction de jeux de données métrologiques complexes',
        'Partenariats de recherche sur les pathologies respiratoires et auditives'
      ]
    },
    {
      id: 'hseq',
      icon: <LineChart className="h-8 w-8 text-purple-650" />,
      title: 'Management des systèmes intégrés (HSE)',
      desc: 'Assistance à l\'intégration et à la certification de vos politiques HSE conformément aux référentiels internationaux.',
      points: [
        'Préparation à la certification ISO 45001 (Santé & Sécurité) et ISO 14001 (Environnement)',
        'Rédaction de protocoles internes de métrologie et d\'hygiène industrielle',
        'Définition d\'indicateurs clés (KPIs) de performance sécurité',
        'Audits de conformité réglementaire'
      ]
    }
  ];

  return (
    <div className="bg-slate-50 py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h1 className="text-xs font-bold uppercase tracking-widest text-brand-blue">Prestations Techniques</h1>
          <p className="text-4xl font-black text-slate-900 tracking-tight">
            Services & Expertise Conseil
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            EHS LYNX AFRIK ne vend pas seulement des instruments : nous offrons une expertise globale pour garantir la pertinence de vos mesures.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-16">
          {services.map((s, index) => (
            <div
              key={s.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-8 rounded-3xl border border-slate-200/60 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.015)] relative ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-block p-3.5 rounded-2xl bg-slate-50 border border-slate-200/50">
                  {s.icon}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{s.title}</h2>
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">{s.desc}</p>
                <div className="pt-2">
                  <Link
                    href="/info-contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-blue-750 transition-colors"
                  >
                    Demander une assistance <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8 space-y-3">
                <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">
                  Détail des interventions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {s.points.map((p, i) => (
                    <div key={i} className="flex gap-2 items-start text-xs text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
                      <span className="leading-tight">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 p-8 rounded-3xl border border-slate-200/60 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.015)] text-center space-y-4">
          <BookOpen className="h-10 w-10 text-brand-blue mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Besoin d'une formation ou d'un étalonnage d'instrument ?</h3>
          <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
            Notre équipe organise régulièrement des ateliers pratiques en entreprise et effectue l'entretien de vos sonomètres et pompes de prélèvement.
          </p>
          <div className="pt-2">
            <Link
              href="/info-contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-bold bg-brand-blue hover:bg-blue-750 text-white text-xs shadow-md transition-colors"
            >
              Contacter nos experts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
