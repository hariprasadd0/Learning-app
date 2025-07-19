import React, { useState, useEffect, createContext } from 'react';
import { Volume2, VolumeX, RotateCcw, Trophy, Star, Clock } from 'lucide-react';

const LearningContext = createContext();

export const LearningProvider = ({ children }) => {
  const [currentModule, setCurrentModule] = useState('alphabet');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [completedItems, setCompletedItems] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [sessionData, setSessionData] = useState([]);

  const alphabetData = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  const numbersData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const getCurrentData = () =>
    currentModule === 'alphabet' ? alphabetData : numbersData;
  const getExpectedItem = () => getCurrentData()[currentIndex];

  useEffect(() => {
    const saved = localStorage.getItem('learningAppData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setScore(data.score || 0);
        setLevel(data.level || 1);
        setSessionData(data.sessionData || []);
      } catch (e) {
        console.log('Error loading saved data');
        throw new Error(e);
      }
    }
  }, []);

  // Save  to localStorage
  const saveData = (newData) => {
    const dataToSave = {
      score: newData.score || score,
      level: newData.level || level,
      sessionData: newData.sessionData || sessionData,
      lastPlayed: Date.now(),
    };
    localStorage.setItem('learningAppData', JSON.stringify(dataToSave));
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setCompletedItems([]);
    setIsComplete(false);
    setIsLevelComplete(false);
    setScore(0);
    setLevel(1);
    setStartTime(Date.now());
    setSessionData([]);
    localStorage.removeItem('learningAppData');
  };

  const switchModule = (module) => {
    setCurrentModule(module);
    setCurrentIndex(0);
    setCompletedItems([]);
    setIsComplete(false);
    setIsLevelComplete(false);
    setStartTime(Date.now());
  };

  const nextLevel = () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    setIsLevelComplete(false);
    saveData({ level: newLevel });
  };

  const handleCorrect = () => {
    const timeSpent = Date.now() - startTime;
    const newCompleted = [...completedItems, getExpectedItem()];
    const newScore = score + 10;
    const newSessionData = [
      ...sessionData,
      {
        item: getExpectedItem(),
        time: timeSpent,
        correct: true,
        module: currentModule,
        level: level,
        timestamp: Date.now(),
      },
    ];

    setCompletedItems(newCompleted);
    setCurrentIndex(currentIndex + 1);
    setScore(newScore);
    setSessionData(newSessionData);
    setStartTime(Date.now());

    saveData({
      score: newScore,
      sessionData: newSessionData,
    });

    if (newCompleted.length === getCurrentData().length) {
      setIsLevelComplete(true);
    }

    // Check if all complete
    if (newCompleted.length === getCurrentData().length) {
      setIsComplete(true);
    }
  };

  const handleWrong = (clickedItem) => {
    const timeSpent = Date.now() - startTime;
    const newSessionData = [
      ...sessionData,
      {
        item: getExpectedItem(),
        clicked: clickedItem,
        time: timeSpent,
        correct: false,
        module: currentModule,
        level: level,
        timestamp: Date.now(),
      },
    ];

    setSessionData(newSessionData);
    saveData({ sessionData: newSessionData });
  };

  return (
    <LearningContext.Provider
      value={{
        currentModule,
        currentIndex,
        score,
        level,
        completedItems,
        isComplete,
        isLevelComplete,
        soundEnabled,
        highContrast,
        sessionData,
        setSoundEnabled,
        setHighContrast,
        getCurrentData,
        getExpectedItem,
        resetGame,
        switchModule,
        nextLevel,
        handleCorrect,
        handleWrong,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export default LearningContext;
