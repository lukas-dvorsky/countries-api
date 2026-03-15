"use client";

import { Activity, useEffect, useRef, useState } from "react";

const MAX_ITEM_COUNT = 5;
const DEFAULT_DEBOUNCE_DELAY = 300;

interface SearchBarProps<
  T,
  K extends keyof T,
> extends React.HTMLAttributes<HTMLInputElement> {
  data: T[];
  searchBy: K[];
  showData?: K[];
  debounceDelay?: number;
  itemCount?: number;
  resetAfterAction?: boolean;
  action?: (item: T) => void;
}

function SearchBar<T, K extends keyof T>({
  data,
  searchBy,
  showData = searchBy,
  debounceDelay = DEFAULT_DEBOUNCE_DELAY,
  itemCount = MAX_ITEM_COUNT,
  action,
  resetAfterAction,
  ...inputAttr
}: SearchBarProps<T, K>) {
  const [query, setQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [showRecords, setShowRecords] = useState(query !== "");
  const [isFocused, setFocused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showData &&
        containerRef.current &&
        !containerRef.current.contains(e.target as HTMLDivElement)
      ) {
        setShowRecords(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showRecords]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!query) {
        setFilteredData([]);
        return;
      }

      const filteredData = data.filter((item) =>
        searchBy.some((searchKey) =>
          String(item[searchKey])
            .toLocaleLowerCase()
            .startsWith(query.toLocaleLowerCase()),
        ),
      );

      setFilteredData(filteredData.slice(0, 5));
    }, debounceDelay);

    return () => clearTimeout(t);
  }, [query]);

  const handleAction = (item: T) => {
    setShowRecords(false);
    resetAfterAction ? setQuery("") : null;
    action?.(item);
  };

  return (
    <div
      ref={containerRef}
      onFocus={() => {
        setShowRecords(true);
        setFocused(true);
      }}
      onBlur={() => setFocused(false)}
      className={`relative ${inputAttr.className}`}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if (filteredData.length === 0) return;
          handleAction(filteredData[focusedIndex]);
        }
        if (e.key === "ArrowDown") {
          setFocusedIndex((prev) => {
            if (prev === filteredData.length - 1) {
              return 0;
            } else {
              return prev + 1;
            }
          });
        }
        if (e.key === "ArrowUp") {
          setFocusedIndex((prev) => {
            if (prev === 0) {
              return filteredData.length - 1;
            } else {
              return prev - 1;
            }
          });
        }
      }}
    >
      <input
        {...inputAttr}
        type="text"
        className={`border-b py-2 px-2 w-full outline-0
          ${inputAttr.className}
          ${isFocused ? "border-blue-400" : "border-mist-400"}`}
        placeholder="Search country..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowRecords(true);
          setFocusedIndex(0);
        }}
      />
      <Activity mode={showRecords ? "visible" : "hidden"}>
        <div
          className={`border border-black/30 absolute z-50 ${filteredData.length !== 0 ? "" : "hidden"}`}
        >
          {filteredData.length !== 0 &&
            filteredData.map((item, index) => (
              <div
                key={index}
                className={`flex gap-4 bg-mist-50 hover:bg-mist-200 cursor-pointer py-1 px-4 ${inputAttr.className} ${focusedIndex === index ? "bg-mist-200" : ""}`}
                onClick={() => handleAction(item)}
              >
                {showData.map((key, index) => (
                  <span key={index}>{String(item[key])}</span>
                ))}
              </div>
            ))}
        </div>
      </Activity>
    </div>
  );
}

export default SearchBar;
