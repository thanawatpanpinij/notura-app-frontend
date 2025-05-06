import React from "react";
import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4">
      <p className="text-blue-600 text-2xl font-bold">📒 Notes App</p>
      <nav className="flex gap-4">
        {[
          { label: "Home", path: "/" },
          { label: "Login", path: "login" },
          { label: "Signup", path: "signup" },
        ].map(({ label, path }) => (
          <NavLink key={label} to={path} className={({ isActive }) => (isActive ? "text-blue-600" : "")}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
