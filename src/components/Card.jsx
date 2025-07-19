import { useContext } from 'react';
import LearningContext from '../context/LearningContext';

export const Card = ({ item, isCompleted, isHighlighted, onClick }) => {
  const { highContrast, level } = useContext(LearningContext);

  const getCardStyle = () => {
    let classes =
      'w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold cursor-pointer transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300';

    if (highContrast) {
      if (isCompleted)
        return classes + ' bg-black text-white border-4 border-green-400';
      if (isHighlighted)
        return classes + ' bg-yellow-400 text-black border-4 border-red-600';
      return classes + ' bg-white text-black border-4 border-gray-800';
    }

    if (isCompleted) return classes + ' bg-green-600 text-white';
    if (isHighlighted)
      return classes + ' bg-yellow-400 text-gray-900 ring-4 ring-blue-500';

    const levelColors = [
      'bg-blue-600',
      'bg-purple-600',
      'bg-indigo-600',
      'bg-emerald-600',
      'bg-rose-600',
    ];
    const colorIndex = Math.min(level - 1, 4);

    return classes + ' text-white ' + levelColors[colorIndex];
  };

  return (
    <button
      className={getCardStyle()}
      onClick={() => onClick(item)}
      aria-label={`Letter ${item}`}
    >
      {item}
    </button>
  );
};
