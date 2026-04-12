import React, { useState, useEffect } from 'react';
import { Calendar, Loader2, RefreshCw } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';

interface DailyStat {
  date: string;
  visitas: number;
  revenue: number;
}

interface WeeklyStat {
  week: string;
  visitas: number;
}

export default function Statistics() {
  const { token } = useAuth();
  const [dailyData, setDailyData] = useState<DailyStat[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyStat[]>([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCharts = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('https://noticrisp.com/api/noti/adskeeper_charts.php', {
        headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
      });
      const json = await response.json();
      
      if (json.success && json.data) {
        setDailyData(json.data);
        const total = json.data.reduce((acc: number, curr: DailyStat) => acc + curr.visitas, 0);
        setTotalVisits(total);
        
        const weekly: WeeklyStat[] = [];
        for (let i = 0; i < json.data.length; i += 7) {
          const chunk = json.data.slice(i, i + 7);
          const weekVisits = chunk.reduce((acc: number, curr: DailyStat) => acc + curr.visitas, 0);
          
          let weekLabel = chunk[0].date;
          if (chunk.length > 1) {
            weekLabel = `${chunk[0].date.slice(5)} al ${chunk[chunk.length - 1].date.slice(5)}`;
          }
          
          weekly.push({ week: weekLabel, visitas: weekVisits });
        }
        setWeeklyData(weekly);
      } else {
        setError(json.error || 'Error al obtener datos');
      }
    } catch (err) {
      setError('Problema de conexión con la estadística');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharts();
  }, [token]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 p-3 rounded shadow-lg text-sm">
          <p className="text-gray-500 mb-1">{label}</p>
          <p className="text-[#3b82f6] font-bold">
            Visitas: {payload[0].value.toLocaleString()}
          </p>
          {payload[0].payload.revenue !== undefined && (
            <p className="text-[#10b981] font-bold">
              Ganado: ${payload[0].payload.revenue.toFixed(2)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[#0c5562] text-2xl font-bold">Estadísticas de visitas</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-600 shadow-sm">
            <Calendar className="w-4 h-4" />
            <span>Últimos 30 días</span>
          </div>
          <button 
            onClick={fetchCharts} 
            disabled={isLoading}
            className="flex items-center gap-1 text-[#0c5562] hover:text-[#0a4650] transition-colors disabled:opacity-50"
            title="Refrescar estadísticas"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {/* Top Value (NotiFresh style) */}
      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex overflow-hidden w-72">
          <div className="bg-[#8bc34a] p-4 flex items-center justify-center w-20 shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div className="p-4 flex-1 text-center bg-white">
            <div className="text-3xl font-light text-[#8bc34a]">
              {isLoading ? '...' : totalVisits.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-medium uppercase mt-1">visitas totales (30d)</div>
          </div>
        </div>
      </div>

      {/* 1. Visitas por Día (Line Chart) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-center font-bold text-gray-800 mb-6">Visitas por Día</h2>
        <div className="h-[350px]">
          {isLoading ? (
            <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(date) => date.split('-').slice(1).join('-')} angle={-45} textAnchor="end" height={60} />
                <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="visitas" stroke="#38bdf8" strokeWidth={2} dot={{ fill: '#38bdf8', stroke: '#fff', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. Visitas por Día (Detailed Line/Bar) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-center font-bold text-gray-800 mb-6">Volumen de Visitas por Día</h2>
          <div className="h-[300px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData.slice(-14)}> 
                  <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={(date) => date.split('-').slice(1).join('-')} />
                  <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
                  <Bar dataKey="visitas" fill="#38bdf8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* 3. Visitas por Semana */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-center font-bold text-gray-800 mb-6">Visitas por Semana</h2>
          <div className="h-[300px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#e5e7eb" />
                  <XAxis dataKey="week" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="visitas" stroke="#38bdf8" strokeWidth={2} dot={{ fill: '#38bdf8', stroke: '#fff', strokeWidth: 2, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
