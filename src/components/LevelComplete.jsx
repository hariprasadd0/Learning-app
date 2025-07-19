import { useContext } from 'react';
import LearningContext from '../context/LearningContext';
import { Star } from 'lucide-react';

export const LevelComplete = () => {
  const { level, nextLevel } = useContext(LearningContext);

  return (
    <div className="text-center py-12">
      <Star className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        Level {level} Complete!
      </h2>
      <p className="text-xl text-gray-600 mb-8">
        Great job! Ready for the next level?
      </p>
      <button
        onClick={nextLevel}
        className="px-8 py-4 bg-green-600 text-white rounded-xl text-xl font-semibold hover:bg-green-700 transition-colors"
      >
        Continue to Level {level + 1}
      </button>
    </div>
  );
};
