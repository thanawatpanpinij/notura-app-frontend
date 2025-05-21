import { useState } from "react";
import CreateModalContext from "./CreateModalContext";

export default function CreateModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <CreateModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </CreateModalContext.Provider>
  );
}
