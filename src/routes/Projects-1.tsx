import { useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import GlassContainer from '@/components/GlassContainer'
import { IoLogoJavascript, IoLogoGithub, IoIosGlobe } from 'react-icons/io'
import { ProjectCard } from '@/components/ProjectCard'

export const Route = createFileRoute('/Projects-1')({
  component: RouteComponent,
})

function RouteComponent() {
  const root = useRef<HTMLDivElement | null>(null)

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

  return (
    <div
      ref={root}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-12 md:py-0 md:pl-48"
    >
      <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-black bg-clip-text text-transparent opacity-70 pt-15 md:text-6xl">
        Projects
      </h1>
      <GlassContainer className="p-2">
        <ProjectCard
          projecTitle={projectData.title}
          projectDescription={projectData.description}
          projectImage={projectData.image}
          icons={[IoLogoJavascript, IoLogoGithub, IoIosGlobe]}
          demoLink={projectData.demoLink}
          githubLink={projectData.githubLink}
        />
      </GlassContainer>
      <GlassContainer className="p-2">
        <ProjectCard
          projecTitle={projectData.title}
          projectDescription={projectData.description}
          projectImage={projectData.image}
          icons={[IoLogoJavascript, IoLogoGithub, IoIosGlobe]}
        />
      </GlassContainer>
      <GlassContainer className="p-2">
        <ProjectCard
          projecTitle={projectData.title}
          projectDescription={projectData.description}
          projectImage={projectData.image}
          icons={[IoLogoJavascript, IoLogoGithub, IoIosGlobe]}
        />
      </GlassContainer>
      <GlassContainer className="p-2">
        <ProjectCard
          projecTitle={projectData.title}
          projectDescription={projectData.description}
          projectImage={projectData.image}
          icons={[IoLogoJavascript, IoLogoGithub, IoIosGlobe]}
        />
      </GlassContainer>
    </div>
  )
}
