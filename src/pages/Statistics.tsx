import { mockChartData, mockDayOfWeekData, mockCountryData } from '../data/mock';
import { Calendar } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function Statistics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#0c5562]">Estadísticas de visitas</h1>
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-600 shadow-sm">
          <Calendar className="w-4 h-4" />
          <span>02 Apr 26 - 02 Apr 26</span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex overflow-hidden w-64">
          <div className="bg-[#8bc34a] p-4 flex items-center justify-center w-16 shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div className="p-3 flex-1 text-center">
            <div className="text-2xl font-light text-[#8bc34a]">459</div>
            <div className="text-xs text-gray-500 font-medium uppercase">visitas</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-center font-bold text-gray-800 mb-6">Visitas por Día</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[{ date: '2026-04-02', visits: 459 }]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-center font-bold text-gray-800 mb-6">Visitas por Hora del Día</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visits" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-center font-bold text-gray-800 mb-6">Visitas por Dia de la Semana</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockDayOfWeekData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visits" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-center font-bold text-gray-800 mb-6">Visitas por Paises</h2>
            <div className="relative h-[300px] bg-blue-50/30 rounded-lg border border-blue-100 flex items-center justify-center overflow-hidden">
               <svg viewBox="0 0 800 400" className="w-full h-full opacity-50">
                  <path d="M150,100 Q200,50 300,80 T450,120 T600,80 T750,150" fill="none" stroke="#cbd5e1" strokeWidth="2"/>
                  <path d="M100,200 Q250,150 400,250 T700,200" fill="none" stroke="#cbd5e1" strokeWidth="2"/>
                  <circle cx="200" cy="150" r="40" fill="#3b82f6" opacity="0.6"/>
                  <circle cx="220" cy="180" r="20" fill="#1d4ed8" opacity="0.8"/>
                  <text x="400" y="200" textAnchor="middle" fill="#94a3b8" className="text-sm">Mapa Interactivo (Mock)</text>
               </svg>
            </div>
          </div>
          <div>
            <h2 className="text-center font-bold text-gray-800 mb-6">Visitas por Paises</h2>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockCountryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name }) => name}
                    labelLine={true}
                  >
                    {mockCountryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
