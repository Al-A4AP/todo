import { useState } from "react";
import { useAuthStore } from "../store/authStore";

interface SignInProps {
  darkMode: boolean;
}

export default function SignIn({ darkMode }: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const signInAsync = useAuthStore((s) => s.signInAsync);
  const isLoading = useAuthStore((s) => s.isLoading);
  const serverError = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Clear error sblmny
    setValidationError("");
    clearError();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setValidationError("Email and password are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (trimmedPassword.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return;
    }
    //  Coba async login
    try {
      await signInAsync(trimmedEmail, trimmedPassword);
      setEmail("");
      setPassword("");
      console.log("Sign in successfull");
    } catch (err) {
      console.log("[v0] Sign in error:", err);
    }
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
          {validationError && (
            <p className="text-sm text-red-500 text-center">
              {validationError}
            </p>
          )}
          {serverError && (
            <p className="text-sm text-red-500 text-center">{serverError}</p>
          )}

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
              disabled={isLoading}
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
              disabled={isLoading}
              className={`w-full px-4 py-3 rounded-md text-sm outline-none transition border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500 focus:border-blue-500"
                  : "bg-gray-50 border-gray-200 text-gray-700 placeholder-gray-400 focus:border-blue-500"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-md text-sm font-semibold text-white transition ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed opacity-70"
                : "bg-blue-500 hover:bg-blue-600 active:scale-[0.98]"
            }`}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
