import { Wifi } from 'lucide-react';

const MenuHeader = () => {
  return (
    <header className="relative overflow-hidden bg-card py-8 px-4">
      {/* Basketball court lines decoration */}
      <div className="absolute inset-0 court-pattern opacity-30" />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo/Name */}
        <div className="mb-2">
          <span className="text-5xl">🏀</span>
        </div>
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
