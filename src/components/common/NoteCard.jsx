import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import UpdateNoteForm from "./UpdateNoteForm";

export default function NoteCard({ note }) {
  const { title, content, isPinned, createdOn } = note;
  const [showModal, setShowModal] = useState(false);

  const date = new Date(createdOn);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    <>
      <article
        className={`relative flex flex-col justify-between min-h-[300px] p-8 text-black bg-yellow rounded-2xl`}
      >
        {isPinned && <div className="absolute top-2 right-2 text-xl">📌</div>}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">{title}</h2>
          <p>{content}</p>
        </section>
        <section className="flex justify-between items-center">
          <p className="text-gray text-xs">{formattedDate}</p>
          <button
            aria-label="edit note"
            onClick={() => setShowModal(true)}
            className="cursor-pointer p-2 bg-black rounded-full"
          >
            <HiPencil color="white" size={20} />
          </button>
        </section>
      </article>
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="z-10 absolute inset-0 grid place-items-center bg-[rgb(17,24,39,0.4)] backdrop-blur-sm"
        >
          <UpdateNoteForm note={note} setShowModal={setShowModal} />
        </div>
      )}
    </>
  );
}
