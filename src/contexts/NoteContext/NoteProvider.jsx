import { useState } from "react";
import NoteContext from "./NoteContext";

export default function NoteProvider({ children }) {
  const [notes, setNotes] = useState(null);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
}
