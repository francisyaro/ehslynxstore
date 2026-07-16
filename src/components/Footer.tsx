import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, ShieldAlert, BookOpen, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-50 border-t border-slate-200 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Brief */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/brands/ehslynxafrik-logo.png" alt="EHS-LYNX AFRIK Logo" className="h-11 w-auto object-contain" />
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Distributeur officiel agréé d'équipements de métrologie, d'hygiène industrielle et de santé-sécurité au travail pour l'Afrique de l'Ouest et du Centre.
            </p>
            <div className="flex space-x-3 text-slate-555 pt-1">
              <a href="http://www.linkedin.com/in/ehs-lynx-322202225" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue" title="Facebook">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="http://www.linkedin.com/in/ehs-lynx-322202225" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue" title="LinkedIn">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://x.com/ehslynx" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue" title="X (Twitter)">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@EHSLYNX" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red" title="YouTube">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          {/* Brands & Partners */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-4">Marques Agréées</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/produits?brand=svantek" className="hover:text-brand-blue transition-colors">
                  SVANTEK (Acoustique & Vibrations)
                </Link>
              </li>
              <li>
                <Link href="/produits?brand=sensidyne" className="hover:text-brand-blue transition-colors">
                  SENSIDYNE (Échantillonnage d\'Air)
                </Link>
              </li>
              <li>
                <Link href="/produits?brand=slatesafety" className="hover:text-brand-blue transition-colors">
                  SLATESAFETY (Biosurveillance Thermique)
                </Link>
              </li>
              <li>
                <Link href="/produits?brand=ohd" className="hover:text-brand-blue transition-colors">
                  OHD (Fit Testing Respiratoire)
                </Link>
              </li>
            </ul>
          </div>

          {/* Expertises / Services */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-4">Services & Expertise</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services" className="hover:text-brand-blue transition-colors">
                  Évaluation des risques d'exposition
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-blue transition-colors">
                  Qualité de l\'environnement intérieur
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-blue transition-colors">
                  Recherche en santé publique
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-blue transition-colors">
                  Management des systèmes HSE
                </Link>
              </li>
              <li>
                <a href="#academy" className="inline-flex items-center gap-1 hover:text-brand-blue transition-colors text-brand-green font-semibold">
                  <BookOpen className="h-3 w-3" /> Lynx Academy
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase">Contact Afrique</h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" />
                <span>Rue de Saponé, Ouaga 2000, Ouagadougou, Burkina Faso</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span>00226 05 - 18 - 18 - 81</span>
                  <span>00226 63 - 62 - 71 - 71</span>
                  <span>+1 - 646 - 269  - 8937</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-blue shrink-0" />
                <span>info@ehslynx.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal links */}
        <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px]">
          <p>&copy; {new Date().getFullYear()} EHS LYNX AFRIK. Tous droits réservés. Distributeur certifié.</p>
          <div className="flex space-x-4">
            <a href="#mentions" className="hover:underline">Mentions légales</a>
            <a href="#confidentiality" className="hover:underline">Politique de confidentialité</a>
            <a href="#sitemap" className="hover:underline">Plan du site</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
