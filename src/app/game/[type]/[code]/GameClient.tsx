"use client";

import { useState } from "react";
import GameWrapper from "./GameWrapper";
import CheckBox from "@/components/UI/Checkbox";

interface GameClientProps<T, K extends keyof T> {
  dataset: T[];
  countryCode: K;
  optionKey: K;
}

interface GameOptions {
  removeOnWrongAnswer: boolean;
  nextQuestionOnWrongAnswer: boolean;
}

function GameClient<T, K extends keyof T>({
  dataset,
  countryCode,
  optionKey,
}: GameClientProps<T, K>) {
  const [gameOptions, setGameOptions] = useState<GameOptions>({
    nextQuestionOnWrongAnswer: false,
    removeOnWrongAnswer: false,
  });
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <>
      {gameStarted ? (
        <GameWrapper
          dataset={dataset}
          countryCode={countryCode}
          optionKey={optionKey}
          {...gameOptions}
        />
      ) : (
        <div className="flex flex-col gap-16">
          <button
            onClick={() => setGameStarted(true)}
            className="cursor-pointer px-4 mx-auto py-2 w-1/2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start game
          </button>
          <div className="flex gap-12">
            <CheckBox
              label="Move to next question on wrong answer."
              onCheck={(val) => {
                setGameOptions((prev) => ({
                  ...prev,
                  nextQuestionOnWrongAnswer: val,
                }));
              }}
            />
            <CheckBox
              label="Remove question from question pool on wrong answer. "
              onCheck={(val) => {
                setGameOptions((prev) => ({
                  ...prev,
                  removeOnWrongAnswer: val,
                }));
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default GameClient;
