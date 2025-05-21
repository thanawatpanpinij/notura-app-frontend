import { Link } from "react-router";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 border-b border-light-gray">
      <Link to="/">
        <p className="text-black text-2xl font-bold">Notura</p>
      </Link>
      <nav className="flex gap-4 items-center">
        {[
          { label: "Login", path: "login" },
          { label: "Sign up", path: "signup" },
        ].map(({ label, path }) => (
          <Link
            key={label}
            to={path}
            className="last:px-4 last:py-3 last:text-white last:bg-black last:rounded-xl"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
