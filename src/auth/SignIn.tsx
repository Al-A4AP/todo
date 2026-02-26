import { useState } from "react";
import { useAuthStore } from "../store/authStore";

interface SignInProps {
  darkMode: boolean;
}

export default function SignIn({ darkMode }: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const signIn = useAuthStore((s) => s.signIn);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Email and password are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    signIn(trimmedEmail);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl md:text-4xl font-bold tracking-[0.4em] text-white text-center mb-10">
          TODO
        </h1>

        <form
          onSubmit={handleSubmit}
          className={`rounded-lg shadow-xl p-8 space-y-5 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-xl font-semibold text-center ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Sign In
          </h2>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <div className="space-y-1">
            <label
              htmlFor="email"
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className={`w-full px-4 py-3 rounded-md text-sm outline-none transition border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500 focus:border-blue-500"
                  : "bg-gray-50 border-gray-200 text-gray-700 placeholder-gray-400 focus:border-blue-500"
              }`}
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              autoComplete="current-password"
              className={`w-full px-4 py-3 rounded-md text-sm outline-none transition border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500 focus:border-blue-500"
                  : "bg-gray-50 border-gray-200 text-gray-700 placeholder-gray-400 focus:border-blue-500"
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 active:scale-[0.98] transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
