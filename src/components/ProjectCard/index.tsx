import { IoLogoGithub, IoLogoJavascript, IoIosGlobe } from 'react-icons/io'
import type { IconType } from 'react-icons/lib'

interface ProjectCardProps {
  projecTitle: string
  projectDescription: string
  projectImage?: string
  icons?: IconType[]
  demoLink?: string
  githubLink?: string
}

export const ProjectCard = ({
  projecTitle,
  projectDescription,
  projectImage,
  icons,
  demoLink,
  githubLink,
}: ProjectCardProps) => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#BA68C8] to-[#EE9645] flex items-center justify-center overflow-hidden">
          <img
            src={projectImage || '/LawanginKhanLOGO-01.svg'}
            alt="Project"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-white p-2">{projecTitle}</h2>
      </div>

      <p className="text-white/80 text-sm py-2">{projectDescription}</p>

      <hr className="border-t border-white/30" />

      <div className="flex justify-between pt-2">
        <div className="flex gap-2">
          {icons?.map((Icon, index) => (
            <Icon
              key={index}
              className="w-8 h-8 p-1 rounded-full bg-white/30 flex items-center justify-center text-xs text-white"
            />
          ))}
        </div>

        <div className="flex gap-2">
          <a href={demoLink} target="_blank" rel="noopener noreferrer">
            <IoLogoGithub className="w-8 h-8 p-1 rounded-full bg-[#EE9645]/60 flex items-center justify-center text-xs text-white" />
          </a>
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            <IoIosGlobe className="w-8 h-8 p-1 rounded-full bg-[#BA68C8]/60 flex items-center justify-center text-xs text-white" />
          </a>
        </div>
      </div>
    </div>
  )
}
