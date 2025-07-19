import { useContext } from 'react';
import LearningContext from '../context/LearningContext';
import { Trophy } from 'lucide-react';

export const GameComplete = () => {
  const { score, resetGame, switchModule, currentModule } =
    useContext(LearningContext);

  return (
    <div className="text-center py-12">
      <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
      <h2 className="text-4xl font-bold text-green-600 mb-4">Amazing Work!</h2>
      <p className="text-xl text-gray-600 mb-8">
        You completed all {currentModule === 'alphabet' ? 'letters' : 'numbers'}
        !
      </p>

      <div className="bg-yellow-50 rounded-xl p-6 mb-8 inline-block">
        <p className="text-2xl font-bold text-yellow-600">
          Final Score: {score}
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Play Again
        </button>
        <button
          onClick={() =>
            switchModule(currentModule === 'alphabet' ? 'numbers' : 'alphabet')
          }
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          Try {currentModule === 'alphabet' ? 'Numbers' : 'Letters'}
        </button>
      </div>
    </div>
  );
};
