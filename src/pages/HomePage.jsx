import React, { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    document.title = "Notes App | Home";
  }, []);
  return (
    <main className="grid place-items-center min-h-[calc(100dvh-64px)] bg-gray-100">
      <h1 className="text-[3rem] text-blue-600 font-bold">📒 Welcome to Notes App!</h1>
    </main>
  );
}
