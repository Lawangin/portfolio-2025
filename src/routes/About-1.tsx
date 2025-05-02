import { useRef, useState, useEffect } from 'react'
import GlassContainer from '@/components/GlassContainer'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import ExperienceText from '@/components/ExperienceText'
import {
  SiTypescript,
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiAmazon,
  SiDocker,
  SiHtml5,
  SiCss3,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiGithub,
  SiPython,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaJava } from "react-icons/fa";
import { animate, createScope, Scope } from 'animejs';

export const Route = createFileRoute('/About-1')({
  component: RouteComponent,
})

function RouteComponent() {
  const root = useRef<HTMLDivElement | null>(null);
  const scope = useRef<Scope | null>(null);

  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  const icons = [
    { id: 1, icon: <SiTypescript />, label: 'TypeScript' },
    { id: 2, icon: <SiReact />, label: 'React' },
    { id: 3, icon: <SiJavascript />, label: 'JavaScript' },
    { id: 4, icon: <SiNodedotjs />, label: 'Node.js' },
    { id: 5, icon: <SiAmazon />, label: 'AWS' },
    { id: 6, icon: <SiDocker />, label: 'Docker' },
    { id: 7, icon: <SiHtml5 />, label: 'HTML' },
    { id: 8, icon: <SiCss3 />, label: 'CSS' },
    { id: 9, icon: <SiPostgresql />, label: 'PostgreSQL' },
    { id: 10, icon: <SiMongodb />, label: 'MongoDB' },
    { id: 11, icon: <SiGraphql />, label: 'GraphQL' },
    { id: 12, icon: <VscVscode />, label: 'VS Code' },
    { id: 13, icon: <SiGithub />, label: 'GitHub' },
    { id: 15, icon: <SiPython />, label: 'Python' },
    { id: 16, icon: <FaJava />, label: 'Java' },
  ];

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

  useEffect(() => {
    scope.current = createScope({ root: root as React.RefObject<HTMLElement | SVGElement> }).add(scope => {

      scope.add('enterIcon', (selector: string) => {
        animate(selector, {
          width: '100px',
          duration: 300,
        });

      });

      scope.add('leaveIcon', (selector: string) => {
        animate(selector, {
          width: '60px',
          duration: 300,
        });
      });

    });

    return () => {
      scope?.current?.revert();
    };
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-20 px-4 py-12 md:pl-48">
      <div className='p-2 pt-20 md:pt-0 min-h-screen md:place-self-end md:place-content-center max-w-3xl'>
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
      <div className="hidden md:flex justify-start items-center">
        <div ref={root} className="min-h-screen flex items-center justify-center">
          <div className="grid grid-cols-3 gap-6 place-items-start w-75">
            {icons.map(({ id, icon, label }) => (
              <div
                key={id}
                className={
                  `w-15 
              h-15 
              relative
              rounded-full 
              border 
              border-white/30 
              bg-white/20 
              backdrop-blur-lg 
              shadow-lg 
              flex 
              items-center 
              justify-center 
              text-white 
              overflow-visible
              cursor-pointer
              icon-bubble-${id}
              `}
                onMouseEnter={() => {
                  scope?.current?.methods.enterIcon(`.icon-bubble-${id}`);
                  setHoveredIcon(id)
                }
                }
                onMouseLeave={() => {
                  scope?.current?.methods.leaveIcon(`.icon-bubble-${id}`);
                  setHoveredIcon(null)
                }
                }
              >
                {hoveredIcon !== id && (
                  <div
                    className={`text-3xl icon-${id}`}
                  >
                    {icon}
                  </div>
                )}

                {hoveredIcon === id && (
                  <span className="text-sm font-medium whitespace-nowrap m-20">{label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
