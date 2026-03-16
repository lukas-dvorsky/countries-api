"use client";

import { useEffect, useState } from "react";
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
  const [bestTimes, setBestTimes] = useState<Record<string, string | null>>();

  useEffect(() => {
    const times: Record<string, string | null> = {};

    data.forEach((item) => {
      const key = String(item[codeKey]);
      times[key] = localStorage.getItem(key);
    });

    setBestTimes(times);
  }, [data, codeKey]);

  return (
    <div className="flex flex-col gap-16">
      <span className="text-center text-3xl font-bold">{secitonTitle}</span>
      <div className="flex-col flex gap-8 lg:flex-row">
        {data.map((item, index) => {
          const key = String(item[codeKey]);

          return (
            <GameRedirectButton
              key={key + index}
              title={key}
              url={`game/flags/${key}`}
              bestTime={bestTimes ? bestTimes[key] : null}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GameSelectionSection;
