import { useEffect, useRef } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { ActionButton as Button } from '@/components/ActionButton'
import { Label } from '@/components/ui/label'
import GlassContainer from '@/components/GlassContainer'
import { animate } from 'animejs'
import { usePageContext } from '@/context/PageContext/PageContext'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const root = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  const { pageTitle, setPageIndex, setPageTitle, pageIndex } = usePageContext()

  useEffect(() => {
    if (pageIndex !== 0) {
      setPageIndex(0)
    }
  }, [setPageIndex])

  useEffect(() => {
    if (pageTitle !== 'Home') {
      animate('.home-container', {
        y: '-50px',
        opacity: 0,
        duration: 1500,
      })
    } else {
      animate('.home-container', {
        y: ['50px', '0px'],
        opacity: [0, 1],
        duration: 1500,
      })
    }
  }, [pageTitle])

  const handleContactClick = () => {
    setPageIndex(4)
    setPageTitle('Contact Me')
    router.navigate({ to: '/contact' })
  }

  return (
    <div
      ref={root}
      className="flex-1 px-4 py-12 md:py-0 grid gap-6 md:gap-2 justify-items-center content-center pt-24 md:pt-0 md:pl-48"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-2 max-w-5xl w-full home-container">
        {/* Box 1: Top Left Metric - Hidden on Mobile */}
        <div className="hidden md:flex flex-col items-start justify-start p-2">
          <h2 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-sm">1000+</h2>
          <Label className="text-white mt-1 text-sm">Production releases</Label>
        </div>

        {/* Box 2: Avatar with background ring */}
        <div className="flex py-4 md:py-2 justify-center content-end items-center relative">
          <div className="absolute w-40 h-40 lg:w-48 lg:h-48 md:w-44 md:h-44 rounded-full bg-gray-500/20 border border-white/20 backdrop-blur-md" />

          <img
            src="/me.jpg"
            alt="Lawangin avatar"
            className="w-32 h-32 lg:w-40 lg:h-40 md:w-36 md:h-36 rounded-full border-4 border-white/80 object-cover shadow-md relative z-10"
          />
        </div>

        {/* Box 3: Top Right Metric - Hidden on Mobile */}
        <div className="hidden md:flex flex-col items-end justify-start p-2 text-right">
          <h2 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-sm">60+</h2>
          <Label className="text-white mt-1 text-sm">Projects completed</Label>
        </div>
      </div>

      {/* Bottom Row: GlassContainer centered */}
      <div className="mt-10 md:mt-4 w-full px-4 grid justify-center max-w-5xl place-items-start home-container">
        <GlassContainer className="w-full space-y-2 md:space-y-3 md:min-w-xl lg:min-w-3xl">
          <Label className="text-3xl md:text-4xl lg:text-5xl md:text-center font-bold leading-snug drop-shadow-sm text-white py-2 text-left flex flex-col items-start md:items-center">
            <span className="block">Hi, I am Lawangin!</span>
            <span className="block">
              I'm a{' '}
              <span className="bg-gradient-to-r from-[#BA68C8] to-[#EE9645] bg-clip-text text-transparent">
                Software Engineer
              </span>
            </span>
            <span className="block">
              specializing in{' '}
              <span className="bg-gradient-to-r from-[#BA68C8] to-[#EE9645] bg-clip-text text-transparent">
                Frontend.
              </span>
            </span>
          </Label>

          <Label className="md:justify-center text-white drop-shadow-sm py-2 text-sm md:text-base">
            Feel free to explore my page and reach out. I'd love to connect!
          </Label>

          <div className="flex justify-center p-2 md:p-4">
            <Button
              variant="ghost"
              onClick={handleContactClick}
              label={<strong>Get In Touch</strong>}
              gradientBorder
            />
          </div>
        </GlassContainer>
      </div>
    </div>
  )
}
