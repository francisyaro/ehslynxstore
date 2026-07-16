'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Globe, 
  Bell, 
  ChevronDown, 
  Menu, 
  X, 
  Shield, 
  LogOut, 
  Mail, 
  Lock, 
  ArrowRight,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';

// Create a context for the admin session to share the connected commercial agent
interface AdminContextType {
  activeAgent: string;
  setActiveAgent: (agent: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeAgent, setActiveAgent] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Load persisted session from localStorage
    const loggedIn = localStorage.getItem('ehs_admin_logged_in') === 'true';
    setIsAuthenticated(loggedIn);

    const savedAgent = localStorage.getItem('ehs_admin_agent');
    if (savedAgent) {
      setActiveAgent(savedAgent);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAgentChange = (agent: string) => {
    setActiveAgent(agent);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ehs_admin_agent', agent);
      window.dispatchEvent(new Event('ehs_admin_agent_changed'));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Veuillez remplir tous les champs.');
      return;
    }
    // Simple demo password check (any password works for this MVP)
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ehs_admin_logged_in', 'true');
      localStorage.setItem('ehs_admin_agent', 'all');
    }
    setActiveAgent('all');
    setLoginError('');
  };

  const handleQuickLogin = (agent: string) => {
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ehs_admin_logged_in', 'true');
      localStorage.setItem('ehs_admin_agent', agent);
    }
    setActiveAgent(agent);
    setLoginError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ehs_admin_logged_in');
      localStorage.setItem('ehs_admin_agent', 'all');
    }
    setActiveAgent('all');
  };

  const navItems = [
    { name: 'Tableau de Bord', href: '/admin', icon: LayoutDashboard },
    { name: 'Demandes de Devis', href: '/admin/demandes', icon: FileText },
  ];

  const agentLabel = (val: string) => {
    switch (val) {
      case 'Yao Koffi': return 'Yao Koffi (Abidjan)';
      case 'Moussa Diallo': return 'Moussa Diallo (Dakar)';
      case 'Marc Dubois': return 'Marc Dubois (Paris)';
      default: return 'Super Administrateur';
    }
  };

  // Prevent SSR mismatch
  if (!isMounted) {
    return <div className="min-h-screen bg-slate-50"></div>;
  }

  // Guard page: if not authenticated, render split-screen login page
  if (!isAuthenticated) {
    return (
      <div className="h-screen overflow-hidden flex bg-[#090d16] text-slate-100 font-sans">
        {/* Left Side: Login Form (Dark background matching mockup style) */}
        <div className="w-full lg:w-[45%] h-full flex flex-col justify-between p-8 sm:p-12 xl:p-14 z-10 bg-[#090d16] border-r border-slate-900/60 relative overflow-hidden shrink-0">
          <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Header/Logo (Larger) */}
          <div className="flex items-center gap-2">
            <img 
              src="/brands/ehslynxafrik-logo.png" 
              alt="EHS-LYNX AFRIK Logo" 
              className="h-20 w-auto object-contain brightness-110"
            />
          </div>

          {/* Form container (Compact to fit h-screen without scrollbar) */}
          <div className="max-w-md w-full mx-auto my-auto py-4 space-y-5">
            <div className="space-y-1 text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">Console LYNX CONTROL</h2>
              <p className="text-slate-400 text-[11px] font-semibold">Connectez-vous pour accéder au suivi des ventes.</p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-brand-red/10 border border-brand-red/30 text-brand-red text-[11px] font-bold">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Adresse E-mail</label>
                <div className="relative">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="adresse@ehslynx.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-brand-blue placeholder:text-slate-600 transition-colors"
                  />
                  <Mail className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-slate-650" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Mot de passe</label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-brand-blue placeholder:text-slate-600 transition-colors"
                  />
                  <Lock className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-slate-650" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-750 text-white text-xs font-black transition-all shadow-md mt-4 shadow-brand-blue/15"
              >
                <span>Se connecter</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* Quick Demo Connections to test agent filters */}
            <div className="space-y-3 pt-3.5 border-t border-slate-900">
              <p className="text-[9px] text-center font-bold text-slate-550 uppercase tracking-wider">Connexion Rapide Commercial (Démo)</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleQuickLogin('Yao Koffi')}
                  className="px-1.5 py-1.5 rounded-xl bg-slate-900/40 border border-slate-850 hover:border-brand-blue text-[9px] text-slate-350 font-bold transition-all text-center leading-tight hover:text-white"
                >
                  Yao Koffi (Abidjan)
                </button>
                <button
                  onClick={() => handleQuickLogin('Moussa Diallo')}
                  className="px-1.5 py-1.5 rounded-xl bg-slate-900/40 border border-slate-850 hover:border-brand-blue text-[9px] text-slate-350 font-bold transition-all text-center leading-tight hover:text-white"
                >
                  Moussa Diallo (Dakar)
                </button>
                <button
                  onClick={() => handleQuickLogin('Marc Dubois')}
                  className="px-1.5 py-1.5 rounded-xl bg-slate-900/40 border border-slate-850 hover:border-brand-blue text-[9px] text-slate-355 font-bold transition-all text-center leading-tight hover:text-white"
                >
                  Marc Dubois (Paris)
                </button>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div className="flex justify-between text-[9px] text-slate-550 border-t border-slate-900/60 pt-3">
            <span className="cursor-default">© EHS LYNX AFRIK 2026</span>
            <div className="flex gap-3">
              <span className="hover:underline cursor-pointer">Confidentialité</span>
              <span className="hover:underline cursor-pointer">Conditions</span>
            </div>
          </div>
        </div>

        {/* Right Side: Attached Hero Image (Split-screen) */}
        <div className="hidden lg:block lg:flex-1 relative overflow-hidden bg-slate-950">
          <img 
            src="/brands/admin_login_hero.jpg" 
            alt="EHS Metrology and Safety"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090d16] via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-10 left-10 max-w-lg space-y-1.5 z-10">
            <span className="px-3 py-1 rounded-full bg-brand-green/20 border border-brand-green/30 text-brand-green text-[9px] uppercase font-bold tracking-widest inline-block">Métrologie & HSE</span>
            <h3 className="text-xl font-black text-white leading-tight">Garantir la sécurité au travail à travers l'Afrique.</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">Distributeur officiel des plus grandes marques d'hygiène industrielle et environnementale : Svantek, Sensidyne, Slatesafety, OHD.</p>
          </div>
        </div>
      </div>
    );
  }

  // Active authenticated layout
  return (
    <AdminContext.Provider value={{ activeAgent, setActiveAgent: handleAgentChange }}>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans overflow-x-hidden">
        
        {/* Light Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        {/* Sidebar - Desktop (Collapsible) */}
        <aside className={`hidden lg:flex flex-col bg-white border-r border-slate-200 shrink-0 z-30 sticky top-0 h-screen transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${
          sidebarVisible ? 'w-72' : 'w-0 overflow-hidden border-r-0'
        }`}>
          {/* Sidebar Header with prominent EHS-LYNX Logo and collapse trigger */}
          <div className="h-24 flex items-center justify-between px-6 border-b border-slate-100 bg-white">
            <Link href="/admin" className="flex items-center gap-2 group overflow-hidden">
              <img 
                src="/brands/ehslynxafrik-logo.png" 
                alt="EHS-LYNX AFRIK Logo" 
                className="h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
              />
            </Link>
            <button
              onClick={() => setSidebarVisible(false)}
              className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors"
              title="Masquer le menu"
            >
              <PanelLeftClose className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 mb-3">Navigation</p>
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 group ${
                    active
                      ? 'bg-blue-50/50 border border-brand-blue/30 text-brand-blue shadow-[0_1px_2px_rgba(18,67,140,0.02)]'
                      : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110 ${active ? 'text-brand-blue' : 'text-slate-400 group-hover:text-brand-blue'}`} />
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-6 mt-6 border-t border-slate-100">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 mb-3">Raccourcis</p>
              <Link
                href="/"
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold text-slate-600 hover:text-brand-blue hover:bg-slate-50 border border-transparent transition-all group"
              >
                <Globe className="h-4.5 w-4.5 text-slate-400 group-hover:text-brand-blue transition-transform group-hover:rotate-12" />
                Site Client Public
              </Link>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
              <div className="h-8 w-8 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-brand-green font-bold text-xs uppercase">
                {activeAgent === 'all' ? 'SA' : activeAgent.split(' ').map(n=>n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Session Active</p>
                <p className="text-xs font-extrabold text-slate-700 truncate">{agentLabel(activeAgent)}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Header / Sidebar Menu */}
        <div className="lg:hidden">
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex">
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
              
              <aside className="relative flex flex-col w-72 bg-white border-r border-slate-200 h-full p-6 animate-slide-in shadow-xl">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                  <Link href="/admin" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <img 
                      src="/brands/ehslynxafrik-logo.png" 
                      alt="EHS-LYNX AFRIK Logo" 
                      className="h-10 w-auto object-contain"
                    />
                  </Link>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg hover:bg-slate-150 text-slate-500">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex-1 space-y-1">
                  {navItems.map((item) => {
                    const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold ${
                          active
                            ? 'bg-blue-50/50 border border-brand-blue/30 text-brand-blue'
                            : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5" />
                        {item.name}
                      </Link>
                    );
                  })}
                  <div className="border-t border-slate-100 pt-4 mt-4">
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-600 hover:text-brand-blue"
                    >
                      <Globe className="h-4.5 w-4.5 text-slate-400" />
                      Site Client Public
                    </Link>
                  </div>
                </nav>

                <div className="mt-auto border-t border-slate-100 pt-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Session Active</p>
                    <p className="text-xs font-extrabold text-slate-700 mt-0.5">{agentLabel(activeAgent)}</p>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 max-w-full z-10 transition-all duration-300">
          
          {/* Top Bar Navigation */}
          <header className={`sticky top-0 z-20 flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 transition-all duration-300 ${
            isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xs' : 'bg-transparent'
          }`}>
            {/* Left: Mobile Menu Toggle / Sidebar Expand / Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Sidebar Expand Button on Desktop when collapsed */}
              {!sidebarVisible && (
                <button
                  onClick={() => setSidebarVisible(true)}
                  className="hidden lg:flex p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-brand-blue transition-colors shadow-2xs"
                  title="Afficher le menu"
                >
                  <PanelLeft className="h-4.5 w-4.5" />
                </button>
              )}
              
              {/* Mobile layout logo when sidebar is hidden */}
              <div className="lg:hidden flex items-center">
                <img 
                  src="/brands/ehslynxafrik-logo.png" 
                  alt="EHS-LYNX AFRIK Logo" 
                  className="h-10 w-auto object-contain"
                />
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-400 pl-1">
                <span className="hover:text-slate-600 transition-colors cursor-default">Back-office</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-850 font-black">{pathname === '/admin' ? 'Tableau de Bord' : pathname.startsWith('/admin/demandes') ? 'Gestion des Demandes' : 'Détails'}</span>
              </div>
            </div>

            {/* Right: Sales Agent Selector & Logout & Notifications */}
            <div className="flex items-center gap-3">
              
              {/* Agent Selector Dropdown */}
              <div className="flex items-center gap-2">
                <label className="hidden md:block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  Commercial Actif :
                </label>
                <div className="relative">
                  <select
                    value={activeAgent}
                    onChange={(e) => handleAgentChange(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 text-xs font-bold text-slate-700 pl-3 pr-8 py-2 rounded-xl focus:outline-none focus:border-brand-blue cursor-pointer transition-all hover:border-slate-350 shadow-2xs"
                  >
                    <option value="all">Super Administrateur (Tous)</option>
                    <option value="Yao Koffi">Yao Koffi (Abidjan)</option>
                    <option value="Moussa Diallo">Moussa Diallo (Dakar)</option>
                    <option value="Marc Dubois">Marc Dubois (Paris)</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-3 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Notification Indicator */}
              <div className="h-9 w-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 relative hover:text-brand-blue hover:bg-slate-50 transition-all cursor-pointer shadow-2xs">
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-red shadow-[0_0_6px_#a61b1b]" />
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="h-9 w-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-brand-red hover:bg-red-50 transition-all cursor-pointer shadow-2xs"
                title="Se déconnecter"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>

            </div>
          </header>

          {/* Children views */}
          <main className="flex-1">
            {children}
          </main>
        </div>

      </div>
    </AdminContext.Provider>
  );
}
