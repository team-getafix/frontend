"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { RiMenuLine, RiCloseLargeLine, RiAccountCircleFill, RiHome4Line, RiBook2Line, RiSettings3Line } from "react-icons/ri";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar-menu")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="fixed border top-0 left-0 w-full h-14 bg-white flex items-center justify-between px-4 z-50 sm:h-16 sm:px-6">
      <div className="flex items-center">
        <button onClick={toggleMenu} className="text-2xl" aria-label="Toggle Menu">
          {isOpen ? <RiCloseLargeLine /> : <RiMenuLine />}
        </button>
        <div className="text-2xl font-bold hover:underline ml-4">
          <Link href="/">Getafix</Link>
        </div>
      </div>

      <div className="scale-[200%] duration-300 mr-4">
        <Link href="/login">
          <RiAccountCircleFill />
        </Link>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`sidebar-menu fixed top-14 left-0 h-full bg-white shadow-xl transform transition-all duration-150 ${
          isOpen ? "w-40" : "sm:w-16 w-0 sm:hover:w-40"
        } sm:top-16`}
      >
        <ul className="flex flex-col space-y-4 p-4">
          {[
            { href: "/", label: "Home", icon: <RiHome4Line className="text-2xl z-50" /> },
            { href: "/class", label: "Subjects", icon: <RiBook2Line className="text-2xl z-50" /> },
            { href: "/services", label: "Settings", icon: <RiSettings3Line className="text-2xl z-50" /> },
          ].map(({ href, label, icon }) => (
            <li key={href} className="overflow-hidden whitespace-nowrap">
              <div>
                <Link href={href} className="hover:text-orange-500 flex items-center" onClick={() => setIsOpen(true)}>
                  <span className="block mr-2">{icon}</span>
                  <span className={`block bg-transparent overflow-hidden`}>{label}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
