import { mockLinks } from '../data/mock';
import { Search, Copy, BarChart2, DollarSign } from 'lucide-react';

export default function Links() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#0c5562]">Enlaces</h1>
        <div className="flex gap-2">
          <button className="bg-[#0c5562] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#0a4650] transition-colors">
            Acortar URL
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-600 transition-colors">
            Sugerencias Diarias
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-600 transition-colors">
            Trending Links
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-600 transition-colors">
            Estadísticas
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            Mostrar
            <select className="border border-gray-300 rounded px-2 py-1 bg-white">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            registros
          </div>
          <div className="relative">
            <input
              type="text"
              className="border border-gray-300 rounded-md pl-8 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-[#0c5562]"
              placeholder="Buscar..."
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold">Fecha ↕</th>
                <th className="px-4 py-3 font-semibold">Llamada a la acción (CTA) ↕</th>
                <th className="px-4 py-3 font-semibold">URL Acortada ↕</th>
                <th className="px-4 py-3 font-semibold">Visitas ↕</th>
                <th className="px-4 py-3 font-semibold">URL Original ↕</th>
                <th className="px-4 py-3 font-semibold text-center">Estadísticas</th>
                <th className="px-4 py-3 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockLinks.map((link, idx) => (
                <tr key={link.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{link.date}</td>
                  <td className="px-4 py-3 max-w-xs truncate" title={link.cta}>{link.cta}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Copy className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                      <a href={link.shortUrl} className="text-blue-600 hover:underline truncate max-w-[200px] block">
                        {link.shortUrl}
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">{link.visits}</td>
                  <td className="px-4 py-3">
                    <a href={link.originalUrl} className="text-blue-600 hover:underline truncate max-w-[200px] block">
                      {link.originalUrl}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="bg-[#0c5562] text-white px-2 py-1 rounded text-xs flex items-center gap-1 hover:bg-[#0a4650]">
                        <BarChart2 className="w-3 h-3" /> Visitas
                      </button>
                      <button className="bg-[#0c5562] text-white px-2 py-1 rounded text-xs flex items-center gap-1 hover:bg-[#0a4650]">
                        <DollarSign className="w-3 h-3" /> Ganancias
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-400 cursor-pointer">
                    ⋮⋮⋮
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600 bg-gray-50">
          <div>Mostrando registros del 1 al 10 de un total de 25 registros</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50">Anterior</button>
            <button className="px-3 py-1 bg-[#0c5562] text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">Siguiente</button>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-[#0c5562] text-white px-4 py-2 font-medium">
          Sobre las Visitas
        </div>
        <div className="p-4 text-sm text-gray-700">
          <ul className="list-disc pl-5 space-y-2">
            <li>Las visitas de Cuba no son válidas, por lo tanto no suman en el contador de visitas ni en las estadísticas.</li>
            <li>Una visita válida es una visita desde una sola dirección IP por Enlace en un período de 24 horas y se cuenta cuando el visitante pasa 10 segundos en la página temporal, no antes.</li>
            <li>En caso de que detectemos algun método artificial o fraudulento para generar visitas, su cuenta quedará eliminada.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
