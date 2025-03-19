import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-blue-600 dark:bg-gray-800 shadow-md">
        <h1 className="text-white text-2xl font-bold tracking-wide">TechSphere</h1>
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:scale-110 transition-all"
        >
          {isDark ? <FaSun className="text-yellow-500" size={20} /> : <FaMoon className="text-gray-900" size={20} />}
        </button>
      </nav>

      {/* Welcome Section */}
      <section className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-3xl font-semibold">Hello 🙌</h2>
        <h3 className="text-xl mt-2 font-medium">Welcome to TechSphere</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Explore the world of innovation! 🚀</p>
      </section>
    </div>
  );
};

export default Header;
