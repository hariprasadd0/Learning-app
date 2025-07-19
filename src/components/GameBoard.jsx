import { useContext, useState } from 'react';
import { Card } from './Card';
import { GameComplete } from './GameComplete';
import { LevelComplete } from './LevelComplete';
import LearningContext from '../context/LearningContext';
import { useAudio } from '../hooks/useAudio';
import { useEffect } from 'react';

export const GameBoard = () => {
  const {
    getCurrentData,
    getExpectedItem,
    completedItems,
    handleCorrect,
    handleWrong,
    isComplete,
    isLevelComplete,
  } = useContext(LearningContext);

  const { playSound, vibrate } = useAudio();
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const handleClick = (clickedItem) => {
    const expected = getExpectedItem();
    const data = getCurrentData();
    const expectedIndex = data.indexOf(expected);

    if (clickedItem === expected) {
      playSound('success');
      handleCorrect();
      setHighlightIndex(-1);
    } else {
      playSound('error');
      vibrate();
      handleWrong(clickedItem);
      setHighlightIndex(expectedIndex);

      setTimeout(() => setHighlightIndex(-1), 3000);
    }
  };
  const data = getCurrentData();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      if (data.includes(key)) {
        handleClick(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data, handleClick]);
  if (isComplete) return <GameComplete />;
  if (isLevelComplete) return <LevelComplete />;

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
      {data.map((item, index) => (
        <Card
          key={item}
          item={item}
          isCompleted={completedItems.includes(item)}
          isHighlighted={highlightIndex === index}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};
