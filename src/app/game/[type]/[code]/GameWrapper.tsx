"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import GameFinalScreen from "./GameFinalScreen";
import Timer, { TimerHandle } from "@/components/UI/Timer";

type GameWrapperProps<T, K extends keyof T> = {
  dataset: T[];
  countryCode: K;
  optionKey: K;
  numberOfOptions?: number;
  removeOnWrongAnswer?: boolean;
  nextQuestionOnWrongAnswer?: boolean;
  localstorageSetting?: GameLocalStorageProps;
};

export interface GameLocalStorageProps {
  saveToLocalStorage: boolean;
  saveAs: string;
}

function GameWrapper<T, K extends keyof T>({
  dataset,
  countryCode,
  optionKey,
  numberOfOptions = 3,
  removeOnWrongAnswer,
  nextQuestionOnWrongAnswer,
  localstorageSetting,
}: GameWrapperProps<T, K>) {
  if (numberOfOptions > dataset.length) {
    throw new Error("numberOfOptions cannot be larger than dataset lenght!");
  }
  const [unanswered, setUnanswered] = useState<T[]>(dataset);
  const [highlightedButtons, setHighlightedButtons] = useState<number[]>([]);
  const [finalTime, setFinalTime] = useState<string>("-");
  const [buttonsDisabled, setButtonDisabled] = useState(false);
  const stats = useRef<{ right: number; wrong: number }>({
    right: 0,
    wrong: 0,
  });
  const timerRef = useRef<TimerHandle | null>(null);
  const randomIndex = useMemo(
    () => Math.floor(Math.random() * unanswered.length),
    [unanswered],
  );
  const randomQuestion = unanswered[randomIndex];

  useEffect(() => {
    setHighlightedButtons([]);
  }, [unanswered]);

  const handleOptionClick = useCallback(
    (option: T, btnIndex: number) => {
      // Right Answer
      if (buttonsDisabled || highlightedButtons.includes(btnIndex)) return;
      if (randomQuestion[optionKey] === option[optionKey]) {
        stats.current.right += 1;

        if (unanswered.length === 1) {
          timerRef.current?.pause();
          setFinalTime(timerRef.current?.getTimeFormatted() ?? "-");
        }

        setUnanswered((prev) => prev.filter((f) => f !== randomQuestion));
        // Wrong Answer
      } else {
        stats.current.wrong += 1;
        if (nextQuestionOnWrongAnswer || removeOnWrongAnswer) {
          setButtonDisabled(true);
          setHighlightedButtons((prev) => [...prev, btnIndex]);
          setTimeout(() => {
            if (removeOnWrongAnswer)
              setUnanswered((prev) => prev.filter((f) => f !== randomQuestion));

            setButtonDisabled(false);
          }, 1000);
        } else {
          setButtonDisabled(true);
          setHighlightedButtons((prev) => [...prev, btnIndex]);
          setTimeout(() => {
            if (removeOnWrongAnswer)
              setUnanswered((prev) => prev.filter((f) => f !== randomQuestion));

            setButtonDisabled(false);
          }, 1000);
        }
      }
    },
    [
      unanswered,
      randomQuestion,
      optionKey,
      removeOnWrongAnswer,
      nextQuestionOnWrongAnswer,
      highlightedButtons,
      buttonsDisabled,
    ],
  );

  const options: T[] = useMemo(() => {
    const tempDataset = dataset.filter((item) => item !== randomQuestion);
    const shuffled = [...tempDataset].sort(() => Math.random() - 0.5);

    return [randomQuestion, ...shuffled.slice(0, numberOfOptions - 1)].sort(
      () => Math.random() - 0.5,
    );
  }, [unanswered]);

  if (unanswered.length === 0) {
    if (localstorageSetting?.saveToLocalStorage && timerRef.current) {
      const prev = localStorage.getItem(localstorageSetting.saveAs);
      const current = timerRef.current.getTimeFormatted();

      if (
        !prev ||
        (prev && +prev.split(":")[0] < +current.split(":")[0]) ||
        (+prev.split(":")[0] === +current.split(":")[0] &&
          +prev.split(":")[1] < +current.split(":")[1])
      ) {
        localStorage.setItem(localstorageSetting.saveAs, current);
      }
    }

    return (
      <GameFinalScreen
        hideRightAnswers={removeOnWrongAnswer}
        time={finalTime}
        answers={stats.current}
        resetGame={() => {
          setUnanswered(dataset);
          stats.current = { right: 0, wrong: 0 };
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex justify-between w-full">
        <p>
          {dataset.length - unanswered.length} / {dataset.length}
        </p>
        <Timer ref={timerRef} immediateStart hideHours />
      </div>
      <img
        src={`https://flagcdn.com/${String(randomQuestion[countryCode]).toLocaleLowerCase()}.svg`}
        alt={`${String(randomQuestion[countryCode])} Flag`}
        draggable={false}
        className="select-none max-h-44 bg-inherit sm:max-h-56 border-t border-black/10 sticky top-0 z-5 shadow-sm shadow-black/20"
      />
      <div className="flex gap-8">
        {options.map((option, index) => {
          return (
            <button
              key={String(option[optionKey])}
              onClick={() => handleOptionClick(option, index)}
              className={`bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-md cursor-pointer ${highlightedButtons.includes(index) ? "bg-red-500 hover:bg-red-500 cursor-none" : ""}`}
              type="button"
              disabled={buttonsDisabled}
            >
              {String(option[optionKey])}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GameWrapper;
