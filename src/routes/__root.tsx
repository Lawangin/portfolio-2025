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
        <div>
          {isDesktop ? <NavBarDesktop className="nav" /> : <NavBar className="nav" />}
            <Outlet />
        </div>
        <TanStackRouterDevtools />
      </PageProvider>
    );
  },
})
