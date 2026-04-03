import { Link } from 'react-router-dom';
import { PlusCircle, DollarSign, Power } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-[#cc0000] text-white h-16 flex items-center justify-between px-6 shrink-0">
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
          Acortar Enlace
        </Link>

        <div className="flex items-center gap-2 text-sm font-medium">
          <DollarSign className="w-4 h-4" />
          Saldo total: <span className="font-bold">$6.07</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:text-gray-200 transition-colors">
          <Power className="w-4 h-4" />
          <span className="text-sm font-medium uppercase">ILL</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
}
