import { AlertCircle } from 'lucide-react';

const allergens = [
  { name: 'Glutine', icon: '🌾', info: 'Farina, impasti pizza, pane' },
  { name: 'Lattosio', icon: '🥛', info: 'Mozzarella, formaggi, panna' },
  { name: 'Uova', icon: '🥚', info: 'Maionese, salse' },
  { name: 'Frutta a guscio', icon: '🥜', info: 'Noci, nocciole' },
  { name: 'Sedano', icon: '🥬', info: 'Verdure, brodi' },
  { name: 'Pesce', icon: '🐟', info: 'Alici, tonno' },
  { name: 'Crostacei', icon: '🦐', info: 'Gamberi' },
  { name: 'Soia', icon: '🫘', info: 'Salse, oli' },
];

const AllergensBox = () => {
  return (
    <div className="mx-4 mb-8 p-4 bg-card border border-border rounded-lg">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
        <AlertCircle className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg text-primary tracking-wide">
          INFORMAZIONI ALLERGENI
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {allergens.map((allergen) => (
          <div key={allergen.name} className="flex items-start gap-2">
            <span className="text-lg">{allergen.icon}</span>
            <div>
              <p className="text-sm font-medium text-foreground">{allergen.name}</p>
              <p className="text-xs text-muted-foreground">{allergen.info}</p>
            </div>
          </div>
        ))}
      </div>
      
      <p className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground text-center">
        Per info dettagliate sugli allergeni, chiedi al nostro staff 🏀
      </p>
    </div>
  );
};

export default AllergensBox;
