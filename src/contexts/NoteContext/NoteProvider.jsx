import { useEffect, useState } from "react";
import NoteContext from "./NoteContext";
import { getAllNotes } from "../../features/notes.api";
import useAuthContext from "../AuthContext/useAuthContext";

export default function NoteProvider({ children }) {
  const { user } = useAuthContext();

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      try {
        const data = await getAllNotes();
        console.log(data);
        setNotes(data.notes);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
}
