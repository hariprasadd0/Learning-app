import { useContext } from 'react';
import LearningContext from '../context/LearningContext';
import { Volume2 } from 'lucide-react';
import { VolumeX } from 'lucide-react';
import { RotateCcw } from 'lucide-react';

export const Header = () => {
  const {
    currentModule,
    switchModule,
    resetGame,
    soundEnabled,
    setSoundEnabled,
    highContrast,
    setHighContrast,
    getExpectedItem,
    isComplete,
    isLevelComplete,
  } = useContext(LearningContext);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Learning {currentModule === 'alphabet' ? 'Letters' : 'Numbers'}
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => setHighContrast(!highContrast)}
            className="p-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition-colors"
            title="High Contrast"
          >
            <div
              className={`w-5 h-5 rounded ${
                highContrast ? 'bg-black' : 'bg-gray-600'
              }`}
            ></div>
          </button>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition-colors"
            title="Toggle Sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={resetGame}
            className="p-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition-colors"
            title="Reset Game"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => switchModule('alphabet')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            currentModule === 'alphabet'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Letters (A-Z)
        </button>
        <button
          onClick={() => switchModule('numbers')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            currentModule === 'numbers'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Numbers (0-9)
        </button>
      </div>
    </div>
  );
};
