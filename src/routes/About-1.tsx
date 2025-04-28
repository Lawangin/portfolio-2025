import GlassContainer from '@/components/GlassContainer'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import ExperienceText from '@/components/ExperienceText'

export const Route = createFileRoute('/About-1')({
  component: RouteComponent,
})

function RouteComponent() {
  const skillsPm = [
    { name: 'React', color: 'bg-[#BA68C8]/60' },
    { name: 'TypeScript', color: 'bg-[#EE9645]/60' },
    { name: 'AWS', color: 'bg-[#BA68C8]/60' },
    { name: 'SQL', color: 'bg-[#EE9645]/60' },
    { name: 'Grafana', color: 'bg-[#BA68C8]/60' },
    { name: 'CSS', color: 'bg-[#EE9645]/60' },
    { name: 'CI/CD', color: 'bg-[#BA68C8]/60' },
    { name: 'Cypress', color: 'bg-[#EE9645]/60' }
  ]

  const skillsLf = [
    { name: 'React', color: 'bg-[#BA68C8]/60' },
    { name: 'JavaScript', color: 'bg-[#EE9645]/60' },
    { name: 'AWS', color: 'bg-[#BA68C8]/60' },
    { name: 'MongoDB', color: 'bg-[#BA68C8]/60' },
    { name: 'Jenkins', color: 'bg-[#EE9645]/60' },
    { name: 'Selenium', color: 'bg-[#BA68C8]/60' },
    { name: 'Docker', color: 'bg-[#EE9645]/60' }
  ]

  const skillsCc = [
    { name: 'React', color: 'bg-[#BA68C8]/60' },
    { name: 'JavaScript', color: 'bg-[#EE9645]/60' },
    { name: 'AWS', color: 'bg-[#BA68C8]/60' },
    { name: 'SQL', color: 'bg-[#EE9645]/60' },
    { name: 'ReactNative', color: 'bg-[#BA68C8]/60' },
    { name: 'Mocha', color: 'bg-[#EE9645]/60' },
    { name: 'Nodejs', color: 'bg-[#EE9645]/60' }
  ]


  return (
    <div className='p-2 pt-20 min-h-screen'>
      <h1
        className="text-4xl font-bold bg-gradient-to-r from-white to-black bg-clip-text text-transparent opacity-70 py-4">
        About me
      </h1>
      <GlassContainer className="p-2">
        <p className='text-2xl font-medium py-2'>Experience</p>
        <hr className="border-t border-white/50" />
        <ExperienceText
          skills={skillsPm}
          date="2021 — Present"
          position='Lead Software Engineer'
          company='ParkMobile LLC' />
        <hr className="border-t border-white/50" />
        <ExperienceText
          skills={skillsLf}
          date="2019 — 2021"
          position='Lead Full Stack Engineer'
          company='Lightfeather LLC, USCIS' />
        <hr className="border-t border-white/50" />
        <ExperienceText
          skills={skillsCc}
          date="2018 — 2019"
          position='Front End Engineer'
          company='Camelcase Studios LLC' />

        <div className="flex justify-center p-4">
          <div className="p-[5px] rounded-lg bg-gradient-to-r from-[#BA68C8] to-[#EE9645] inline-block drop-shadow-md">
            <Button
              className="cursor-pointer w-full h-full rounded-md bg-[#0C1B3B]/80 backdrop-blur-lg text-white hover:bg-white/10 transition-all hover:text-black/80"
              variant="ghost"
              onClick={() => alert('HI There!')}
            >
              Download CV
            </Button>
          </div>
        </div>
      </GlassContainer>
    </div>
  )
}
