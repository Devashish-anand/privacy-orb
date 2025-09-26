import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className={`flex items-center gap-2 font-bold text-xl transition-all duration-300 hover:scale-105 ${className}`}
    >
      <div className="p-2 bg-gradient-primary rounded-lg shadow-lg">
        <Shield className="w-6 h-6 text-white" />
      </div>
      <span className="bg-gradient-cyber bg-clip-text text-transparent">
        CyberGuard
      </span>
    </button>
  );
};