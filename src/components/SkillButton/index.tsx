import type React from 'react'
import { Button } from '../ui/button'

interface SkillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  skill: {
    name: string
    color: string
  }
}

const SkillButton = ({ skill, ...props }: SkillButtonProps) => {
  return (
    <Button
      className={`rounded-md text-white text-xs font-normal bg-[#EE9645]/60 border border-white/60 px-2`}
      {...props}
    >
      {skill.name}
    </Button>
  )
}

export default SkillButton
