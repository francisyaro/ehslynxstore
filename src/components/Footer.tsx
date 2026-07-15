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
              Distributeur officiel agréé d\'équipements de métrologie, d\'hygiène industrielle et de santé-sécurité au travail pour l\'Afrique de l\'Ouest et du Centre.
            </p>
            <div className="flex space-x-3 text-slate-500">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue">
                <Globe className="h-5 w-5" />
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
                  Prévention des expositions
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
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-blue shrink-0" />
                <span>Zone Industrielle, Abidjan, Côte d\'Ivoire</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-blue shrink-0" />
                <span>+225 07 00 00 00 00</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-blue shrink-0" />
                <span>contact@ehslynxafrik.com</span>
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
