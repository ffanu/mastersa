
import React from 'react';

interface ModuleViewProps {
  title: string;
  context: string;
  data: any;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const ModuleView: React.FC<ModuleViewProps> = ({ title, context, data, children, actions }) => {
  return (
    <div className="space-y-6">
      {/* Header Modul */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-tight">{title}</h2>
        <div className="flex space-x-2">
           {actions}
        </div>
      </div>

      {/* Konten Utama - Sekarang Lebar Penuh tanpa Sidebar AI */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default ModuleView;
