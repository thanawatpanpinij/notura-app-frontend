import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { createAccount } from "../features/auth.api";
import validator from "validator";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup() {
    setIsError(false);
    let errorMessage = {};
    if (!fullName) {
      errorMessage.fullName = "Please enter your name.";
    }
    if (!email) {
      errorMessage.email = "Please enter your email";
    }
    if (!password) {
      errorMessage.password = "Please enter your password";
    }
    if (password && !validator.isStrongPassword(password)) {
      errorMessage.password = "Your password is too weak.";
    }
    if (!confirmPassword) {
      errorMessage.confirmPassword = "Please confirm your password";
    }
    if (password !== confirmPassword) {
      errorMessage.password = "Your password don't match";
      errorMessage.confirmPassword = "Your password don't match";
    }
    if (errorMessage) {
      setErrorMessage(errorMessage);
      setIsError(true);
    }
    if (isError) return;

    try {
      setIsLoading(true);
      const response = await createAccount({
        fullName,
        email,
        password,
      });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    document.title = "Notura | Sign up";
  }, []);

  return (
    <main className="grid place-items-center min-h-[calc(100dvh-81px)]">
      <form
        action={handleSignup}
        className="flex flex-col gap-4 max-w-[426.5px] p-8 bg-white rounded-2xl"
      >
        <h1 className="mb-4 text-center text-2xl font-bold">
          Create Your Account
        </h1>
        <label>
          Full Name
          <input
            type="text"
            placeholder="Your name"
            name="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mt-2 px-4 py-3 bg-gray-100 rounded-full"
          />
          {isError && !fullName && (
            <p className="text-red-400">{errorMessage.fullName}</p>
          )}
        </label>
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
            <p className="text-red-400">{errorMessage.email}</p>
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
          {isError &&
            (!validator.isStrongPassword(password) ||
              password !== confirmPassword ||
              !password) && (
              <p className="text-red-400">{errorMessage.password}</p>
            )}
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
          {isError &&
            (!validator.isStrongPassword(password) ||
              password !== confirmPassword ||
              !confirmPassword) && (
              <p className="text-red-400">{errorMessage.confirmPassword}</p>
            )}
        </label>
        <div>
          <button
            type="submit"
            className="cursor-pointer w-full my-4 px-4 py-3 text-white bg-blue-600 rounded-full transition-colors duration-200 hover:bg-blue-400"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
          <p className="text-gray-500 text-center text-[0.875rem]">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
