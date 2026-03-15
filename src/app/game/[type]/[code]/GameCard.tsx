interface Option {}

interface GameCardProps {
  question: React.ReactNode;
  options: Option[];
}

function GameCard({}: GameCardProps) {
  return <div></div>;
}

export default GameCard;
