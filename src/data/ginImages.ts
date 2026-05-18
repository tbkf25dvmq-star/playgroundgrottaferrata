import ginMare from '@/assets/gins/gin-mare.png';
import citadelle from '@/assets/gins/citadelle.webp';
import ginMg from '@/assets/gins/gin-mg.webp';
import tanqueray from '@/assets/gins/tanqueray.webp';
import bombay from '@/assets/gins/bombay.webp';
import hendricks from '@/assets/gins/hendricks.jpg';
import bulldog from '@/assets/gins/bulldog.jpeg';

const ginImages: Record<string, string> = {
  'Gin Mare': ginMare,
  'Citadelle': citadelle,
  'Gin MG': ginMg,
  'Tanqueray': tanqueray,
  'Bombay': bombay,
  "Hendrick's": hendricks,
  'Bulldog': bulldog,
};

export const getGinImage = (name: string): string | undefined => {
  return ginImages[name];
};
