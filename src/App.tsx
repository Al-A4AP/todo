import { useState, useEffect } from "react";
import Background from "./components/layout/Background";
import Header from "./components/layout/Header";
import Todo from "./components/todo/Todo";
import SignIn from "./auth/SignIn";
import { useAuthStore } from "./store/authStore";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

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
