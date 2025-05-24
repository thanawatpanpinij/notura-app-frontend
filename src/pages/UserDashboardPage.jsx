import { CiSearch } from "react-icons/ci";
import NoteCard from "../components/common/NoteCard";
import CreateNoteForm from "../components/common/CreateNoteForm";
import useNoteContext from "../contexts/NoteContext/useNoteContext";
import useCreateModalContext from "../contexts/CreateModalContext/useCreateModalContext";

export default function UserDashboardPage() {
  const { showModal, setShowModal } = useCreateModalContext();
  const { notes } = useNoteContext();

  return (
    <section className="w-full px-16 py-8">
      <section className="flex gap-3 items-center mb-8">
        <CiSearch />
        <input type="text" placeholder="Search" />
      </section>
      <h1 className="mb-8 text-[4rem] font-bold">Notes</h1>
      <section className="grid gap-4 767:grid-cols-2 1080:grid-cols-3 1440:grid-cols-5">
        {notes.length === 0 ? (
          <p className="text-gray">There is no notes here</p>
        ) : (
          notes.map((note) => <NoteCard key={note._id} note={note} />)
        )}
      </section>

      {/* Create Note Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="absolute inset-0 grid place-items-center bg-[rgb(17,24,39,0.4)] backdrop-blur-sm"
        >
          <CreateNoteForm />
        </div>
      )}
    </section>
  );
}
