import '@/app/global.css';
import { lusitana } from '@/app/fonts';
import { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import SideNav from '@/components/custom/nav-bar/sidenav';
import Header from '@/components/custom/top-bar/top-bar';

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: {
    template: '%s | Raha Home',
    default: 'Raha Home dashboard',
  },
  description: 'Raha Home for setting up calls and analyzing',
  // TODO: Update this url and other metadata
  metadataBase: new URL('https://app.myraha.life'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${lusitana.className} antialiased `}
          style={{ backgroundColor: '#faf3d9' }}
        >
          <div className="flex h-screen">
            <div className="w-64 h-full">
              <SideNav />
            </div>
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
