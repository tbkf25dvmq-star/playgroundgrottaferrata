import { Instagram, MapPin, Clock } from 'lucide-react';

const MenuFooter = () => {
  return (
    <footer className="bg-card border-t border-border py-8 px-4 mt-8">
      <div className="text-center space-y-4">
        {/* Hours */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Mar-Dom: 18:00 - 01:00</span>
        </div>
        
        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Via del Campo, 42 - Milano</span>
        </div>
        
        {/* Social */}
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <Instagram className="w-5 h-5" />
          <span className="text-sm font-medium">@playground_pizza</span>
        </a>
        
        {/* Allergens notice */}
        <p className="text-xs text-muted-foreground mt-6 max-w-xs mx-auto">
          Per informazioni su allergeni e intolleranze, chiedi al nostro staff 🏀
        </p>
      </div>
    </footer>
  );
};

export default MenuFooter;
