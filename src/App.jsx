import Player from './components/Player.jsx';
import TimerChallenge from './components/TimerChallene.jsx';

function App() {
  return (
    <>
      <Player />
      <div id='challenges'>
        <TimerChallenge title={"Bronze"} targetTime={1}/>
        <TimerChallenge title={"Silver"} targetTime={5}/>
        <TimerChallenge title={"Gold"} targetTime={10}/>
        <TimerChallenge title={"Platinum"} targetTime={15}/>
      </div>
    </>
  );
}

export default App;
