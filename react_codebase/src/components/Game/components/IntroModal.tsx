import React, { ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Setting {
  letterCount: string;
  letterRepeat: boolean;
  startTime: string;
}

interface IntroModalProps {
  setSolution: (solution: string) => void;
  setting: Setting;
  setSetting: React.Dispatch<React.SetStateAction<Setting>>;
  setModal: (modal: boolean) => void;
}

const IntroModal: React.FC<IntroModalProps> = ({ setSolution, setting, setSetting, setModal }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSetting((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentStartTime = new Date().toISOString();

    const updatedSettings = {
      ...setting,
      startTime: currentStartTime,
    };
    setSetting(updatedSettings);

    axios.post('http://localhost:5080/v1/word', {
      letterCount: parseInt(setting.letterCount),
      repeated: `${setting.letterRepeat}`,
    })
      .then(response => {
        setSolution(response.data.word);
      })
      .catch(error => {
        console.log(error);
      });

    setModal(false);
  };

  return (
    <div className="modal">
      <div>
        <h1>Welcome to wordle input your setting</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="letterCount">Letter Count</label>
          <input type="number" id="letterCount" name="letterCount" value={setting.letterCount} onChange={handleChange} required />
          <br />
          <label htmlFor="letterRepeat">
            <input type="checkbox" id="letterRepeat" name="letterRepeat" checked={setting.letterRepeat} onChange={handleChange} />
            Letter Repeat
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default IntroModal;
