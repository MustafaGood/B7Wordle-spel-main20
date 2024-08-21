import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the type for the data items
interface ScoreData {
  _id: string;
  Name: string;
  startTime: string;
  endTime: string;
  guesses: Array<Array<{ key: string; color: string }> | null>;
  score: number;
  letterCount: number;
  letterRepeat: boolean;
  __v: number;
}

const Score: React.FC = () => {
  const [data, setData] = useState<ScoreData[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5080/v1/score')
      .then(response => {
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          const sortedData = [...response.data.data].sort((a: ScoreData, b: ScoreData) => b.score - a.score);
          setData(sortedData);
        } else {
          console.error('Invalid response data:', response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []); // Empty dependency array to run only once

  return (
    <div className='list'>
      <div className='listItem'>
        <p>Name</p>
        <p>Score</p>
        <p>Letter Count</p>
      </div>
      {data.map((D) => (
        <div key={D._id} className='listItem'>
          <p>{D.Name}</p>
          <p>{D.score}</p>
          <p>{D.letterCount}</p>
        </div>
      ))}
    </div>
  );
}

export default Score;
