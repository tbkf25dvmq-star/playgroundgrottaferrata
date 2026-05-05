import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useFullMenu } from '@/hooks/useMenu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getCocktailImage } from '@/data/cocktailImages';
import { getBeerImage } from '@/data/beerImages';
import { getGinImage } from '@/data/ginImages';

const DRINK_CATEGORIES = ['Analcolici', 'Aperitivo Italiano', 'Contemporary', 'Tropical', 'Birre Artigianali', 'Gin Corner'];

const Drinks = () => {
  const navigate = useNavigate();
  const { menu, isLoading, error } = useFullMenu(false);

  // Filter only drink categories
  const drinkCategories = menu.filter(cat => 
    DRINK_CATEGORIES.includes(cat.name)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="sticky top-0 z-10 bg-black/95 backdrop-blur border-b border-white/10 p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Drinks</h1>
          </div>
        </header>
        <div className="p-4 space-y-4">
          <Skeleton className="h-16 w-full bg-white/10" />
          <Skeleton className="h-16 w-full bg-white/10" />
          <Skeleton className="h-16 w-full bg-white/10" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-red-400">Errore nel caricamento dei drink</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/')}>
            Torna al menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/95 backdrop-blur border-b border-white/10 p-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">🍹 Drinks Menu</h1>
        </div>
      </header>

      {/* Categories Accordion */}
      <main className="p-4 pb-20">
        <Accordion type="multiple" className="space-y-3">
          {drinkCategories.map((category) => (
            <AccordionItem 
              key={category.id} 
              value={category.id}
              className="border border-white/20 rounded-xl overflow-hidden bg-white/5"
            >
              <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div className="text-left">
                    <h2 className="text-lg font-semibold">{category.name}</h2>
                    <p className="text-sm text-white/60">
                      {category.items.length} {category.items.length === 1 ? 'drink' : 'drinks'}
                      {category.items[0]?.price > 0 && ` • €${category.items[0].price.toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  {category.items.map((item) => (
                    <DrinkCard key={item.id} item={item} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  );
};

interface DrinkCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url?: string;
  };
}

const DrinkCard = ({ item }: DrinkCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Try to get cocktail or beer image from mapping, fall back to database image_url
  const drinkImage = getCocktailImage(item.name) || getBeerImage(item.name) || getGinImage(item.name) || item.image_url;
  
  return (
    <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-colors">
      {/* Image */}
      <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center overflow-hidden">
        {drinkImage && !imageError ? (
          <img
            src={drinkImage} 
            alt={item.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-4xl opacity-30">🍹</span>
        )}
      </div>
      
      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-sm leading-tight">{item.name}</h3>
        <p className="text-xs text-white/50 mt-1 line-clamp-2">{item.description}</p>
        {item.price > 0 && (
          <p className="text-sm font-bold text-amber-400 mt-2">€{item.price.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
};

export default Drinks;
