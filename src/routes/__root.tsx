import NavBar from '@/components/NavBar';
import NavBarDesktop from '@/components/NavBarDesktop';
import { PageProvider } from '@/context/PageContext/PageContext';
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useState, useEffect } from 'react';

export const Route = createRootRoute({
  component: () => {
    const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 768);

    useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
      };

      // Add event listener for window resize
      window.addEventListener('resize', handleResize);

      // Cleanup event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <PageProvider>
        <div className="min-h-screen flex flex-col">
          {isDesktop ? <NavBarDesktop className="nav" /> : <NavBar className="nav" />}
          <main className="flex-1 flex flex-col">
            <Outlet />
          </main>
          <footer className="text-center text-white/50 text-sm py-4">
            &copy; {new Date().getFullYear()} Lawangin Khan
          </footer>
        </div>
        <TanStackRouterDevtools />
      </PageProvider>
    );
  },
})
