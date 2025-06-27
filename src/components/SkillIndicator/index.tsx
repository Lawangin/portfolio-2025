import { FaArrowDown } from 'react-icons/fa';

interface SkillIndicatorProps {
  label: string;
  onClick?: () => void;
}

const SkillIndicator = ({ label, onClick }: SkillIndicatorProps) => {
  return (
    <div className="flex items-center space-x-2 text-white py-2 animate-bounce" onClick={onClick}>
      <span className="text-sm font-medium px-2 lg:text-lg">{label}</span>
      <FaArrowDown className="w-4 h-4" />
    </div>
  );
};

export default SkillIndicator;