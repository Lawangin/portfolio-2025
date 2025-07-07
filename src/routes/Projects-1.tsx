import { useEffect, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import GlassContainer from '@/components/GlassContainer'
import { IoLogoJavascript, IoLogoGithub, IoIosGlobe } from 'react-icons/io'
import { ProjectCard } from '@/components/ProjectCard'
import { animate } from 'animejs'
import { usePageContext } from '@/context/PageContext/PageContext'
import ScrollIndicator from '@/components/ScrollIndicator'

export const Route = createFileRoute('/Projects-1')({
  component: RouteComponent,
})

function RouteComponent() {
  const root = useRef<HTMLDivElement | null>(null)
  const isDesktop = window.innerWidth >= 768

  const { pageTitle } = usePageContext()

  const projectData = {
    title: 'Travel App',
    description: `This is a detailed description of the project. It explains the
        technologies used, challenges overcome, and the overall purpose of the
        project. The description helps visitors understand what makes this
        project unique and interesting.`,
    image: '/LawanginKhanLOGO-01.svg',
    demoLink: 'https://example.com/demo',
    githubLink: 'https://github.com/Lawangin/portfolio-2025',
  }

  useEffect(() => {
    if (isDesktop && (pageTitle === 'Projects')) {
      animate('.projects-container', {
        y: ['50px', '0px'],
        opacity: [0, 1],
        duration: 1500,
      })
    }
    else if (pageTitle === 'Projects Part 1') {
      animate('.projects-container', {
        y: ['50px', '0px'],
        opacity: [0, 1],
        duration: 1500,
      })
    } else {
      animate('.projects-container', {
        y: ['0px', '-50px'],
        opacity: [1, 0],
        duration: 1500,
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
            projectTitle={projectData.title}
            projectDescription={projectData.description}
            projectImage={projectData.image}
            icons={[IoLogoJavascript, IoLogoGithub, IoIosGlobe]}
            demoLink={projectData.demoLink}
            githubLink={projectData.githubLink}
          />
        </GlassContainer>
        <GlassContainer className="p-2">
          <ProjectCard
            projectTitle={projectData.title}
            projectDescription={projectData.description}
            projectImage={projectData.image}
            icons={[IoLogoJavascript, IoLogoGithub, IoIosGlobe]}
          />
        </GlassContainer>
        {isDesktop && (
          <><GlassContainer className="p-2">
            <ProjectCard
              projectTitle={projectData.title}
              projectDescription={projectData.description}
              projectImage={projectData.image}
              icons={[IoLogoJavascript, IoLogoGithub, IoIosGlobe]}
              demoLink={projectData.demoLink}
              githubLink={projectData.githubLink} />
          </GlassContainer><GlassContainer className="p-2">
              <ProjectCard
                projectTitle={projectData.title}
                projectDescription={projectData.description}
                projectImage={projectData.image}
                icons={[IoLogoJavascript, IoLogoGithub, IoIosGlobe]} />
            </GlassContainer></>
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
