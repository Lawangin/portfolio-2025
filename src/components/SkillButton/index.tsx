import type React from "react";
import { Button } from "../ui/button";

interface SkillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  skill: {
    name: string;
    color: string;
  };
}

const SkillButton = ({ skill, ...props }: SkillButtonProps) => {
  return (
    <Button
    className={`rounded-md text-white font-normal bg-[#BA68C8]/60 border border-white/60 px-4 py-2`}
    {...props}
  >
    {skill.name}
  </Button>
  );
}

export default SkillButton;