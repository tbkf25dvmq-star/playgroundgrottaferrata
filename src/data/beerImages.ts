// Beer images mapping
import chiaraChiara from '@/assets/beers/chiara-chiara.jpeg';
import ipaRossa from '@/assets/beers/ipa-rossa.jpeg';
import giorni60 from '@/assets/beers/60-giorni.jpeg';
import doppioMalto from '@/assets/beers/doppio-malto.jpeg';

const beerImages: Record<string, string> = {
  'Chiara Chiara': chiaraChiara,
  'IPA': ipaRossa,
  'Rossa Rossa': ipaRossa,
  '60 Giorni': giorni60,
  'Doppio Malto': doppioMalto,
};

export const getBeerImage = (name: string): string | undefined => {
  return beerImages[name];
};
