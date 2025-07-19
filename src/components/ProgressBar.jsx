import { useContext } from 'react';
import LearningContext from '../context/LearningContext';

export const ProgressBar = () => {
  const { completedItems, getCurrentData, score, level } =
    useContext(LearningContext);
  const total = getCurrentData().length;
  const progress = (completedItems.length / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-green-500 h-6 rounded-full transition-all duration-700 flex items-center justify-end pr-3"
          style={{ width: progress + '%' }}
        >
          {progress > 10 && (
            <span className="text-white text-sm font-bold">
              {completedItems.length}/{total}
            </span>
          )}
        </div>
      </div>

      {/* <div className="flex justify-center gap-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{score}</div>
          <div className="text-sm text-gray-600">Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{level}</div>
          <div className="text-sm text-gray-600">Level</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {Math.round(progress)}%
          </div>
          <div className="text-sm text-gray-600">Progress</div>
        </div>
      </div> */}
    </div>
  );
};
