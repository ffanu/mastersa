
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', revenue: 45000000, expenses: 24000000 },
  { name: 'Feb', revenue: 38000000, expenses: 19000000 },
  { name: 'Mar', revenue: 52000000, expenses: 48000000 },
  { name: 'Apr', revenue: 47000000, expenses: 31000000 },
  { name: 'Mei', revenue: 61000000, expenses: 42000000 },
  { name: 'Jun', revenue: 58000000, expenses: 35000000 },
];

const formatIDR = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* AdminLTE Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pendapatan', value: formatIDR(1245000000), icon: '📈', barColor: 'bg-blue-600' },
          { label: 'Laba Bersih', value: formatIDR(452000000), icon: '💰', barColor: 'bg-emerald-600' },
          { label: 'Karyawan Aktif', value: '48', icon: '👥', barColor: 'bg-orange-600' },
          { label: 'Izin Menunggu', value: '12', icon: '⚖️', barColor: 'bg-red-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white flex shadow-sm rounded border border-gray-200 overflow-hidden h-20">
            <div className={`w-16 flex items-center justify-center text-2xl text-white ${stat.barColor}`}>
              {stat.icon}
            </div>
            <div className="flex-1 p-3 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{stat.label}</span>
              <span className="text-lg font-bold text-gray-800">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded border border-gray-300 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-base font-bold text-[#495057]">Pendapatan vs Pengeluaran</h3>
          </div>
          <div className="p-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dee2e6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11}} tickFormatter={(val) => `Rp ${val/1000000}jt`} />
                <Tooltip 
                  formatter={(value: number) => formatIDR(value)}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #dee2e6' }}
                />
                <Bar dataKey="revenue" name="Pendapatan" fill="#007bff" radius={[2, 2, 0, 0]} />
                <Bar dataKey="expenses" name="Pengeluaran" fill="#ced4da" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded border border-gray-300 shadow-sm overflow-hidden">
           <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-base font-bold text-[#495057]">Tren Arus Kas</h3>
          </div>
          <div className="p-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007bff" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#007bff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dee2e6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11}} tickFormatter={(val) => `Rp ${val/1000000}jt`} />
                <Tooltip formatter={(value: number) => formatIDR(value)} />
                <Area type="monotone" dataKey="revenue" name="Pendapatan" stroke="#007bff" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Aktivitas Terbaru - Sekarang Lebar Penuh */}
      <div className="pb-8">
         <div className="bg-white rounded border border-gray-300 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-[#f8f9fa]">
               <h3 className="text-base font-bold text-[#495057]">Aktivitas Terbaru</h3>
            </div>
            <div className="divide-y divide-gray-200">
               {[
                 { action: 'Pembayaran Gaji Diproses', module: 'SDM', time: '2 jam yang lalu', status: 'Selesai', color: 'text-success' },
                 { action: 'Izin Lingkungan Diperbarui', module: 'Hukum', time: '5 jam yang lalu', status: 'Menunggu', color: 'text-warning' },
                 { action: 'Laporan Pajak Q3 Diserahkan', module: 'Akuntansi', time: '1 hari yang lalu', status: 'Selesai', color: 'text-success' },
                 { action: 'Pembelian Aset Baru (Server)', module: 'Keuangan', time: '2 hari yang lalu', status: 'Disetujui', color: 'text-primary' },
                 { action: 'Audit Proyek Migrasi Cloud', module: 'Proyek', time: '3 hari yang lalu', status: 'Selesai', color: 'text-success' },
               ].map((act, i) => (
                 <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                       <span className={`text-xs ${act.color}`}>●</span>
                       <div>
                          <p className="text-sm font-bold text-gray-700">{act.action}</p>
                          <p className="text-[10px] text-gray-500 uppercase font-semibold">{act.module} • {act.time}</p>
                       </div>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 border rounded uppercase ${act.status === 'Selesai' ? 'border-success text-success' : 'border-primary text-primary'}`}>
                      {act.status}
                    </span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
