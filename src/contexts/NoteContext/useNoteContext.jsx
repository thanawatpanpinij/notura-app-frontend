import { useContext } from "react";
import NoteContext from "./NoteContext";

const useNoteContext = () => useContext(NoteContext);

export default useNoteContext;
