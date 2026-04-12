import React, { useState, useEffect } from 'react';
import { Calendar, Loader2, RefreshCw } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

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
  const [dailyData, setDailyData] = useState<DailyStat[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyStat[]>([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCharts = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('https://noticrisp.com/api/noti/adskeeper_charts.php');
      const json = await response.json();
      
      if (json.success && json.data) {
        setDailyData(json.data);
        
        // Sum total visits
        const total = json.data.reduce((acc: number, curr: DailyStat) => acc + curr.visitas, 0);
        setTotalVisits(total);
        
        // Group by week (simple 7-day chunking for the last 30 days)
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
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#11141D] border border-gray-800 p-3 rounded-lg shadow-xl">
          <p className="text-gray-400 mb-1">{label}</p>
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Estadísticas Detalladas</h1>
          <p className="text-gray-400 text-sm">Resumen de vistas de los últimos 30 días</p>
        </div>
        <button 
          onClick={fetchCharts} 
          disabled={isLoading}
          className="flex items-center gap-2 bg-[#11141D] border border-gray-800 hover:bg-gray-800 rounded-xl px-4 py-2 text-sm text-gray-300 transition-colors disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          <span>Actualizar</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl">
          {error}
        </div>
      )}

      {/* Top Value */}
      <div className="flex justify-center">
        <div className="bg-[#11141D] rounded-2xl shadow-sm border border-gray-800 flex overflow-hidden w-72">
          <div className="bg-blue-600 p-4 flex items-center justify-center w-20 shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div className="p-4 flex-1 text-center">
            <div className="text-3xl font-bold text-white">
              {isLoading ? '...' : totalVisits.toLocaleString()}
            </div>
            <div className="text-xs text-blue-500 font-bold uppercase mt-1">visitas totales (30d)</div>
          </div>
        </div>
      </div>

      {/* 1. Visitas por Día (Line Chart) */}
      <div className="bg-[#11141D] rounded-2xl shadow-lg border border-gray-800 p-6">
        <h2 className="text-center font-bold text-white mb-6">Tendencia Diaria de Visitas (Línea)</h2>
        <div className="h-[350px]">
          {isLoading ? (
            <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="date" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} tickFormatter={(date) => date.split('-')[2]} />
                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="visitas" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#11141d', stroke: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. Visitas por Día (Bar Chart) */}
        <div className="bg-[#11141D] rounded-2xl shadow-lg border border-gray-800 p-6">
          <h2 className="text-center font-bold text-white mb-6">Volumen Diario (Barras)</h2>
          <div className="h-[300px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData.slice(-14)}> {/* Muestra últimos 14 días para que no se amontonen */}
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="date" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={(date) => date.slice(5)} />
                  <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1f2937' }} />
                  <Bar dataKey="visitas" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* 3. Visitas por Semana */}
        <div className="bg-[#11141D] rounded-2xl shadow-lg border border-gray-800 p-6">
          <h2 className="text-center font-bold text-white mb-6">Visitas por Semana</h2>
          <div className="h-[300px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="week" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#11141D', borderColor: '#1f2937', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#10b981' }}
                    cursor={{ fill: '#1f2937' }}
                  />
                  <Bar dataKey="visitas" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
