// Cocktail images mapping - name to image path
import virginMojito from '@/assets/cocktails/virgin-mojito.png';
import tropicalMojito from '@/assets/cocktails/tropical-mojito.png';
import virginColada from '@/assets/cocktails/virgin-colada.png';
import cosmotini from '@/assets/cocktails/cosmotini.png';
import mockstar from '@/assets/cocktails/mockstar.png';
import kissOnTheBeach from '@/assets/cocktails/kiss-on-the-beach.png';
import berryMojito from '@/assets/cocktails/berry-mojito.png';
import pinkVelvet from '@/assets/cocktails/pink-velvet.png';
import orangeBerry from '@/assets/cocktails/orange-berry.png';
import berryMule from '@/assets/cocktails/berry-mule.png';
import shirleyTemple from '@/assets/cocktails/shirley-temple.png';
import zenzeroLemonade from '@/assets/cocktails/zenzero-lemonade.png';

import spritz from '@/assets/cocktails/spritz.png';
import negroni from '@/assets/cocktails/negroni.png';
import sbagliato from '@/assets/cocktails/sbagliato.png';
import summerSpritz from '@/assets/cocktails/summer-spritz.png';
import mojito from '@/assets/cocktails/mojito.png';
import negroniVeneziano from '@/assets/cocktails/negroni-veneziano.png';
import americano from '@/assets/cocktails/americano.png';
import spritzMojito from '@/assets/cocktails/spritz-mojito.png';
import spritzMule from '@/assets/cocktails/spritz-mule.png';
import spritzSour from '@/assets/cocktails/spritz-sour.png';
import spritzOnTheBeach from '@/assets/cocktails/spritz-on-the-beach.png';
import ginGinMule from '@/assets/cocktails/gin-gin-mule.png';

import pornstarMartini from '@/assets/cocktails/pornstar-martini.png';
import cosmopolitan from '@/assets/cocktails/cosmopolitan.png';
import sexOnTheBeach from '@/assets/cocktails/sex-on-the-beach.png';
import moscowMule from '@/assets/cocktails/moscow-mule.png';
import londonMule from '@/assets/cocktails/london-mule.png';
import pinkGin from '@/assets/cocktails/pink-gin.png';
import longIsland from '@/assets/cocktails/long-island.png';
import texasIcedTea from '@/assets/cocktails/texas-iced-tea.png';
import longBeach from '@/assets/cocktails/long-beach.png';
import invisibile from '@/assets/cocktails/invisibile.png';
import invisibileFragola from '@/assets/cocktails/invisibile-fragola.png';
import tequilaSunrise from '@/assets/cocktails/tequila-sunrise.png';

import mojitoPassion from '@/assets/cocktails/mojito-passion.png';
import mojitoFragola from '@/assets/cocktails/mojito-fragola.png';
import pinaColada from '@/assets/cocktails/pina-colada.png';
import vanillaPassion from '@/assets/cocktails/vanilla-passion.png';
import daiquiri from '@/assets/cocktails/daiquiri.png';
import daiquiriFragola from '@/assets/cocktails/daiquiri-fragola.png';
import caipiroska from '@/assets/cocktails/caipiroska.png';
import caipiroskaFragola from '@/assets/cocktails/caipiroska-fragola.png';
import hurricane from '@/assets/cocktails/hurricane.png';
import margarita from '@/assets/cocktails/margarita.png';
import margaritaFragola from '@/assets/cocktails/margarita-fragola.png';
import zombiePunch from '@/assets/cocktails/zombie-punch.png';

// Spritz category
import spritzCampari from '@/assets/cocktails/spritz-campari.png';
import spritzLimone from '@/assets/cocktails/spritz-limone.png';
import spritzPompelmo from '@/assets/cocktails/spritz-pompelmo.png';
import spritzRivieraCedro from '@/assets/cocktails/spritz-riviera-cedro.png';
import spritzP31 from '@/assets/cocktails/spritz-p31.png';
import spritzMonitor from '@/assets/cocktails/spritz-monitor.png';

// Map cocktail names to their images
export const cocktailImages: Record<string, string> = {
  // Analcolici
  'Virgin Mojito': virginMojito,
  'Tropical Mojito': tropicalMojito,
  'Virgin Colada': virginColada,
  'Cosmotini': cosmotini,
  'Mockstar': mockstar,
  'Kiss on the Beach': kissOnTheBeach,
  'Berry Mojito': berryMojito,
  'Pink Velvet': pinkVelvet,
  'Orange Berry': orangeBerry,
  'Berry Mule': berryMule,
  'Shirley Temple': shirleyTemple,
  'Zenzero Lemonade': zenzeroLemonade,

  // Aperitivo Italiano
  'Spritz': spritz,
  'Negroni': negroni,
  'Sbagliato': sbagliato,
  'Summer Spritz': summerSpritz,
  'Mojito': mojito,
  'Negroni Veneziano': negroniVeneziano,
  'Americano': americano,
  'Spritz Mojito': spritzMojito,
  'Spritz Mule': spritzMule,
  'Spritz Sour': spritzSour,
  'Spritz on the Beach': spritzOnTheBeach,
  'Gin Gin Mule': ginGinMule,

  // Contemporary
  'Pornstar Martini': pornstarMartini,
  'Cosmopolitan': cosmopolitan,
  'Sex on the Beach': sexOnTheBeach,
  'Moscow Mule': moscowMule,
  'London Mule': londonMule,
  'Pink Gin': pinkGin,
  'Long Island Iced Tea': longIsland,
  'Texas Iced Tea': texasIcedTea,
  'Long Beach': longBeach,
  'Invisibile': invisibile,
  'Invisibile Fragola': invisibileFragola,
  'Tequila Sunrise': tequilaSunrise,

  // Tropical
  'Mojito Passion': mojitoPassion,
  'Mojito Fragola': mojitoFragola,
  'Pina Colada': pinaColada,
  'Vanilla Passion': vanillaPassion,
  'Daiquiri': daiquiri,
  'Daiquiri Fragola': daiquiriFragola,
  'Caipiroska': caipiroska,
  'Caipiroska Fragola': caipiroskaFragola,
  'Hurricane': hurricane,
  'Margarita': margarita,
  'Margarita Fragola': margaritaFragola,
  'Zombie Punch': zombiePunch,

  // Spritz
  'Spritz Aperol': spritz,
  'Spritz Campari': spritzCampari,
  'Spritz Limone': spritzLimone,
  'Spritz Pompelmo': spritzPompelmo,
  'Spritz Riviera al Cedro': spritzRivieraCedro,
  'Spritz P31': spritzP31,
  'Spritz Monitor': spritzMonitor,
};

export const getCocktailImage = (name: string): string | undefined => {
  return cocktailImages[name];
};
