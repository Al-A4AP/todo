import { useState, useEffect } from "react";
import Background from "./components/layout/Background";
import Header from "./components/layout/Header";
import Todo from "./components/todo/Todo";

function App() {
  const [darkMode, setDarkMode] = useState(false);

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
