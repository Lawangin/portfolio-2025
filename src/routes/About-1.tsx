import { useRef, useEffect } from 'react'
import GlassContainer from '@/components/GlassContainer'
import { ActionButton as Button } from '@/components/ActionButton'
import { createFileRoute } from '@tanstack/react-router'
import ExperienceText from '@/components/ExperienceText'
import { animate } from 'animejs'
import { usePageContext } from '@/context/PageContext/PageContext'
import { SkillsPage } from '@/components/SkillsPage/SkillsPage'
import ScrollIndicator from '@/components/ScrollIndicator'

export const Route = createFileRoute('/about-1')({
  component: RouteComponent,
})

function RouteComponent() {
  const { pageTitle } = usePageContext()
  const isDesktop = window.innerWidth >= 768
  const root = useRef<HTMLDivElement | null>(null)

  const skillsPm = [
    { name: 'React', color: 'bg-[#BA68C8]/60' },
    { name: 'TypeScript', color: 'bg-[#EE9645]/60' },
    { name: 'AWS', color: 'bg-[#BA68C8]/60' },
    { name: 'SQL', color: 'bg-[#EE9645]/60' },
    { name: 'Grafana', color: 'bg-[#BA68C8]/60' },
    { name: 'CSS', color: 'bg-[#EE9645]/60' },
    { name: 'CI/CD', color: 'bg-[#BA68C8]/60' },
    { name: 'Cypress', color: 'bg-[#EE9645]/60' },
  ]

  const skillsLf = [
    { name: 'React', color: 'bg-[#BA68C8]/60' },
    { name: 'JavaScript', color: 'bg-[#EE9645]/60' },
    { name: 'AWS', color: 'bg-[#BA68C8]/60' },
    { name: 'MongoDB', color: 'bg-[#BA68C8]/60' },
    { name: 'Jenkins', color: 'bg-[#EE9645]/60' },
    { name: 'Selenium', color: 'bg-[#BA68C8]/60' },
    { name: 'Docker', color: 'bg-[#EE9645]/60' },
  ]

  const skillsCc = [
    { name: 'React', color: 'bg-[#BA68C8]/60' },
    { name: 'JavaScript', color: 'bg-[#EE9645]/60' },
    { name: 'AWS', color: 'bg-[#BA68C8]/60' },
    { name: 'SQL', color: 'bg-[#EE9645]/60' },
    { name: 'ReactNative', color: 'bg-[#BA68C8]/60' },
    { name: 'Mocha', color: 'bg-[#EE9645]/60' },
    { name: 'Nodejs', color: 'bg-[#EE9645]/60' },
  ]

  useEffect(() => {
    if (isDesktop && pageTitle === 'About Me') {
      animate('.about-container', {
        y: ['25px', '0px'],
        opacity: [0, 1],
        duration: 1500,
      })
    } else if (pageTitle === 'About Me Part 1') {
      animate('.about-container', {
        y: ['25px', '0px'],
        opacity: [0, 1],
        duration: 1500,
      })
    } else {
      animate('.about-container', {
        y: ['0px', '-25px'],
        opacity: [1, 0],
        duration: 1500,
      })
    }
  }, [pageTitle])

  return (
    <div
      ref={root}
      className="grid grid-cols-1 md:grid-cols-2 gap-20 px-4 md:py-0 md:pl-48"
    >
      <div className="p-2 pt-20 md:pt-0 min-h-screen md:place-self-end md:place-content-center max-w-3xl about-container">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-black bg-clip-text text-transparent opacity-70 py-4 md:text-6xl">
          About me
        </h1>
        <GlassContainer className="p-2">
          <div className="flex gap-2 place-content-between pb-2">
            <p className="text-2xl font-medium py-2">Experience</p>
            <div className="p-[5px] rounded-lg bg-gradient-to-r from-[#BA68C8] to-[#EE9645] inline-block drop-shadow-md">
              <a
                href="/Lawangin_CV.pdf"
                download="Lawangin_CV.pdf"
                className="cursor-pointer"
              >
                <Button variant="ghost" label="Download CV" />
              </a>
            </div>
          </div>
          <hr className="border-t border-white/50" />
          <ExperienceText
            skills={skillsPm}
            date="2021 — Present"
            position="Lead Software Engineer"
            company="ParkMobile LLC"
            description={
              isDesktop
                ? 'Led the development of scalable web applications and implemented CI/CD pipelines.'
                : undefined
            }
          />
          <hr className="border-t border-white/50" />
          <ExperienceText
            skills={skillsLf}
            date="2019 — 2021"
            position="Lead Full Stack Engineer"
            company="Lightfeather LLC, USCIS"
            description={
              isDesktop
                ? 'Developed full-stack solutions for government projects, ensuring high security and performance.'
                : undefined
            }
          />
          <hr className="border-t border-white/50" />
          <ExperienceText
            skills={skillsCc}
            date="2018 — 2019"
            position="Front End Engineer"
            company="Camelcase Studios LLC"
            description={
              isDesktop
                ? 'Built responsive front-end interfaces and optimized performance for mobile applications.'
                : undefined
            }
          />
        </GlassContainer>

        {!isDesktop && (
          <div className="flex justify-center p-4">
            <ScrollIndicator label="Sroll to view skills" />
          </div>
        )}
      </div>
      <SkillsPage isPageTwo={isDesktop} />
    </div>
  )
}
