import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card|null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card|null>(null);

  useEffect(() => {
    shuffleCards();
  },[])

   const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: uuidv4() }));
      
    setCards(shuffledCards);
    setTurns(0);
  }

  
const compareCards = (card1: Card, card2: Card) => {
  if(card1.src === card2.src){
    setCards(prev => prev.map(card => {
      return card.src === card1.src ? { ...card, matched: true } : card;
    }));
  }
} 

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
  }

  const handleChoice = (card: Card) => {
    if(choiceOne){
      setChoiceTwo(card);
      compareCards(choiceOne, card);
      setTimeout(resetTurn, 1000);
    }
    else{
      setChoiceOne(card);
    }
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turn {turns}</p>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id} card={card}  handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}/>
        ))}
      </div>
    </div>
  );
}

export default App;
