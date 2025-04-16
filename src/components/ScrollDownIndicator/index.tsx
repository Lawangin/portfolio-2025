import { FaArrowDown } from 'react-icons/fa';

const ScrollDownIndicator = () => {
  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-2 text-white animate-bounce">
      <span className="text-sm font-medium px-2 lg:text-lg">Scroll Down</span>
      <FaArrowDown className="w-4 h-4" />
    </div>
  );
};

export default ScrollDownIndicator;