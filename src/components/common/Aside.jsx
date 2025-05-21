// import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import useCreateModalContext from "../../contexts/CreateModalContext/useCreateModalContext";
import { useEffect, useRef, useState } from "react";
import useAuthContext from "../../contexts/AuthContext/useAuthContext";
import { logout } from "../../features/auth.api";
// import useNoteContext from "../../contexts/NoteContext/useNoteContext";

export default function Aside() {
  const { setShowModal } = useCreateModalContext();
  const { user } = useAuthContext();

  const [showOptions, setShowOptions] = useState(false);

  const userOptions = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (!userOptions.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    try {
      const response = await logout();
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  // const { setNoteColor } = useNoteContext();
  // const [show, setShow] = useState(false);
  return (
    <aside className="sticky top-0 flex flex-col justify-between items-center max-w-[144px] h-screen px-4 py-8 text-black bg-white border-r border-light-gray">
      <section className="flex gap-14 flex-col items-center">
        <Link to="/">
          <p className="text-2xl font-bold">Notura</p>
        </Link>
        <div className="flex flex-col items-center">
          <button
            aria-label="Add a note"
            onClick={() => setShowModal(true)}
            className="cursor-pointer mb-8"
          >
            <FaCirclePlus size={40} />
          </button>
          {/* {show && (
            <div className="flex flex-col gap-4">
              {["yellow", "pink", "violet", "cyan", "lemon", "gray"].map(
                (color) => (
                  <button
                    key={color}
                    aria-label={`Create and set note color to ${color}`}
                    onClick={() => setNoteColor(color)}
                    className={`cursor-pointer w-[20px] aspect-square bg-${color} rounded-full`}
                  ></button>
                )
              )}
            </div>
          )} */}
        </div>
      </section>
      <section className="relative">
        <div
          onClick={() => setShowOptions(!showOptions)}
          className="overflow-hidden cursor-pointer w-[50px] rounded-full"
        >
          <img
            src="https://placehold.co/50x50"
            alt=""
            className="w-full object-cover aspect-square"
          />
        </div>
        {showOptions && (
          <ul
            ref={userOptions}
            className="overflow-hidden absolute bottom-[2rem] left-[3rem] w-max bg-gray-100 rounded-[8px]"
          >
            <li className="px-4 py-2 text-xl font-bold border-b border-gray">
              {user.fullName}
            </li>
            <li
              onClick={handleLogout}
              className="cursor-pointer px-4 py-2 hover:text-white hover:bg-black"
            >
              Log out
            </li>
          </ul>
        )}
      </section>
    </aside>
  );
}
