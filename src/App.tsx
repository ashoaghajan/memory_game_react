import SingleCard from './components/SingleCard';
import { useApp } from './hooks/useApp';

function App() {

  const { shuffleCards, cards, handleChoice, disabled, choiceOne, choiceTwo, turns } = useApp();

  return (
    <div className="App">
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id} card={card}  handleChoice={handleChoice} disabled={disabled}
            flipped={card === choiceOne || card === choiceTwo || card.matched}/>
        ))}
      </div>
      <p>Turn {turns}</p>
    </div>
  );
}

export default App;
