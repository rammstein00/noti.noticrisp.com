import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BridgePage() {
  const { code } = useParams();
  const [countdown, setCountdown] = useState(15);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Validar código en API y obtener la URL original (esto además sumará +1 visita en el backend)
    const fetchTarget = async () => {
      try {
        const response = await fetch(`https://noticrisp.com/api/noti/get_target.php?code=${code}`);
        const data = await response.json();
        
        if (response.ok) {
          setTargetUrl(data.originalUrl);
        } else {
          setError(data.error || 'Enlace no válido o expirado');
        }
      } catch (err) {
        setError('Error al procesar el enlace. Intenta más tarde.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTarget();
  }, [code]);

  useEffect(() => {
    // 2. Iniciar el contador regresivo de 15 a 0
    if (!isLoading && !error && targetUrl && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLoading, error, targetUrl, countdown]);

  const handleRedirect = () => {
    if (targetUrl && countdown === 0) {
      window.location.href = targetUrl;
    }
  };

  // Fake categories for the bridge page navbar
  const categories = [
    'Belleza', 'Celebridades', 'Ciencia', 'Cultura', 
    'Curiosidades', 'Deporte', 'Enigmas', 'Estilo de Vida', 'Health', 'Tech'
  ];

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center">
      {/* Fake News Navigation Bar */}
      <header className="w-full bg-[#3d2780] shadow-md z-10 sticky top-0">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center text-white">
          <div className="text-2xl font-black italic tracking-tighter mb-3 md:mb-0 cursor-pointer hover:opacity-80 transition-opacity">
            NotiFresh<span className="text-sm font-normal not-italic">.com</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-3 text-xs uppercase font-medium tracking-wide">
            {categories.map((cat) => (
              <span key={cat} className="cursor-pointer hover:text-orange-400 transition-colors">
                {cat}
              </span>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 text-[#3d2780]"
            >
              <Loader2 className="w-12 h-12 animate-spin" />
              <p className="font-medium animate-pulse">Cargando artículo seguro...</p>
            </motion.div>
          )}

          {error && (
            <motion.div 
              key="error"
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-red-50 text-red-600 p-8 rounded-2xl max-w-md border border-red-200 text-center shadow-lg"
            >
              <h2 className="text-xl font-bold mb-2">¡Ups! Algo salió mal</h2>
              <p>{error}</p>
            </motion.div>
          )}

          {!isLoading && !error && targetUrl && (
            <motion.div 
              key="content"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="flex flex-col items-center w-full max-w-md bg-white border border-gray-100 p-10 rounded-3xl shadow-2xl text-center z-10"
            >
              <div className="bg-gray-50 rounded-full p-4 mb-6 ring-4 ring-gray-50">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff6b00] to-[#ff3b00] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-inner">
                  {countdown > 0 ? countdown : '0'}
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Tu artículo está casi listo</h1>
              <p className="text-gray-500 mb-8 text-sm">
                Hemos verificado la fuente y protegido el enlace temporalmente.<br/>
                Para continuar leyendo, espera unos instantes.
              </p>

              <button
                onClick={handleRedirect}
                disabled={countdown > 0}
                className={`w-full py-4 text-white font-bold rounded-xl uppercase tracking-wider shadow-lg transition-all transform active:scale-95 ${
                  countdown > 0 
                  ? 'bg-gray-300 cursor-not-allowed shadow-none' 
                  : 'bg-gradient-to-r from-[#ff6b00] to-[#ff3b00] hover:shadow-[#ff6b00]/30 hover:scale-[1.02] cursor-pointer'
                }`}
              >
                {countdown > 0 ? `Artículo completo en: ${countdown} segundos` : 'Ver Artículo ➔'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative background blobs to make it look premium */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </main>

      {/* Footer footer */}
      <footer className="w-full bg-gray-50 py-6 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} NotiFresh. Todos los derechos reservados.
      </footer>
    </div>
  );
}
