import { MenuCategory } from '@/data/menuData';
import MenuItemCard from './MenuItemCard';

interface MenuSectionProps {
  category: MenuCategory;
}

const MenuSection = ({ category }: MenuSectionProps) => {
  return (
    <section className="py-6 px-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{category.icon}</span>
        <h2 className="font-display text-3xl text-foreground tracking-wide">
          {category.name.toUpperCase()}
        </h2>
      </div>
      
      <div className="space-y-3">
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
