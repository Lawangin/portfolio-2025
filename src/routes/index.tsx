import { useEffect, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import '../styles.css'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import GlassContainer from '@/components/GlassContainer'
import ScrollDownIndicator from '@/components/ScrollDownIndicator'
import { animate } from 'animejs';
import { usePageContext } from '@/context/PageContext/PageContext';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const root = useRef<HTMLDivElement | null>(null);

  const { pageIndex } = usePageContext();

  useEffect(() => {
    if (pageIndex !== 1) {
      animate('.home-container', {
        y: '-50px',
        opacity: 0,
        duration: 1500,
      });
    } else {
      animate('.home-container', {
        y: ['50px', '0px'],
        opacity: [0, 1],
        duration: 1500,
      });
    }

  }, [pageIndex]);

  return (
    <div ref={root} className="min-h-screen px-4 py-12 grid gap-6 justify-items-center pt-24 md:pt-24 md:pl-48">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full h-full home-container">
        {/* Box 1: Top Left Metric - Hidden on Mobile */}
        <div className="hidden md:flex flex-col items-start justify-start p-4">
          <h2 className="text-4xl font-bold text-white drop-shadow-sm">300+</h2>
          <Label className="text-white mt-1">production releases</Label>
        </div>

        {/* Box 2: Avatar with background ring */}
        <div className="flex py-4 justify-center content-end items-center relative">
          <div className="absolute w-40 h-40 lg:w-92 lg:h-92 md:w-60 md:h-60 rounded-full bg-white/20 border border-white/30 backdrop-blur-md" />

          <img
            src="/me.jpg"
            alt="Lawangin avatar"
            className="w-32 h-32 lg:w-80 lg:h-80 md:w-48 md:h-48 rounded-full border-4 border-white/80 object-cover shadow-md relative z-10"
          />
        </div>

        {/* Box 3: Top Right Metric - Hidden on Mobile */}
        <div className="hidden md:flex flex-col items-end justify-start p-4 text-right">
          <h2 className="text-4xl font-bold text-white drop-shadow-sm">60+</h2>
          <Label className="text-white mt-1">projects completed</Label>
        </div>
      </div>

      {/* Bottom Row: GlassContainer centered */}
      <div className="mt-10 w-full px-4 grid justify-center max-w-5xl place-items-start home-container">
        <GlassContainer className="w-full space-y-4 md:min-w-xl lg:min-w-3xl">
          <Label className="text-4xl md:text-5xl md:text-center font-bold leading-snug drop-shadow-sm text-white p-2 text-left flex flex-col">
            <span className="block">Hi, I am Lawangin!</span>
            <span className="block">
              I'm a{' '}
              <span className="bg-gradient-to-r from-[#BA68C8] to-[#EE9645] bg-clip-text text-transparent">
                Software Engineer
              </span>
            </span>
            <span className="block">
              at{' '}
              <span className="bg-gradient-to-r from-[#BA68C8] to-[#EE9645] bg-clip-text text-transparent">
                ParkMobile.
              </span>
            </span>
          </Label>

          <Label className="md:justify-center text-white drop-shadow-sm p-2">
            Feel free to explore my page and reach out — I'd love to connect!
          </Label>

          <div className="flex justify-center p-4">
            <div className="p-[5px] rounded-lg bg-gradient-to-r from-[#BA68C8] to-[#EE9645] inline-block drop-shadow-md">
              <Button
                className="cursor-pointer w-full h-full rounded-md bg-[#0C1B3B]/80 backdrop-blur-lg text-white hover:bg-white/10 transition-all hover:text-black/80"
                variant="ghost"
                onClick={() => alert('HI There!')}
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </GlassContainer>
      </div>
      <ScrollDownIndicator />
    </div>
  )
}
