import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSignup() {}

  useEffect(() => {
    document.title = "Notes App | Signup";
  }, []);

  return (
    <main className="grid place-items-center min-h-[calc(100dvh-64px)] bg-gray-100">
      <form action={handleSignup} className="flex flex-col gap-4 max-w-[426.5px] p-8 bg-white rounded-2xl">
        <h1 className="mb-4 text-center text-2xl font-bold">Login to Your Account</h1>
        <label>
          Full Name
          <input type="text" placeholder="Your name" name="name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full mt-2 px-4 py-3 bg-gray-100 rounded-full" />
        </label>
        <label>
          Email Address
          <input type="email" placeholder="Your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-2 px-4 py-3 bg-gray-100 rounded-full" />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 px-4 py-3 bg-gray-100 rounded-full"
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            placeholder="Confirm password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-2 px-4 py-3 bg-gray-100 rounded-full"
          />
        </label>
        <div>
          <button type="submit" className="cursor-pointer w-full my-4 px-4 py-3 text-white bg-blue-600 rounded-full transition-colors duration-200 hover:bg-blue-400">
            Login
          </button>
          <p className="text-gray-500 text-center text-[0.875rem]">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
