import { IoLogoGithub, IoIosGlobe } from 'react-icons/io'
import type { IconType } from 'react-icons/lib'
import SkillButton from '../SkillButton'

interface ProjectCardProps {
  projectTitle: string
  projectDescription: string
  projectImage?: string
  icons?: IconType[]
  demoLink?: string
  githubLink?: string
}

export const ProjectCard = ({
  projectTitle,
  projectDescription,
  projectImage,
  icons,
  demoLink,
  githubLink,
}: ProjectCardProps) => {
  const skills = [
    { name: 'React', color: 'bg-[#BA68C8]/60' },
    { name: 'TypeScript', color: 'bg-[#EE9645]/60' },
    { name: 'AWS', color: 'bg-[#BA68C8]/60' },
    { name: 'SQL', color: 'bg-[#EE9645]/60' },
    { name: 'Grafana', color: 'bg-[#BA68C8]/60' },
    { name: 'CSS', color: 'bg-[#EE9645]/60' },
  ]

  return (
    <div className="flex flex-col p-4 md:space-y-0">
      <div className="flex items-center space-x-4 md:flex-col md:items-start">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#BA68C8] to-[#EE9645] flex items-center justify-center overflow-hidden md:rounded-md md:w-full md:h-48">
          {/* potentially utilize object-cover for image  */}
          <img
            src={projectImage || '/LawanginKhanLOGO-01.svg'}
            alt="Project"
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-xl font-semibold text-white p-2 md:px-0">
          {projectTitle}
        </h2>
      </div>

      <div className="flex flex-wrap gap-2 h-0 w-0 invisible md:visible md:h-auto md:w-auto">
        {skills.map((skill, index) => (
          <SkillButton key={index} skill={skill} />
        ))}
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
