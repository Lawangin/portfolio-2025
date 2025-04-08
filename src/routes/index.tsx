import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
// import NavBar from '@/components/NavBarBlur';
import NavBarDesktop from '@/components/NavBarDesktop';
import '../styles.css'
import NavBar from '@/components/NavBar';

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
        <div className='container'>
          {/* {isDesktop ? <NavBarDesktop /> : <NavBar />} */}
          <NavBar />
        </div>
  )
}
