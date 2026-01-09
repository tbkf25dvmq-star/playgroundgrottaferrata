import { Instagram, MapPin, Clock, Phone } from 'lucide-react';

const MenuFooter = () => {
  return (
    <footer className="bg-card border-t border-border py-8 px-4 mt-8">
      <div className="text-center space-y-4">
        {/* Hours */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Mar-Dom: 17:00 - 01:00</span>
        </div>
        
        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Viale I Maggio, 9 - Grottaferrata (RM)</span>
        </div>
        
        {/* Phone */}
        <a 
          href="tel:069456462"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span className="text-sm">06 945 6462</span>
        </a>
        
        {/* Social */}
        <a 
          href="https://instagram.com/playground_grottaferrata" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <Instagram className="w-5 h-5" />
          <span className="text-sm font-medium">@playground_grottaferrata</span>
        </a>
      </div>
    </footer>
  );
};

export default MenuFooter;
