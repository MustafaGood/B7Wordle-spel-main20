import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Setting {
  startTime: string;
  letterCount: string;
  letterRepeat: boolean;
}

interface ModalProps {
  isCorrect: boolean;
  guesses: (string | null)[]; // Assuming each guess can be a string or null
  setting: Setting;
  score: number;
  solution: string;
  turn: number;
}

interface FormData {
  Name: string;
}

const Modal: React.FC<ModalProps> = ({ isCorrect, guesses, setting, score, solution, turn }) => {
  const [formData, setFormData] = useState<FormData>({ Name: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentStartTime = new Date().toISOString();
    const data = {
      Name: formData.Name,
      startTime: setting.startTime,
      endTime: currentStartTime, 
      guesses: guesses,
      score,
      letterCount: parseInt(setting.letterCount), 
      letterRepeat: `${setting.letterRepeat}`
    };
    axios.post('http://localhost:5080/v1/score', data).then(function () {
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="modal">
      {isCorrect ? (
        <div>
          <h1>Congrats, You Won!</h1>
          <p className="solution">{solution}</p>
          <p>You found the word in {turn} guesses</p>
          <p>Score: {score}</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="Name">Name</label>
            <input type="text" id="letterCount" name="Name" value={formData.Name} onChange={handleChange} required />
            <br />
            <button type="submit">Submit</button>
          </form> 
        </div>
      ) : (
        <div>
          <h1>Sorry, you lost</h1>
          <p className="solution">{solution}</p>
          <p>Better luck next time</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
    </div>
  );
};

export default Modal;
