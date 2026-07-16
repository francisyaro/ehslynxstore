'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Globe, Bell, User, ChevronDown, LogOut, Menu, X, Shield, Sparkles } from 'lucide-react';

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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Load persisted agent from localStorage if available
    const saved = localStorage.getItem('ehs_admin_agent');
    if (saved) {
      setActiveAgent(saved);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAgentChange = (agent: string) => {
    setActiveAgent(agent);
    localStorage.setItem('ehs_admin_agent', agent);
    // Dispatch custom event to notify other components of change
    window.dispatchEvent(new Event('ehs_admin_agent_changed'));
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

  return (
    <AdminContext.Provider value={{ activeAgent, setActiveAgent: handleAgentChange }}>
      <div className="min-h-screen bg-[#070a13] text-slate-100 flex font-sans overflow-x-hidden">
        
        {/* Decorative Grid and Gradients Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-72 bg-[#0a0f1d]/90 border-r border-slate-800/80 backdrop-blur-xl shrink-0 z-30 sticky top-0 h-screen">
          {/* Sidebar Header */}
          <div className="h-20 flex items-center px-6 border-b border-slate-800/50">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-blue to-cyan-500 flex items-center justify-center shadow-lg shadow-brand-blue/20 group-hover:scale-105 transition-transform">
                <Shield className="h-5.5 w-5.5 text-white" />
              </div>
              <div>
                <span className="font-black text-sm tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent uppercase block">LYNX CONTROL</span>
                <span className="text-[10px] text-brand-green font-bold tracking-widest uppercase">EHS Commercial</span>
              </div>
            </Link>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-3">Navigation</p>
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-350 group ${
                    active
                      ? 'bg-gradient-to-r from-brand-blue/30 to-brand-blue/10 border border-brand-blue/50 text-white shadow-lg shadow-brand-blue/5'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/30 border border-transparent'
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110 ${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-350'}`} />
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-6 mt-6 border-t border-slate-800/50">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-3">Raccourcis</p>
              <Link
                href="/"
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/30 border border-transparent transition-all group"
              >
                <Globe className="h-4.5 w-4.5 text-slate-500 group-hover:text-slate-350 transition-transform group-hover:rotate-12" />
                Site Client Public
              </Link>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-800/50 bg-[#080d19]/60">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/50 border border-slate-800/40">
              <div className="h-8 w-8 rounded-lg bg-brand-green/20 border border-brand-green/30 flex items-center justify-center text-brand-green font-bold text-xs uppercase shadow-[0_0_10px_rgba(16,130,57,0.1)]">
                {activeAgent === 'all' ? 'SA' : activeAgent.split(' ').map(n=>n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Session Active</p>
                <p className="text-xs font-bold text-slate-200 truncate">{agentLabel(activeAgent)}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Header / Sidebar Menu */}
        <div className="lg:hidden">
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex">
              <div className="fixed inset-0 bg-[#03060c]/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
              
              <aside className="relative flex flex-col w-72 bg-[#090e1a] border-r border-slate-800 h-full p-6 animate-slide-in">
                <div className="flex items-center justify-between pb-6 border-b border-slate-800/60 mb-6">
                  <Link href="/admin" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <div className="h-8 w-8 rounded-lg bg-brand-blue flex items-center justify-center">
                      <Shield className="h-4.5 w-4.5 text-white" />
                    </div>
                    <span className="font-extrabold text-sm tracking-wide text-white uppercase">LYNX CONTROL</span>
                  </Link>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg hover:bg-slate-800/60 text-slate-400">
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
                            ? 'bg-brand-blue/20 border border-brand-blue/40 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5" />
                        {item.name}
                      </Link>
                    );
                  })}
                  <div className="border-t border-slate-850 pt-4 mt-4">
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                    >
                      <Globe className="h-4.5 w-4.5 text-slate-500" />
                      Site Client Public
                    </Link>
                  </div>
                </nav>

                <div className="mt-auto border-t border-slate-800/60 pt-4">
                  <div className="p-2 rounded-xl bg-slate-900/50 border border-slate-800/40 text-center">
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Session Active</p>
                    <p className="text-xs font-extrabold text-slate-200 mt-0.5">{agentLabel(activeAgent)}</p>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 max-w-full">
          
          {/* Top Bar Navigation */}
          <header className={`sticky top-0 z-20 flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-slate-800/40 transition-all duration-300 ${
            isScrolled ? 'bg-[#070a13]/90 backdrop-blur-md shadow-md shadow-slate-950/20' : 'bg-transparent'
          }`}>
            {/* Left: Mobile Menu Toggle / Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-slate-800/80 hover:bg-slate-800/40 text-slate-400 hover:text-white transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400">
                <span className="hover:text-white transition-colors cursor-default">Back-office</span>
                <span className="text-slate-700">/</span>
                <span className="text-white font-black">{pathname === '/admin' ? 'Tableau de Bord' : pathname.startsWith('/admin/demandes') ? 'Gestion des Demandes' : 'Détails'}</span>
              </div>
            </div>

            {/* Right: Sales Agent Selector & Account Profile */}
            <div className="flex items-center gap-4">
              
              {/* Agent Selector Dropdown wrapper */}
              <div className="flex items-center gap-2">
                <label className="hidden md:block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                  Commercial Actif :
                </label>
                <div className="relative">
                  <select
                    value={activeAgent}
                    onChange={(e) => handleAgentChange(e.target.value)}
                    className="appearance-none bg-[#0d1326] border border-slate-800 text-xs font-bold text-slate-200 pl-3 pr-8 py-2 rounded-xl focus:outline-none focus:border-brand-blue cursor-pointer transition-all hover:border-slate-700"
                  >
                    <option value="all">Super Administrateur (Tous)</option>
                    <option value="Yao Koffi">Yao Koffi (Abidjan)</option>
                    <option value="Moussa Diallo">Moussa Diallo (Dakar)</option>
                    <option value="Marc Dubois">Marc Dubois (Paris)</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Status Indicator */}
              <div className="h-9 w-9 rounded-xl border border-slate-800 flex items-center justify-center text-slate-400 relative hover:text-white hover:bg-slate-800/30 transition-colors cursor-pointer">
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1.5 right-1.5 h-1.8 w-1.8 rounded-full bg-brand-green shadow-[0_0_8px_#108239]" />
              </div>

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
