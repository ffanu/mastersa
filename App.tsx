
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ModuleView from './components/ModuleView';
import Table from './components/Table';
import { ModuleType, Employee, Transaction, Permit, Project, Task } from './types';

const INITIAL_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Ahmad Subarjo', position: 'Pengembang Senior', department: 'TI', joinDate: '15-01-2022', status: 'Active' },
  { id: '2', name: 'Siti Aminah', position: 'Manajer SDM', department: 'SDM', joinDate: '10-06-2021', status: 'Active' },
  { id: '3', name: 'Budi Santoso', position: 'Akuntan', department: 'Keuangan', joinDate: '22-03-2023', status: 'Active' },
  { id: '4', name: 'Diana Lestari', position: 'Penasihat Hukum', department: 'Hukum', joinDate: '05-11-2022', status: 'On Leave' },
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'PRJ001',
    name: 'Migrasi Cloud Nexus',
    manager: 'Ahmad Subarjo',
    deadline: '15-02-2024',
    progress: 65,
    status: 'Active',
    tasks: [
      { id: 'T1', title: 'Pengaturan Infrastruktur', assignee: 'Ahmad Subarjo', deadline: '01-12-2023', status: 'Completed', priority: 'High' },
      { id: 'T2', title: 'Migrasi Database', assignee: 'Budi Santoso', deadline: '10-01-2024', status: 'In Progress', priority: 'High' },
      { id: 'T3', title: 'Audit Keamanan', assignee: 'Diana Lestari', deadline: '01-02-2024', status: 'Pending', priority: 'Medium' },
    ]
  },
  {
    id: 'PRJ002',
    name: 'Aplikasi Mobile ERP',
    manager: 'Siti Aminah',
    deadline: '20-05-2024',
    progress: 15,
    status: 'Active',
    tasks: [
      { id: 'T4', title: 'Prototipe Desain UI', assignee: 'Jane Doe', deadline: '15-01-2024', status: 'In Progress', priority: 'High' },
    ]
  }
];

const mockTransactions: Transaction[] = [
  { id: 'TX001', date: '25-10-2023', description: 'Pembayaran Sewa Kantor', amount: 75000000, type: 'Expense', category: 'Operasional' },
  { id: 'TX002', date: '24-10-2023', description: 'Pembayaran Proyek Client Alpha', amount: 180000000, type: 'Income', category: 'Layanan' },
  { id: 'TX003', date: '23-10-2023', description: 'Pembelian Workstation Baru', amount: 22500000, type: 'Expense', category: 'Aset' },
];

const mockPermits: Permit[] = [
  { id: 'P01', name: 'Izin Mendirikan Bangunan (IMB)', expiryDate: '31-12-2025', status: 'Valid', issuingAuthority: 'Pemkot Jakarta' },
  { id: 'P02', name: 'Izin Lingkungan (AMDAL)', expiryDate: '30-11-2023', status: 'Expiring', issuingAuthority: 'Kementerian LHK' },
  { id: 'P03', name: 'Nomor Induk Berusaha (NIB)', expiryDate: '15-05-2028', status: 'Valid', issuingAuthority: 'OSS' },
];

const formatIDR = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
};

const ProgressBar: React.FC<{ progress: number; color?: string }> = ({ progress, color = 'bg-primary' }) => (
  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
    <div className={`${color} h-full rounded-full transition-all duration-1000`} style={{ width: `${progress}%` }}></div>
  </div>
);

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(INITIAL_PROJECTS[0].id);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);

  const activeProject = useMemo(() => 
    projects.find(p => p.id === selectedProjectId) || projects[0],
    [projects, selectedProjectId]
  );

  const handleBulkStatusUpdate = (newStatus: Task['status']) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== selectedProjectId) return p;
      return {
        ...p,
        tasks: p.tasks.map(t => 
          selectedTaskIds.includes(t.id) ? { ...t, status: newStatus } : t
        )
      };
    }));
    setSelectedTaskIds([]);
  };

  const handleBulkAssigneeUpdate = (newAssignee: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== selectedProjectId) return p;
      return {
        ...p,
        tasks: p.tasks.map(t => 
          selectedTaskIds.includes(t.id) ? { ...t, assignee: newAssignee } : t
        )
      };
    }));
    setSelectedTaskIds([]);
  };

  const renderContent = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD:
        return <Dashboard />;
      
      case ModuleType.PROJECTS:
        return (
          <ModuleView 
            title="Portofolio Proyek" 
            context="Manajemen Proyek / Alur Kerja Agile"
            data={projects}
            actions={<button className="px-3 py-1.5 bg-[#007bff] text-white rounded text-[10px] font-bold shadow-sm hover:bg-[#0069d9] uppercase tracking-wider">+ PROYEK BARU</button>}
          >
            <div className="space-y-6 pb-24 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <button 
                    key={project.id}
                    onClick={() => {
                      setSelectedProjectId(project.id);
                      setSelectedTaskIds([]);
                    }}
                    className={`text-left rounded border bg-white shadow-sm transition-all overflow-hidden ${
                      selectedProjectId === project.id
                        ? 'border-[#007bff] ring-1 ring-[#007bff]' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className={`h-1 ${project.progress > 80 ? 'bg-success' : 'bg-primary'}`}></div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm tracking-tight">{project.name}</h4>
                          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Manajer: {project.manager}</span>
                        </div>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded border font-bold uppercase ${
                          project.status === 'Active' ? 'border-success text-success' : 'border-warning text-warning'
                        }`}>{project.status === 'Active' ? 'Aktif' : project.status}</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-[9px] font-bold text-gray-400">
                           <span>KEMAJUAN</span>
                           <span className="text-gray-700">{project.progress}%</span>
                        </div>
                        <ProgressBar progress={project.progress} color={project.progress > 80 ? 'bg-success' : 'bg-primary'} />
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                          <span className="text-[9px] font-bold text-gray-400 uppercase">TENGGAT: {project.deadline}</span>
                          <div className="flex -space-x-1">
                            {[1, 2, 3].map(i => (
                              <img key={i} src={`https://picsum.photos/20/20?random=${project.id}${i}`} className="w-5 h-5 rounded-full border border-white shadow-xs" alt="team" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden mt-8">
                <div className="px-4 py-2 bg-[#f8f9fa] border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Manajemen Tugas</h3>
                  <button className="text-[10px] font-bold text-[#007bff] hover:underline">+ TAMBAH TUGAS</button>
                </div>
                
                <div className="p-4 space-y-4">
                  {selectedTaskIds.length > 0 && (
                    <div className="bg-[#343a40] text-white p-3 rounded shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-300 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-r border-gray-600 pr-4">
                          {selectedTaskIds.length} Dipilih
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] font-bold text-gray-500 uppercase">Status:</span>
                          {(['Pending', 'In Progress', 'Completed'] as Task['status'][]).map(status => (
                            <button 
                              key={status}
                              onClick={() => handleBulkStatusUpdate(status)}
                              className="text-[9px] font-bold bg-[#4b545c] hover:bg-[#007bff] px-2 py-1 rounded transition-colors uppercase"
                            >
                              {status === 'Pending' ? 'Menunggu' : status === 'In Progress' ? 'Proses' : 'Selesai'}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center space-x-2 pl-4 border-l border-gray-600">
                          <span className="text-[9px] font-bold text-gray-500 uppercase">Petugas:</span>
                          <select 
                            onChange={(e) => handleBulkAssigneeUpdate(e.target.value)}
                            className="bg-[#4b545c] text-[9px] font-bold border-none rounded px-2 py-1 outline-none cursor-pointer"
                            defaultValue=""
                          >
                            <option value="" disabled>Anggota...</option>
                            {INITIAL_EMPLOYEES.map(emp => (
                              <option key={emp.id} value={emp.name}>{emp.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedTaskIds([])}
                        className="text-[10px] font-bold text-red-400 hover:text-white uppercase tracking-tighter"
                      >
                        ✕ Batal
                      </button>
                    </div>
                  )}

                  <Table<Task> 
                    data={activeProject.tasks} 
                    selectable
                    selectedIds={selectedTaskIds}
                    onSelectionChange={setSelectedTaskIds}
                    getRowId={(t) => t.id}
                    columns={[
                      { header: 'Nama Tugas', accessor: 'title' },
                      { header: 'Petugas', accessor: 'assignee' },
                      { header: 'Tenggat', accessor: 'deadline' },
                      { header: 'Prioritas', accessor: (t) => (
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                          t.priority === 'High' ? 'border-danger text-danger' : 
                          t.priority === 'Medium' ? 'border-warning text-warning' : 'border-info text-info'
                        }`}>
                          {t.priority === 'High' ? 'Tinggi' : t.priority === 'Medium' ? 'Sedang' : 'Rendah'}
                        </span>
                      )},
                      { header: 'Status', accessor: (t) => (
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tighter ${
                          t.status === 'Completed' ? 'bg-success text-white' : 
                          t.status === 'In Progress' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {t.status === 'Completed' ? 'Selesai' : t.status === 'In Progress' ? 'Proses' : 'Menunggu'}
                        </span>
                      )}
                    ]} 
                  />
                </div>
              </div>
            </div>
          </ModuleView>
        );

      case ModuleType.HRD:
        return (
          <ModuleView 
            title="Basis Data Karyawan" 
            context="SDM / Departemen Sumber Daya Manusia"
            data={INITIAL_EMPLOYEES}
            actions={<button className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider shadow-sm">+ TAMBAH KARYAWAN</button>}
          >
            <Table<Employee> 
              data={INITIAL_EMPLOYEES} 
              columns={[
                { header: 'Nama', accessor: 'name' },
                { header: 'Jabatan', accessor: 'position' },
                { header: 'Departemen', accessor: 'department' },
                { header: 'Status', accessor: (emp) => (
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    emp.status === 'Active' ? 'bg-success text-white' : 'bg-gray-300 text-gray-700'
                  }`}>
                    {emp.status === 'Active' ? 'Aktif' : 'Cuti'}
                  </span>
                )}
              ]} 
            />
          </ModuleView>
        );

      case ModuleType.FINANCE:
        return (
          <ModuleView 
            title="Buku Besar Kas" 
            context="Keuangan / Arus Kas Perusahaan"
            data={mockTransactions}
            actions={<button className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider shadow-sm">+ ENTRI BARU</button>}
          >
            <Table<Transaction> 
              data={mockTransactions} 
              columns={[
                { header: 'Tanggal', accessor: 'date' },
                { header: 'Deskripsi', accessor: 'description' },
                { header: 'Jumlah', accessor: (tx) => (
                  <span className={`font-bold text-sm ${tx.type === 'Income' ? 'text-success' : 'text-danger'}`}>
                    {tx.type === 'Income' ? '+' : '-'}{formatIDR(tx.amount)}
                  </span>
                )},
                { header: 'Kategori', accessor: 'category' }
              ]} 
            />
          </ModuleView>
        );

      case ModuleType.ACCOUNTING:
        return (
          <ModuleView 
            title="Pelaporan Keuangan" 
            context="Akuntansi / Buku Besar Umum"
            data={{ assets: 5000000000, liabilities: 2000000000, equity: 3000000000 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 border border-gray-300 border-l-4 border-l-info shadow-sm">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Aset Lancar</p>
                <p className="text-xl font-bold text-gray-800">{formatIDR(5000000000)}</p>
              </div>
              <div className="bg-white p-4 border border-gray-300 border-l-4 border-l-danger shadow-sm">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Total Kewajiban</p>
                <p className="text-xl font-bold text-gray-800">{formatIDR(2000000000)}</p>
              </div>
              <div className="bg-white p-4 border border-gray-300 border-l-4 border-l-success shadow-sm">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Ekuitas Pemilik</p>
                <p className="text-xl font-bold text-gray-800">{formatIDR(3000000000)}</p>
              </div>
            </div>
            <div className="bg-white p-6 border border-gray-300 rounded shadow-sm">
              <h3 className="font-bold text-gray-700 text-[11px] border-b border-gray-100 pb-2 mb-4 uppercase tracking-wider">Ikhtisar Neraca Keuangan</h3>
              <p className="text-gray-600 text-sm leading-relaxed italic">Data keuangan saat ini sedang dalam proses rekonsiliasi untuk periode Q4. Laporan final akan dihasilkan secara otomatis setelah validasi AI.</p>
            </div>
          </ModuleView>
        );

      case ModuleType.LEGAL:
        return (
          <ModuleView 
            title="Kepatuhan Regulasi" 
            context="Hukum / Izin Perusahaan"
            data={mockPermits}
            actions={<button className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider shadow-sm">UNGGAH DOKUMEN</button>}
          >
            <Table<Permit> 
              data={mockPermits} 
              columns={[
                { header: 'Nama Izin', accessor: 'name' },
                { header: 'Otoritas', accessor: 'issuingAuthority' },
                { header: 'Tgl Kedaluwarsa', accessor: 'expiryDate' },
                { header: 'Status', accessor: (p) => (
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    p.status === 'Valid' ? 'bg-success text-white' : 
                    p.status === 'Expiring' ? 'bg-warning text-white' : 'bg-danger text-white'
                  }`}>
                    {p.status === 'Valid' ? 'Berlaku' : p.status === 'Expiring' ? 'Hampir Habis' : 'Habis'}
                  </span>
                )}
              ]} 
            />
          </ModuleView>
        );

      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeModule={activeModule} setModule={setActiveModule}>
      {renderContent()}
    </Layout>
  );
};

export default App;
