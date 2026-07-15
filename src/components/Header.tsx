'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Menu, X, Search, FileText, User, ShieldAlert, Sparkles } from 'lucide-react';

export default function Header() {
  const { cartCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => pathname === path;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produits?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Produits', href: '/produits' },
    { name: 'Services', href: '/services' },
    { name: 'À Propos', href: '/a-propos' },
    { name: 'Contact', href: '/info-contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/brands/ehslynxafrik-logo.png" alt="EHS-LYNX AFRIK Logo" className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-102" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-brand-green bg-slate-100'
                    : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative w-60">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-brand-blue transition-colors"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Cart / RFQ Selection Button */}
            <Link
              href="/demande-de-prix"
              className="relative p-2 text-slate-600 hover:text-brand-blue hover:bg-slate-50 rounded-lg transition-colors"
              aria-label="Demande de prix"
            >
              <FileText className="h-5.5 w-5.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin Backoffice Quick Link */}
            <Link
              href="/admin"
              className="p-2 text-brand-green hover:text-green-700 hover:bg-slate-50 rounded-lg transition-colors"
              title="Console Admin"
            >
              <ShieldAlert className="h-5.5 w-5.5" />
            </Link>

            {/* User Account */}
            <Link
              href="/compte/demandes"
              className="p-2 text-slate-600 hover:text-brand-blue hover:bg-slate-50 rounded-lg transition-colors"
              title="Espace Client"
            >
              <User className="h-5.5 w-5.5" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-brand-blue hover:bg-slate-50 rounded-lg md:hidden transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3 shadow-md">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-brand-blue"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          </form>

          <nav className="flex flex-col space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                  isActive(item.href)
                    ? 'text-brand-green bg-slate-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
