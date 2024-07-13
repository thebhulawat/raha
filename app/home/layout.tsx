import SideNav from "../ui/sidenav";
import Header from "../ui/top-bar";

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
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
    );
  }