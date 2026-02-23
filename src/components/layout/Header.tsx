import SunIcon from "../../assets/sun.png";
import MoonIcon from "../../assets/moon.png";

interface HeaderProps {
  darkMode: boolean;
  toggleDark: () => void;
}

export default function Header({ darkMode, toggleDark }: HeaderProps) {
  return (
    <header className="flex justify-between items-center pt-12 pb-8">
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
    </header>
  );
}
