import { LearningProvider } from './context/LearningContext';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { GameBoard } from './components/GameBoard';

const App = () => {
  return (
    <LearningProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <Header />
          <ProgressBar />
          <GameBoard />
        </div>
      </div>
    </LearningProvider>
  );
};

export default App;
