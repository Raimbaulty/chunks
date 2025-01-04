import React, { useState, useEffect } from 'react';
import styles from './WordDalgona.module.css';

interface Props {
  onComplete: (stars: number) => void;
  currentStars: number;
}

const words = [
  { word: 'HELLO', difficulty: 1 },
  { word: 'WORLD', difficulty: 1 },
  { word: 'PROGRAMMING', difficulty: 2 },
  { word: 'JAVASCRIPT', difficulty: 2 },
  { word: 'TYPESCRIPT', difficulty: 3 },
  { word: 'DEVELOPMENT', difficulty: 3 },
];

const WordDalgona: React.FC<Props> = ({ onComplete, currentStars }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(1);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
  }, [timeLeft, isPlaying]);

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(60);
    setScore(0);
    setDifficulty(1);
    pickNewWord();
  };

  const pickNewWord = () => {
    const availableWords = words.filter(w => w.difficulty === difficulty);
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(randomWord.word);
    setUserInput('');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toUpperCase();
    setUserInput(input);

    if (input === currentWord) {
      setScore(prev => prev + difficulty);
      if (score + difficulty >= 5 && difficulty < 3) {
        setDifficulty(prev => prev + 1);
      }
      pickNewWord();
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    let stars = 1;
    if (score >= 10) stars = 2;
    if (score >= 15) stars = 3;
    onComplete(stars);
  };

  return (
    <div className={styles.container}>
      {!isPlaying ? (
        <div className={styles.startScreen}>
          <h2>单词达尔戈纳</h2>
          <p>在限定时间内正确输入显示的单词，难度会随着得分提升！</p>
          <p>当前最高星星数: {currentStars}⭐</p>
          <button onClick={startGame}>开始游戏</button>
        </div>
      ) : (
        <div className={styles.gameScreen}>
          <div className={styles.stats}>
            <div>时间: {timeLeft}s</div>
            <div>得分: {score}</div>
            <div>难度: {difficulty}</div>
          </div>
          <div className={styles.wordDisplay}>{currentWord}</div>
          <input
            type="text"
            value={userInput}
            onChange={handleInput}
            className={styles.input}
            placeholder="输入单词..."
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default WordDalgona; 