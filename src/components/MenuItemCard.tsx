interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  tag?: string;
}

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  return (
    <div className="bg-card rounded-xl p-4 border border-border hover:border-primary/30 transition-all">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-foreground">{item.name}</h3>
            {item.tag && (
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                {item.tag}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-display text-2xl text-primary">
            €{item.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
