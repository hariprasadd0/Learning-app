import { useContext } from 'react';
import LearningContext from '../context/LearningContext';

export const useAudio = () => {
  const { soundEnabled } = useContext(LearningContext);

  const playSound = (type) => {
    if (!soundEnabled) return;

    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (type === 'success') {
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
      } else {
        oscillator.frequency.value = 200;
        gainNode.gain.value = 0.1;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
      }
    } catch (e) {
      console.log(e, 'Audio not available');
    }
  };

  const vibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  return { playSound, vibrate };
};
