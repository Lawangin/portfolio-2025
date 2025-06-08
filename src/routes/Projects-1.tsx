import { useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import GlassContainer from '@/components/GlassContainer';
import { IoLogoJavascript, IoLogoGithub, IoIosGlobe } from 'react-icons/io';
import { ProjectCard } from '@/components/ProjectCard';

export const Route = createFileRoute('/Projects-1')({
  component: RouteComponent,
})

function RouteComponent() {
  const root = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={root} className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-12 md:py-0 md:pl-48">
      <h1
        className="text-4xl font-bold bg-gradient-to-r from-white to-black bg-clip-text text-transparent opacity-70 pt-15 md:text-6xl">
        Projects
      </h1>
      <GlassContainer className="p-2">
        <ProjectCard />
      </GlassContainer>
      <GlassContainer className="p-2">
        <ProjectCard />
      </GlassContainer>
      <GlassContainer className="p-2">
        <ProjectCard />
      </GlassContainer>
      <GlassContainer className="p-2">
        <ProjectCard />
      </GlassContainer>
    </div>
  )
}


