import { useState, useRef, useEffect } from 'react';
import { menuData } from '@/data/menuData';
import MenuHeader from '@/components/MenuHeader';
import CategoryTabs from '@/components/CategoryTabs';
import MenuSection from '@/components/MenuSection';
import MenuFooter from '@/components/MenuFooter';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = sectionRefs.current[categoryId];
    if (element) {
      const yOffset = -60; // Account for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Update active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const category of menuData) {
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
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MenuHeader />
      
      <CategoryTabs
        categories={menuData}
        activeCategory={activeCategory}
        onCategoryChange={scrollToCategory}
      />
      
      <main>
        {menuData.map((category) => (
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
