import { useState, useRef, useEffect } from 'react';
import { useFullMenu } from '@/hooks/useMenu';
import MenuHeader from '@/components/MenuHeader';
import CategoryTabs from '@/components/CategoryTabs';
import MenuSection from '@/components/MenuSection';
import MenuFooter from '@/components/MenuFooter';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
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

  // Convert menu data to format expected by CategoryTabs
  const categories = menu.map(cat => ({
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
      
      <MenuFooter />
    </div>
  );
};

export default Index;
