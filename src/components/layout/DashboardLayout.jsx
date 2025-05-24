import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Aside from "../common/Aside";
import useAuthContext from "../../contexts/AuthContext/useAuthContext";
import useNoteContext from "../../contexts/NoteContext/useNoteContext";
import { getAllNotes } from "../../features/notes.api";

export default function DashboardLayout() {
  const { user, isLoading, getCurrentUser } = useAuthContext();
  const { notes, setNotes } = useNoteContext();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await getCurrentUser();
      const notesResponse = await getAllNotes();
      setNotes(notesResponse.notes);
    })();
  }, []);

  if (!notes || isLoading) return <div>Loading...</div>;
  if (!user) {
    navigate("/login");
    return;
  }

  return (
    <main className="flex">
      <Aside />
      <Outlet />
    </main>
  );
}
