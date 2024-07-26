import { Inter } from 'next/font/google';
import { Lusitana, Playfair_Display, Abril_Fatface } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({ subsets: ['latin'], weight: '400' });
export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});
export const abril = Abril_Fatface({
  weight: ['400'],
  subsets: ['latin'],
});
