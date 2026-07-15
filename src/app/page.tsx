import React from 'react';
import Link from 'next/link';
import { BRANDS, CATEGORIES, PRODUCTS } from '@/lib/services/mockData';
import { ShieldCheck, ArrowUpRight, Zap, Target, BookOpen, Award, ArrowRight, Activity, Volume2, Wind, Thermometer, UserCheck } from 'lucide-react';

export default function Home() {
  // Map categories to icons for representation
  const categoryIcons: Record<string, React.ReactNode> = {
    'cat-noise': <Volume2 className="h-6 w-6 text-cyan-400" />,
    'cat-air': <Wind className="h-6 w-6 text-emerald-400" />,
    'cat-thermal': <Thermometer className="h-6 w-6 text-orange-400" />,
    'cat-respiratory': <UserCheck className="h-6 w-6 text-purple-400" />,
  };

  const getBrandLogoText = (name: string) => {
    return name;
  };

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Background radial glowing effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/10 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28 text-center sm:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-xs text-cyan-400 font-semibold animate-pulse">
              <Award className="h-3.5 w-3.5" /> Partenaire Agréé Officiel Afrique
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">
              Sécurisez vos équipes, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-500">
                Maîtrisez vos mesures
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              Importateur et distributeur exclusif de matériel métrologique et de solutions d\'hygiène du travail de pointe en Afrique de l\'Ouest et Centrale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center sm:justify-start">
              <Link
                href="/produits"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Explorer le catalogue
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold border border-slate-800 bg-slate-900/40 hover:bg-slate-900 text-slate-200 hover:text-white transition-all duration-200"
              >
                Nos expertises HSE
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-900 text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">4</p>
                <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold">Marques leaders</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">100%</p>
                <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold">Garantie & Support</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">10+</p>
                <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold">Pays couverts</p>
              </div>
            </div>
          </div>

          {/* Hero visual card */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-3xl blur-2xl opacity-60" />
            <div className="relative border border-slate-800 bg-slate-900/60 p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Produit Vedette</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-cyan-500/10 text-cyan-400">DISPONIBLE</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs text-cyan-400 font-bold tracking-wide">SVANTEK</p>
                <h3 className="text-2xl font-black text-white">Sonomètre SV 977D</h3>
                <p className="text-xs text-slate-400">Sonomètre classe 1 haute précision et analyseur de vibrations.</p>
              </div>

              {/* Fake diagram/chart */}
              <div className="h-28 w-full bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[10px] text-slate-500">
                  <span>Plage de mesure</span>
                  <span className="text-emerald-400 font-semibold">Conforme CEI 61672</span>
                </div>
                <div className="flex gap-1.5 items-end h-12">
                  <div className="bg-cyan-500/40 w-full h-[40%] rounded-sm" />
                  <div className="bg-cyan-500/60 w-full h-[65%] rounded-sm" />
                  <div className="bg-cyan-500/80 w-full h-[85%] rounded-sm" />
                  <div className="bg-emerald-400 w-full h-[95%] rounded-sm" />
                  <div className="bg-cyan-500/80 w-full h-[70%] rounded-sm" />
                  <div className="bg-cyan-500/50 w-full h-[45%] rounded-sm" />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Évaluation HSE & Mines</span>
                <Link
                  href="/produits/svantek/sonometre-sv-977d"
                  className="inline-flex items-center gap-1 text-xs text-cyan-400 font-bold hover:underline"
                >
                  Fiche produit <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands logos/partner banner */}
      <section className="border-y border-slate-900 bg-slate-950/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
            Distributeur agréé exclusif des marques leaders
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center text-center">
            {BRANDS.map((brand) => (
              <Link
                key={brand.id}
                href={`/produits?brand=${brand.slug}`}
                className="group relative px-6 py-4 rounded-xl border border-slate-900 bg-slate-900/20 hover:border-slate-800 transition-all w-full max-w-[200px]"
              >
                <p className="text-lg font-black tracking-widest text-slate-400 group-hover:text-white transition-colors">
                  {brand.name}
                </p>
                <p className="text-[9px] text-slate-600 group-hover:text-cyan-400 transition-colors uppercase tracking-widest mt-1">
                  Voir la gamme
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Expertise Métier</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Catégories d\'Équipements Techniques
          </p>
          <p className="text-slate-400 text-sm">
            Découvrez nos gammes spécialisées d\'instruments de mesure calibrés répondant aux normes internationales les plus exigeantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/produits?category=${category.slug}`}
              className="group border border-slate-900 bg-slate-900/30 p-6 rounded-2xl hover:border-slate-800 hover:bg-slate-900/50 hover:scale-[1.01] transition-all duration-200"
            >
              <div className="mb-4 inline-block p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition-colors">
                {categoryIcons[category.id] || <Activity className="h-6 w-6 text-cyan-400" />}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {category.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-slate-950/40 border-y border-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Équipements Phares</h2>
              <p className="text-3xl font-extrabold text-white">Sélection de Produits Vedettes</p>
            </div>
            <Link
              href="/produits"
              className="inline-flex items-center gap-1 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Voir tout le catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((product) => {
              const brand = BRANDS.find((b) => b.id === product.brand_id);
              return (
                <div
                  key={product.id}
                  className="flex flex-col border border-slate-900 bg-slate-950 rounded-2xl overflow-hidden hover:border-slate-850 transition-colors group"
                >
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                        <span>{brand?.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 uppercase tracking-widest">
                          {product.model}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {product.short_description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-900 flex justify-between items-center">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                        Prix sur demande
                      </span>
                      <Link
                        href={`/produits/${brand?.slug}/${product.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-white"
                      >
                        Fiche technique <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Plus qu\'un distributeur</h2>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">
              Expertise & Services d\'Accompagnement
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Nous soutenons les directions HSE, bureaux d\'études et industries en Afrique avec des prestations d\'ingénierie et de maintenance certifiées.
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/40 text-slate-200 text-xs font-bold hover:text-white transition-colors"
              >
                Découvrir nos services
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 border border-slate-900 bg-slate-900/20 rounded-2xl space-y-2">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
              <h4 className="font-bold text-white">Étalonnage & Maintenance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Centre de service qualifié pour l\'entretien périodique et le calibrage de vos sonomètres et pompes de prélèvement.
              </p>
            </div>

            <div className="p-6 border border-slate-900 bg-slate-900/20 rounded-2xl space-y-2">
              <Zap className="h-6 w-6 text-cyan-400" />
              <h4 className="font-bold text-white">Lynx Academy</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Formations certifiantes à l\'utilisation du matériel d\'hygiène industrielle et à l\'interprétation des relevés.
              </p>
            </div>

            <div className="p-6 border border-slate-900 bg-slate-900/20 rounded-2xl space-y-2">
              <Target className="h-6 w-6 text-orange-400" />
              <h4 className="font-bold text-white">Assistance terrain</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ingénieurs HSE disponibles pour vous assister sur site lors de campagnes de mesures de bruit ou d\'air.
              </p>
            </div>

            <div className="p-6 border border-slate-900 bg-slate-900/20 rounded-2xl space-y-2">
              <BookOpen className="h-6 w-6 text-purple-400" />
              <h4 className="font-bold text-white">Conseil Réglementaire</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Veille et conformité aux législations nationales et internationales sur les limites d\'expositions professionnelles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Prêt à équiper vos chantiers ?</h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
                Sélectionnez vos articles dans notre catalogue, complétez vos spécifications et transmettez-nous votre demande en 1 clic. Offre commerciale rédigée sous 24-48h.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-end">
              <Link
                href="/produits"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-white text-slate-950 hover:bg-slate-100 transition-colors shadow-xl"
              >
                Commencer ma demande
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
