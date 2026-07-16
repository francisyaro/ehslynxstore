'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Globe, Bell, ChevronDown, Menu, X, Shield } from 'lucide-react';

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
      <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans overflow-x-hidden">
        
        {/* Light Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 shrink-0 z-30 sticky top-0 h-screen shadow-sm">
          {/* Sidebar Header with prominent EHS-LYNX Logo */}
          <div className="h-24 flex items-center px-6 border-b border-slate-100 bg-white">
            <Link href="/admin" className="flex items-center gap-2 group w-full justify-center">
              <img 
                src="/brands/ehslynxafrik-logo.png" 
                alt="EHS-LYNX AFRIK Logo" 
                className="h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
              />
            </Link>
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
                      ? 'bg-blue-50/50 border border-brand-blue/30 text-brand-blue shadow-sm'
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
            <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200/60 shadow-xs">
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
        <div className="flex-1 flex flex-col min-w-0 max-w-full z-10">
          
          {/* Top Bar Navigation */}
          <header className={`sticky top-0 z-20 flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 transition-all duration-300 ${
            isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xs' : 'bg-transparent'
          }`}>
            {/* Left: Mobile Menu Toggle / Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              {/* Mobile layout logo when sidebar is hidden */}
              <div className="lg:hidden flex items-center">
                <img 
                  src="/brands/ehslynxafrik-logo.png" 
                  alt="EHS-LYNX AFRIK Logo" 
                  className="h-10 w-auto object-contain"
                />
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-400">
                <span className="hover:text-slate-600 transition-colors cursor-default">Back-office</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-850 font-black">{pathname === '/admin' ? 'Tableau de Bord' : pathname.startsWith('/admin/demandes') ? 'Gestion des Demandes' : 'Détails'}</span>
              </div>
            </div>

            {/* Right: Sales Agent Selector & Account Profile */}
            <div className="flex items-center gap-4">
              
              {/* Agent Selector Dropdown */}
              <div className="flex items-center gap-2">
                <label className="hidden md:block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  Commercial Connecté :
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
              <div className="h-9 w-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-550 relative hover:text-brand-blue hover:bg-slate-50 transition-all cursor-pointer shadow-2xs">
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-red shadow-[0_0_6px_#a61b1b]" />
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
