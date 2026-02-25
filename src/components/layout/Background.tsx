import LightDesktop from "../../assets/Bitmap-light.jpg";
import LightMobile from "../../assets/Bitmap-light-mobile.jpg";
import DarkDesktop from "../../assets/Bitmap-dark.jpg";
import DarkMobile from "../../assets/Bitmap-dark-mobile.jpg";

interface BackgroundProps {
  darkMode: boolean;
}

export default function Background({ darkMode }: BackgroundProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-75 -z-10">
      {/* Desktop */}
      <img
        src={darkMode ? DarkDesktop : LightDesktop}
        alt="background desktop"
        className="hidden md:block w-full h-full object-cover"
      />

      {/* Mobile */}
      <img
        src={darkMode ? DarkMobile : LightMobile}
        alt="background mobile"
        className="block md:hidden w-full h-full object-cover"
      />
    </div>
  );
}
