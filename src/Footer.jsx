import React from "react";
import { FaHeart, FaCode, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-6 text-center flex flex-col items-center gap-3">
      <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
      <p className="flex items-center gap-2 text-sm">
        Built with <FaHeart className="text-red-500" /> and passion. Stay creative & keep building!
      </p>
      {/* Social Icons */}
      <div className="flex gap-4 mt-2">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
          <FaGithub />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
          <FaLinkedin />
        </a>
        <a href="https://your-portfolio.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
          <FaCode />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
