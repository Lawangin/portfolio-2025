import { useEffect, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import GlassContainer from '@/components/GlassContainer'
import { ProjectCard } from '@/components/ProjectCard'
import { animate } from 'animejs'
import { usePageContext } from '@/context/PageContext/PageContext'
import ScrollIndicator from '@/components/ScrollIndicator'
import { ANIMATION_DURATION } from '@/lib/constants'
import { projectsData } from '@/lib/projectsData'

export const Route = createFileRoute('/projects-1')({
  component: RouteComponent,
})

function RouteComponent() {
  const root = useRef<HTMLDivElement | null>(null)
  const isDesktop = window.innerWidth >= 768

  const { pageTitle } = usePageContext()

  useEffect(() => {
    if (isDesktop && pageTitle === 'Projects') {
      animate('.projects-container', {
        y: ['50px', '0px'],
        opacity: [0, 1],
        duration: ANIMATION_DURATION,
      })
    } else if (pageTitle === 'Projects Part 1') {
      animate('.projects-container', {
        y: ['50px', '0px'],
        opacity: [0, 1],
        duration: ANIMATION_DURATION,
      })
    } else {
      animate('.projects-container', {
        y: ['0px', '-50px'],
        opacity: [1, 0],
        duration: ANIMATION_DURATION,
      })
    }
  }, [pageTitle])

  return (
    <div className="min-h-screen projects-container">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-black bg-clip-text text-transparent opacity-70 px-4 pt-24 md:pl-48 md:py-24 md:text-6xl">
        Projects
      </h1>
      <div
        ref={root}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 py-2 md:py-0 md:pl-48"
      >
        <GlassContainer className="p-2">
          <ProjectCard
            projectTitle={projectsData[0].title}
            projectDescription={projectsData[0].description}
            projectImage={projectsData[0].image}
            icons={projectsData[0].icons}
            demoLink={projectsData[0].demoLink}
            githubLink={projectsData[0].githubLink}
            skills={projectsData[0].skills}
          />
        </GlassContainer>
        <GlassContainer className="p-2">
          <ProjectCard
            projectTitle={projectsData[1].title}
            projectDescription={projectsData[1].description}
            projectImage={projectsData[1].image}
            icons={projectsData[1].icons}
            demoLink={projectsData[1].demoLink}
            githubLink={projectsData[1].githubLink}
            skills={projectsData[1].skills}
          />
        </GlassContainer>
        {isDesktop && (
          <>
            <GlassContainer className="p-2">
              <ProjectCard
                projectTitle={projectsData[2].title}
                projectDescription={projectsData[2].description}
                projectImage={projectsData[2].image}
                icons={projectsData[2].icons}
                demoLink={projectsData[2].demoLink}
                githubLink={projectsData[2].githubLink}
                skills={projectsData[2].skills}
              />
            </GlassContainer>
            <GlassContainer className="p-2">
              <ProjectCard
                projectTitle={projectsData[3].title}
                projectDescription={projectsData[3].description}
                projectImage={projectsData[3].image}
                icons={projectsData[3].icons}
                demoLink={projectsData[3].demoLink}
                githubLink={projectsData[3].githubLink}
                skills={projectsData[3].skills}
              />
            </GlassContainer>
          </>
        )}
      </div>
      {!isDesktop && (
        <div className="flex justify-center p-4">
          <ScrollIndicator label="Scroll to view more projects" />
        </div>
      )}
    </div>
  )
}
