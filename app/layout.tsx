import '@/app/ui/global.css'
import {inter} from '@/app/ui/fonts'
import { Metadata } from 'next';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: {
    template: '%s | Raha Home', 
    default: 'Raha Home dashboard'
  },
  description: 'Raha Home for setting up calls and analyzing',
  // TODO: Update this url and other metadata 
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`} style={{ backgroundColor: '#faf3d9' }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}