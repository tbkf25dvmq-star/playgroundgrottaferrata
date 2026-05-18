import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFullMenu } from '@/hooks/useMenu';
import MenuHeader from '@/components/MenuHeader';
import CategoryTabs from '@/components/CategoryTabs';
import MenuSection from '@/components/MenuSection';
import AllergensBox from '@/components/AllergensBox';
import MenuFooter from '@/components/MenuFooter';
import { Skeleton } from '@/components/ui/skeleton';
import { Wine, Beer } from 'lucide-react';

const DRINK_CATEGORIES = ['Analcolici', 'Aperitivo Italiano', 'Spritz', 'Contemporary', 'Tropical', 'Birre Artigianali', 'Gin Corner'];

const Index = () => {
  const navigate = useNavigate();
  const { menu, isLoading, error } = useFullMenu(false);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Set initial active category when menu loads
  useEffect(() => {
    if (menu.length > 0 && !activeCategory) {
      setActiveCategory(menu[0].id);
    }
  }, [menu, activeCategory]);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = sectionRefs.current[categoryId];
    if (element) {
      const yOffset = -60;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Update active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const category of menu) {
        const element = sectionRefs.current[category.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveCategory(category.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menu]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <MenuHeader />
        <div className="p-4 space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-destructive">Errore nel caricamento del menu</p>
          <p className="text-muted-foreground text-sm mt-2">Riprova più tardi</p>
        </div>
      </div>
    );
  }

  // Filter out drink categories from main menu (they go to /drinks page)
  // Time-based visibility: 12:00-17:00 mostra Play Lunch, fuori da quell'orario mostra Play Dinner
  const currentHour = new Date().getHours();
  const isLunchTime = currentHour >= 12 && currentHour < 17;
  const foodCategories = menu.filter(cat => {
    if (DRINK_CATEGORIES.includes(cat.name)) return false;
    if (cat.name === 'Play Lunch') return isLunchTime;
    if (cat.name === 'Play Dinner') return !isLunchTime;
    return true;
  });

  // Convert menu data to format expected by CategoryTabs
  const categories = foodCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon,
    items: cat.items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: Number(item.price),
      tag: item.tag || undefined,
    })),
  }));

  return (
    <div className="min-h-screen bg-background">
      <MenuHeader />
      
      {/* Drinks Banner */}
      <div 
        onClick={() => navigate('/drinks')}
        className="mx-4 mt-4 p-4 bg-gradient-to-r from-amber-900 to-orange-800 rounded-xl cursor-pointer hover:scale-[1.02] transition-transform shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <Wine className="h-6 w-6 text-amber-200" />
              <Beer className="h-6 w-6 text-amber-200" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">🍹 Drinks Menu</h3>
              <p className="text-amber-100 text-sm">Cocktail, Birre Artigianali e Analcolici</p>
            </div>
          </div>
          <span className="text-white text-2xl">→</span>
        </div>
      </div>
      
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={scrollToCategory}
      />
      
      <main>
        {categories.map((category) => (
          <div
            key={category.id}
            ref={(el) => (sectionRefs.current[category.id] = el)}
          >
            <MenuSection category={category} />
          </div>
        ))}
      </main>
      
      <AllergensBox />
      <MenuFooter />
    </div>
  );
};

export default Index;
