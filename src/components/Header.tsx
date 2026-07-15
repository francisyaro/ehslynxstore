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
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                EHS LYNX<span className="text-cyan-400">AFRIK</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-cyan-400 bg-slate-900/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/30'
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
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Cart / RFQ Selection Button */}
            <Link
              href="/demande-de-prix"
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              aria-label="Demande de prix"
            >
              <FileText className="h-5.5 w-5.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-slate-950 animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin Backoffice Quick Link */}
            <Link
              href="/admin"
              className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-slate-900 rounded-lg transition-colors"
              title="Console Admin"
            >
              <ShieldAlert className="h-5.5 w-5.5" />
            </Link>

            {/* User Account */}
            <Link
              href="/compte/demandes"
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              title="Espace Client"
            >
              <User className="h-5.5 w-5.5" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg md:hidden transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          </form>

          <nav className="flex flex-col space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-cyan-400 bg-slate-900/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/30'
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
