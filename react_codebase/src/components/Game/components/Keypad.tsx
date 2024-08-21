import React, { useState, useEffect } from 'react';

interface Key {
  key: string;
}

interface UsedKeys {
  [key: string]: string;
}

interface KeypadProps {
  keys: Key[];
  usedKeys: UsedKeys;
}

const Keypad: React.FC<KeypadProps> = ({ keys, usedKeys }) => {
  const [letters, setLetters] = useState<Key[] | null>(null);

  useEffect(() => {
    setLetters(keys);
  }, [keys]);

  return (
    <div className="keypad">
      {letters && letters.map(l => {
        const color = usedKeys[l.key];
        return (
          <div key={l.key} className={color}>{l.key}</div>
        );
      })}
    </div>
  );
}

export default Keypad;
