import { FaArrowDown } from 'react-icons/fa';

interface SkillIndicatorProps {
  label: string;
}

const ScrollIndicator = ({ label }: SkillIndicatorProps) => {
  return (
    <div className="flex items-center space-x-2 text-white py-2 animate-bounce">
      <span className="text-sm font-medium px-2 lg:text-lg">{label}</span>
      <FaArrowDown className="w-4 h-4" />
    </div>
  );
};

export default ScrollIndicator;