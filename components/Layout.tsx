
import React from 'react';
import { ModuleType } from '../types';

interface SidebarItemProps {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-4 py-3 text-sm transition-colors duration-200 border-l-4 ${
      active 
        ? 'bg-[#494e53] text-white border-[#007bff]' 
        : 'text-[#c2c7d0] border-transparent hover:bg-[#494e53] hover:text-white'
    }`}
  >
    <span className="mr-3 text-lg opacity-80">{icon}</span>
    <span className="font-normal">{label}</span>
  </button>
);

interface LayoutProps {
  children: React.ReactNode;
  activeModule: ModuleType;
  setModule: (m: ModuleType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeModule, setModule }) => {
  const getModuleLabel = (type: ModuleType) => {
    switch (type) {
      case ModuleType.DASHBOARD: return 'Dashboard';
      case ModuleType.PROJECTS: return 'Manajemen Proyek';
      case ModuleType.HRD: return 'SDM & Umum';
      case ModuleType.FINANCE: return 'Keuangan';
      case ModuleType.ACCOUNTING: return 'Akuntansi';
      case ModuleType.LEGAL: return 'Hukum & Perizinan';
      default: return type;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f6f9]">
      {/* Sidebar - AdminLTE Dark */}
      <aside className="w-[250px] bg-[#343a40] flex flex-col z-30 shadow-xl">
        <div className="flex items-center px-4 py-3 border-b border-[#4b545c]">
          <div className="w-8 h-8 bg-[#007bff] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
            N
          </div>
          <span className="ml-3 text-xl font-light text-white tracking-tight">Nexus <span className="font-bold">ERP</span></span>
        </div>

        <div className="flex items-center px-4 py-4 border-b border-[#4b545c]">
           <img src="https://picsum.photos/40/40" className="rounded-full w-8 h-8 border border-[#4b545c]" alt="user" />
           <span className="ml-3 text-sm text-[#c2c7d0]">Jane Doe</span>
        </div>

        <nav className="flex-1 mt-4 overflow-y-auto">
          <p className="px-4 py-2 text-[10px] font-bold text-[#c2c7d0] uppercase tracking-wider opacity-50">Navigasi Utama</p>
          <SidebarItem 
            label="Dashboard" 
            icon="📊" 
            active={activeModule === ModuleType.DASHBOARD} 
            onClick={() => setModule(ModuleType.DASHBOARD)} 
          />
          <SidebarItem 
            label="Manajemen Proyek" 
            icon="📁" 
            active={activeModule === ModuleType.PROJECTS} 
            onClick={() => setModule(ModuleType.PROJECTS)} 
          />
          <SidebarItem 
            label="SDM & Umum" 
            icon="👥" 
            active={activeModule === ModuleType.HRD} 
            onClick={() => setModule(ModuleType.HRD)} 
          />
          <SidebarItem 
            label="Keuangan" 
            icon="💰" 
            active={activeModule === ModuleType.FINANCE} 
            onClick={() => setModule(ModuleType.FINANCE)} 
          />
          <SidebarItem 
            label="Akuntansi" 
            icon="📝" 
            active={activeModule === ModuleType.ACCOUNTING} 
            onClick={() => setModule(ModuleType.ACCOUNTING)} 
          />
          <SidebarItem 
            label="Hukum & Perizinan" 
            icon="⚖️" 
            active={activeModule === ModuleType.LEGAL} 
            onClick={() => setModule(ModuleType.LEGAL)} 
          />
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20 shrink-0">
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              ☰
            </button>
            <nav className="hidden sm:flex space-x-2 text-xs text-gray-400">
              <span className="hover:text-gray-600 cursor-pointer">Beranda</span>
              <span>/</span>
              <span className="text-gray-600 font-semibold uppercase tracking-tighter">
                {getModuleLabel(activeModule)}
              </span>
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <span className="absolute -top-1 -right-1 bg-red-500 text-[9px] text-white px-1 rounded-full">3</span>
              <span className="text-gray-400">🔔</span>
            </div>
            <div className="relative">
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-[9px] text-white px-1 rounded-full">15</span>
              <span className="text-gray-400">💬</span>
            </div>
            <button className="text-gray-400">⤢</button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#f4f6f9]">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-light text-[#212529]">
               {getModuleLabel(activeModule)}
            </h1>
          </div>
          {children}
        </main>
        
        {/* Footer */}
        <footer className="h-12 bg-white border-t border-gray-200 px-6 flex items-center justify-between text-xs text-gray-500 shrink-0">
          <div>
            <strong>Hak Cipta &copy; 2024 <span className="text-blue-600">NexusERP</span>.</strong> Seluruh hak cipta dilindungi.
          </div>
          <div>
            <b>Versi</b> 4.0.0
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
