import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { deleteNote, getAllNotes, updateNote } from "../../features/notes.api";
import useNoteContext from "../../contexts/NoteContext/useNoteContext";
import { LuTrash2 } from "react-icons/lu";

export default function UpdateNoteForm({ note, setShowModal }) {
  const {
    _id,
    title: defaultTitle,
    content: defaultContent,
    isPinned: defaultIsPinned,
  } = note;

  const { setNotes } = useNoteContext();

  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const [isPinned, setIsPinned] = useState(defaultIsPinned);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdateNote(e, id) {
    e.preventDefault();
    setShowModal(true);
    setIsError(false);

    if (!title || !content) return setIsError(true);

    try {
      setIsLoading(true);
      const response = await updateNote(id, { title, content, isPinned });
      console.log(response);
      const notesResponse = await getAllNotes();
      setNotes(notesResponse.notes);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  }

  async function handleDeleteNote(id) {
    if (!id) return;

    try {
      const response = await deleteNote(id);
      console.log(response);
      const notesResponse = await getAllNotes();
      setNotes(notesResponse.notes);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={(e) => handleUpdateNote(e, _id)}
      onClick={(e) => e.stopPropagation()}
      className="z-10 flex gap-4 flex-col w-[min(80%,512px)] p-8 text-black bg-white rounded-4xl"
    >
      <button
        aria-label="Close Create note modal"
        onClick={() => setShowModal(false)}
        className="relative text-2xl"
      >
        <IoClose className="cursor-pointer absolute right-0" />
      </button>
      <header className="text-center text-2xl font-bold">Update a Note</header>
      <label>
        Title
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-full mt-2 px-4 py-3 border border-black rounded-xl"
        />
        {isError && !title && (
          <p className="mt-2 text-red-400">Title is required</p>
        )}
      </label>
      <label>
        Content
        <textarea
          placeholder="content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className="w-full min-h-[150px] mt-2 px-4 py-3 border border-black rounded-xl"
        ></textarea>
        {isError && !content && (
          <p className="mt-2 text-red-400">Content is required</p>
        )}
      </label>
      {/* <label>
          Tags
          <input
            type="text"
            placeholder="Enter tags separated by commas"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            className="w-full mt-2 px-4 py-3 border border-black rounded-xl"
          />
        </label> */}
      <label>
        <input
          type="checkbox"
          checked={isPinned}
          onChange={(e) => setIsPinned(e.target.checked)}
          className="mr-2"
        />
        Pin this note
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          className="cursor-pointer w-[80%] px-4 py-3 text-white bg-black rounded-xl"
        >
          {isLoading ? "Saving..." : "Update note"}
        </button>
        <button
          aria-label="Delete this note"
          onClick={() => handleDeleteNote(_id)}
          className="cursor-pointer flex justify-center items-center w-[20%] bg-red-500 rounded-xl"
        >
          <LuTrash2 size={24} color="white" />
        </button>
      </div>
    </form>
  );
}
