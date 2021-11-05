import React from 'react'

interface SingleCardProps {
    card: Card,
    flipped: boolean,
    disabled: boolean,
    handleChoice: (card: Card) => void
}
 
const SingleCard: React.FC<SingleCardProps> = ({ card, flipped, disabled, handleChoice }) => {

  const handleClick = () => {
    !disabled && handleChoice(card);
  }

    return ( 
        <div className="card">
        <div className={flipped ? 'flipped': ''}>
            <img className="front" src={card.src} alt="card front" />
            <img className="back" src="/img/cover.png" alt="cover" onClick={handleClick} />
        </div>
      </div>
    );
}
 
export default SingleCard;