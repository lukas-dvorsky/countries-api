import { useEffect } from "react";

interface GameFinalScreenProps {
  answers: { right: number; wrong: number };
  hideRightAnswers?: boolean;
  time: string;
  resetGame: () => void;
}

function GameFinalScreen({
  answers,
  hideRightAnswers,
  time,
  resetGame,
}: GameFinalScreenProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-4xl">Congratulations!</p>
      <span>You did it!</span>
      <p>{time}</p>
      <div className="flex flex-col">
        {!hideRightAnswers && (
          <p>
            Right answers: <span className="font-bold">{answers.right}</span>
          </p>
        )}
        <p>
          Wrong answers: <span className="font-bold">{answers.wrong}</span>
        </p>
      </div>
      <div className="flex gap-12">
        <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-md cursor-pointer">
          <a href="/">Choose different game</a>
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-md cursor-pointer"
          onClick={resetGame}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default GameFinalScreen;
