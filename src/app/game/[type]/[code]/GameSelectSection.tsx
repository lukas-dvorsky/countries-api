"use client";

import GameRedirectButton from "./GameRedirectButton";

interface GameSelectionSectionProps<T, K extends keyof T> {
  data: T[];
  secitonTitle: string;
  titleKey: K;
  codeKey: K;
}

function GameSelectionSection<T, K extends keyof T>({
  data,
  secitonTitle,
  titleKey,
  codeKey,
}: GameSelectionSectionProps<T, K>) {
  return (
    <div className="flex flex-col gap-16">
      <span className="text-center text-3xl font-bold">{secitonTitle}</span>
      <div className="flex gap-8">
        {data.map((item, index) => {
          const bestTime = localStorage.getItem(String(item[codeKey]));

          return (
            <GameRedirectButton
              key={String(item[codeKey]) + index}
              title={String(item[titleKey])}
              url={`game/flags/${String(item[codeKey])}`}
              bestTime={bestTime}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GameSelectionSection;
