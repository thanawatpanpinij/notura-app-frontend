import { IoClose } from "react-icons/io5";
import useModalContext from "../../contexts/CreateModalContext/useCreateModalContext";
import { useState } from "react";
import { createNote, getAllNotes } from "../../features/notes.api";
import useNoteContext from "../../contexts/NoteContext/useNoteContext";

export default function CreateNoteForm() {
  const { setShowModal } = useModalContext();
  const { setNotes } = useNoteContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [tags, setTags] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setIsError(false);
    if (!title || !content) return setIsError(true);

    try {
      setIsLoading(true);
      const response = await createNote({
        title,
        content,
        // tags: tags.split(",").map((tag) => tag.trim()),
        isPinned,
      });
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

  return (
    <form
      action={handleSubmit}
      onClick={(e) => e.stopPropagation()}
      className="flex gap-4 flex-col w-[min(80%,512px)] p-8 text-black bg-white rounded-4xl"
    >
      <button
        aria-label="Close Create note modal"
        onClick={() => setShowModal(false)}
        className="relative text-2xl"
      >
        <IoClose className="cursor-pointer absolute right-0" />
      </button>
      <header className="text-center text-2xl font-bold">
        Create a New Note
      </header>
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
      <button
        type="submit"
        className="cursor-pointer w-full px-4 py-3 text-white bg-black rounded-xl"
      >
        {isLoading ? "Saving..." : "Create Note"}
      </button>
    </form>
  );
}
