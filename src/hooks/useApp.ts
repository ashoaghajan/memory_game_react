import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const cardImages = [
    { "src": "/img/helmet-1.png", matched: false },
    { "src": "/img/potion-1.png", matched: false },
    { "src": "/img/ring-1.png", matched: false },
    { "src": "/img/scroll-1.png", matched: false },
    { "src": "/img/shield-1.png", matched: false },
    { "src": "/img/sword-1.png", matched: false },
  ];

export const useApp = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState<Card|null>(null);
    const [choiceTwo, setChoiceTwo] = useState<Card|null>(null);
    const [disabled, setDisabled] = useState(false);
  
    useEffect(() => {
      shuffleCards();
    },[]);
  
     const shuffleCards = () => {
      const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map(card => ({ ...card, id: uuidv4() }));
        
      setCards(shuffledCards);
      setChoiceOne(null);
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
      setDisabled(false);
    }
  
    const handleChoice = (card: Card) => {
      if(choiceOne){
        setDisabled(true);
        setChoiceTwo(card);
        compareCards(choiceOne, card);
        setTurns(prev => prev + 1);
        setTimeout(resetTurn, 1000);
      }
      else{
        setChoiceOne(card);
      }
    }

    return { shuffleCards, cards, handleChoice, disabled, choiceOne, choiceTwo, turns }
}