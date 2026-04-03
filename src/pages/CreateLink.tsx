import { useState } from 'react';
import { Scissors, Sparkles, Eye } from 'lucide-react';

export default function CreateLink() {
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=VV7YqvpOD6c');
  const [cta, setCta] = useState('nuevo');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0c5562]">Creación de enlace</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enlace *</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0c5562]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Llamada a la acción *</label>
              <span className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">Emoji Selector ~</span>
            </div>
            <div className="relative">
              <textarea
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0c5562] resize-none"
              />
              <button className="absolute bottom-2 right-2 bg-green-500 text-white px-3 py-1 rounded text-xs font-medium flex items-center gap-1 hover:bg-green-600">
                Sugerir <Sparkles className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="bg-[#0c5562] text-white px-6 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#0a4650]">
              <Scissors className="w-4 h-4" />
              Acortar!
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 hover:bg-green-600">
              IA <Sparkles className="w-4 h-4" />
            </button>
            <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
              Previsualizar
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex gap-2 mb-4">
            <select className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none">
              <option>Mejorar Imagen con IA</option>
            </select>
            <button className="bg-green-500 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 hover:bg-green-600">
              Aplicar <Sparkles className="w-4 h-4" />
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
            <img 
              src="https://picsum.photos/seed/dota2/600/300" 
              alt="Preview" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-gray-900 leading-tight">
                ES INCREIBLE EL NIVEL Q TIENE - YANDEX VS PARIVISION - GAME 2 - B02 - DIA 1 - ESL ONE - DOTA 2
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                ES INCREIBLE EL NIVEL Q TIENE - YANDEX VS PARIVISION - GAME 2 - B02 - DIA 1 - ESL ONE - DOTA 2
              </p>
              <div className="text-xs font-medium text-gray-400 uppercase">
                NOTICRISP.COM
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-1 hover:bg-green-600">
              Nueva Imagen con IA <Sparkles className="w-4 h-4" />
            </button>
            <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-1 hover:bg-blue-600">
              <Eye className="w-4 h-4" /> Ver Galería IA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
