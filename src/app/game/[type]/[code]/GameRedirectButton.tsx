"use client";

import { useRouter } from "next/navigation";

interface GameRedirectButtonProps {
  url: string;
  title: string;
}

function GameRedirectButton({ title, url }: GameRedirectButtonProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(url)}
      className="w-44 h-44 shadow shadow-black/40 flex items-center justify-center bg-mist-50 cursor-pointer"
    >
      <span className="text-2xl">{title}</span>
    </div>
  );
}

export default GameRedirectButton;
