import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../features/auth.api.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);

    if (!email || !password) return setIsError(true);

    try {
      await login({ email: email.toLowerCase(), password });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    document.title = "Notura | Login";
  }, []);

  return (
    <section className="grid place-items-center min-h-[calc(100dvh-81px)]">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 max-w-[426.5px] p-8 rounded-2xl"
      >
        <h1 className="mb-4 text-center text-2xl font-bold">
          Login to Your Account
        </h1>
        <label>
          Email Address
          <input
            type="email"
            placeholder="Your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 px-4 py-3 bg-gray-100 rounded-full"
          />
          {isError && !email && (
            <p className="text-red-400">Please enter your email</p>
          )}
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
          {isError && !password && (
            <p className="text-red-400">Please enter your password</p>
          )}
        </label>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full my-4 px-4 py-3 text-white rounded-full transition-colors duration-200 hover:bg-blue-400 ${
              isLoading
                ? "cursor-not-allowed bg-gray-400"
                : "cursor-pointer bg-blue-600"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <p className="text-gray-500 text-center text-[0.875rem]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
