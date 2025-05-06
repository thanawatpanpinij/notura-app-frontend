import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../features/auth.api.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    document.title = "Notes App | Login";
  }, []);

  return (
    <main className="grid place-items-center min-h-[calc(100dvh-64px)] bg-gray-100">
      <form action={handleLogin} className="flex flex-col gap-4 max-w-[426.5px] p-8 bg-white rounded-2xl">
        <h1 className="mb-4 text-center text-2xl font-bold">Login to Your Account</h1>
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
        <div>
          <button type="submit" className="cursor-pointer w-full my-4 px-4 py-3 text-white bg-blue-600 rounded-full transition-colors duration-200 hover:bg-blue-400">
            Login
          </button>
          <p className="text-gray-500 text-center text-[0.875rem]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
