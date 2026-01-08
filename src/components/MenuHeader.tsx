import { Wifi } from 'lucide-react';
import logoPlayground from '@/assets/logo-playground.jpeg';

const MenuHeader = () => {
  return (
    <header className="relative overflow-hidden bg-card">
      {/* Logo as full-width banner with fade */}
      <div className="relative w-full h-48 md:h-64">
        <img 
          src={logoPlayground} 
          alt="Playground Grottaferrata" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 pb-8 -mt-8">
        <h1 className="font-display text-5xl md:text-6xl text-primary tracking-wider">
          PLAYGROUND
        </h1>
        <p className="text-muted-foreground mt-1 text-sm uppercase tracking-widest">
          Pizza • Cocktails • Good Vibes
        </p>
        
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
