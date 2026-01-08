import { Wifi } from 'lucide-react';
import logoPlayground from '@/assets/logo-playground.jpeg';

const MenuHeader = () => {
  return (
    <header className="relative overflow-hidden bg-card py-8 px-4">
      {/* Basketball court lines decoration */}
      <div className="absolute inset-0 court-pattern opacity-30" />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-4">
          <img 
            src={logoPlayground} 
            alt="Playground Grottaferrata" 
            className="w-40 h-40 mx-auto rounded-full object-cover shadow-lg border-2 border-primary/30"
          />
        </div>
        
        {/* WiFi info */}
        <div className="mt-4 inline-flex items-center gap-2 bg-secondary/50 rounded-full px-4 py-2 text-xs text-muted-foreground">
          <Wifi className="w-4 h-4" />
          <span>WiFi: <span className="text-foreground font-medium">Playground2024</span></span>
        </div>
      </div>
    </header>
  );
};

export default MenuHeader;
