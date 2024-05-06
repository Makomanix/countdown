import { useState, useRef } from 'react'
import ResultModal from './ResultModal';

export default function TimerChallenge({ title, targetTime }) {

  const highScore = localStorage.getItem(targetTime) ?? 0;

  const timer = useRef();
  const dialog = useRef();

  const [ timeRemaining, setTimeRemaining ] = useState(targetTime * 1000);
  const [ deletedScore, setDeletedScore ] = useState(false)

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100)

  if (timeRemaining <= 0) {
    handleStop()
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
    }, 10)
  }

  function handleStop() {
    clearInterval(timer.current)
    dialog.current.open()
  }

  function handleReset() {
    if(score > highScore && timeRemaining > 0) {
      localStorage.setItem(targetTime, score)
    }
    setTimeRemaining(targetTime * 1000)
  }

  function handleClearHighScore() {
    localStorage.removeItem(targetTime);
    setDeletedScore(prevDeletedScore => !prevDeletedScore);
  }
    console.log(typeof(title))

  return (
    <>
      <ResultModal 
      ref={dialog} 
      targetTime={targetTime} 
      remainingTime={timeRemaining} 
      onReset={handleReset}
      score={score}/>
      <section className={`challenge ${title}`} >
        <h2>{title}</h2>
        <p className="challenge-time">{targetTime} second{targetTime > 1 ? "s" : ''}</p>
        <p>
          <button className='start-stop' onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? "Stop" : "Start"} Timer</button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          Timer {timerIsActive ? "active" : "inactive"}
        </p>
        <h3>Current HighScore: {highScore}</h3>
        <p>
          <button className='clear' onClick={handleClearHighScore}>Reset HighScore</button>
        </p>
      </section>
    </>
  )
}