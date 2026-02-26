import SunIcon from "../../assets/sun.png";
import MoonIcon from "../../assets/moon.png";
import { useAuthStore } from "../../store/authStore";

interface HeaderProps {
  darkMode: boolean;
  toggleDark: () => void;
}

export default function Header({ darkMode, toggleDark }: HeaderProps) {
  const email = useAuthStore((s) => s.email);
  const signOut = useAuthStore((s) => s.signOut);
  return (
    <header className="flex flex-col gap-4 pt-12 pb-8">
      <div className="flex justify-between items-center">
        {/* Judul Todo */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-[0.4em] text-white">
          TODO
        </h1>

        {/* Tombol Light & Dark */}
        <button
          onClick={toggleDark}
          className="transition-transform duration-200 hover:scale-110 active:scale-95"
          aria-label="Toggle Theme"
        >
          <img
            src={darkMode ? SunIcon : MoonIcon}
            alt="theme icon"
            className="w-6 h-6"
          />
        </button>
      </div>
      {email && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/80 truncate max-w-[70%]">
            {email}
          </span>
          <button
            onClick={signOut}
            className="text-sm text-white/60 hover:text-white transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
}
