import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    document.title = "Notura | Home";
  }, []);
  return (
    <main className="flex gap-4 flex-col justify-center min-h-[calc(100dvh-81px)]">
      <h1 className="text-center text-[4rem] text-black font-semibold">
        Organize Your Notes
        <br />
        Tasks and{" "}
        <span className="text-transparent font-bold bg-gradient-to-r from-yellow to-[#E65AD6] bg-clip-text">
          Projects
        </span>
      </h1>
      <p className="text-center text-gray text-xl">
        Manage everything seamlessly and boost productivity whether working solo
        or collaborating with a team
      </p>
    </main>
  );
}
