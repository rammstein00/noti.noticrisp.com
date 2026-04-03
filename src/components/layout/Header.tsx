import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, DollarSign, LogIn } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { UserMenu } from '../auth/UserMenu';
import { LoginModal } from '../auth/LoginModal';
import { RegisterModal } from '../auth/RegisterModal';

export default function Header() {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <header className="bg-[#cc0000] text-white h-16 flex items-center justify-between px-6 shrink-0 z-40">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold italic tracking-tighter">
            NotiCrisp<span className="text-sm font-normal not-italic">.com</span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link 
            to="/links/create" 
            className="flex items-center gap-2 text-sm font-medium hover:text-gray-200 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Acortar Enlace</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-sm font-medium">
            <DollarSign className="w-4 h-4" />
            Saldo total: <span className="font-bold">$6.07</span>
          </div>

          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          )}
        </div>
      </header>

      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }} 
      />
      
      <RegisterModal 
        isOpen={showRegister} 
        onClose={() => setShowRegister(false)} 
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }} 
      />
    </>
  );
}
