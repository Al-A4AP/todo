import { useState, useEffect } from "react";
import Background from "./components/layout/Background";
import Header from "./components/layout/Header";
import Todo from "./components/todo/Todo";
import SignIn from "./pages/SignIn";
import { useAuthStore } from "./store/authStore";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());
  const restoreSession = useAuthStore((s) => s.restoreSession);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await restoreSession();
      } catch (err) {
        console.log("[v0] Session restoration error:", err);
      } finally {
        setIsInitialized(true);
      }
    };
    initializeAuth();
  }, [restoreSession]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDark = () => {
    setDarkMode((prev) => !prev);
  };

  // Tmpl Loading state ktk init
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative">
        <Background darkMode={darkMode} />
        <div className="absolute inset-0 -z-20 bg-white dark:bg-gray-900 transition-colors duration-300" />
        <div className="relative z-10">
          <SignIn darkMode={darkMode} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Background darkMode={darkMode} />

      {/* Untuk Background Bawah */}
      <div className="absolute inset-0 -z-20 bg-white dark:bg-gray-900 transition-colors duration-300" />

      <div className="relative z-10 flex justify-center">
        <div className="w-full max-w-xl px-6">
          <Header darkMode={darkMode} toggleDark={toggleDark} />
          <Todo />
        </div>
      </div>
    </div>
  );
}

export default App;
