import React, { useEffect, useState } from 'react';
import Wordle from './components/Wordle';
import IntroModal from './components/IntroModal';

interface Setting {
  letterCount: string;
  letterRepeat: boolean;
  startTime: string;
}

const Game: React.FC = () => {
  const [solution, setSolution] = useState<string | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [setting, setSetting] = useState<Setting>({
    letterCount: '',
    letterRepeat: false,
    startTime: '',
  });

  useEffect(() => {
    setModal(true);
  }, []);

  return (
    <div className="Game">
      {solution && <Wordle solution={solution} setting={setting} />}
      {modal && (
        <IntroModal
          setSolution={setSolution}
          setSetting={setSetting}
          setting={setting}
          setModal={setModal}
        />
      )}
    </div>
  );
};

export default Game;
