import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
// import NavBarDesktop from '@/components/NavBarDesktop';
import '../styles.css'
import NavBar from '@/components/NavBar';
import { PageProvider } from '@/context/PageContext/PageContext';
import Home from '@/components/Home';
import NavBarDesktop from '@/components/NavBarDesktop';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
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
        <Home className={'box-1'} />
  )
}
