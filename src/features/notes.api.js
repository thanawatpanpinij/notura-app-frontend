import api from "../lib/api";

async function getAllNotes() {
  const response = await api.get("/notes");
  return response.data;
}

async function createNote(note) {
  const response = await api.post("/notes", note);
  return response.data;
}

async function updateNote(id, content) {
  const response = await api.put(`/notes/${id}`, content);
  return response.data;
}

async function deleteNote(id) {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
}

export { getAllNotes, createNote, updateNote, deleteNote };
