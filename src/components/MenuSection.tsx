import MenuItemCard from './MenuItemCard';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  tag?: string;
}

interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

interface MenuSectionProps {
  category: MenuCategory;
}

// Extras per i burger
const burgerExtras = [
  { name: 'Bacon', price: 2 },
  { name: 'Lardo di colonnata', price: 2 },
  { name: 'Pomodori secchi', price: 2 },
  { name: 'Cipolle caramellate', price: 2 },
  { name: 'Verdure', price: 2 },
  { name: 'Porcini', price: 2 },
  { name: 'Nduja', price: 2 },
];

const MenuSection = ({ category }: MenuSectionProps) => {
  const isSmashCategory = category.name.toLowerCase().includes('smash');
  const isBurgerCategory = category.name.toLowerCase().includes('burger') && !isSmashCategory;

  return (
    <section className="py-6 px-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{category.icon}</span>
        <h2 className="font-display text-3xl text-foreground tracking-wide">
          {category.name.toUpperCase()}
        </h2>
      </div>
      
      {/* Banner pollo fritto per Smash */}
      {isSmashCategory && (
        <div className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm text-center text-foreground font-medium">
            🍗 Prova il <span className="text-primary font-bold">Pollo Fritto Croccante</span> a soli <span className="text-primary font-bold">+€4</span>
          </p>
        </div>
      )}
      
      <div className="space-y-3">
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Box aggiunte burger */}
      {isBurgerCategory && (
        <div className="mt-6 p-4 bg-card border border-border rounded-lg">
          <h3 className="font-display text-lg text-primary mb-3 border-b border-primary/50 pb-2">
            AGGIUNTE AI BURGER
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {burgerExtras.map((extra) => (
              <div key={extra.name} className="flex justify-between items-center text-sm">
                <span className="text-foreground">{extra.name}</span>
                <span className="text-muted-foreground">€{extra.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default MenuSection;
