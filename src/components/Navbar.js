"use client";
import { useState } from "react";
import Link from "next/link";
import { RiMenuLine, RiCloseLargeLine, RiAccountCircleFill, RiHome4Line, RiBook2Line, RiSettings3Line } from "react-icons/ri";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

return (
    <nav className="fixed top-0 left-0 w-full h-14 bg-white flex items-center justify-between px-4 z-50">
            <div className="fixed top-0 left-0 w-full h-14 shadow-xl flex items-center justify-between px-4 z-50">
                    <div className="flex items-center">
                            <button
                                    onClick={toggleMenu}
                                    className="text-2xl"
                                    aria-label="Toggle Menu"
                            >
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
            </div>

            {/* Sidebar Menu */}
            <div
                    className={`fixed top-14 left-0 h-full bg-white shadow-xl transform transition-all duration-150 ${
                            isOpen ? "w-40" : "sm:w-16 w-0 hover:w-40"
                    }`}
            >
                    <ul className="flex flex-col space-y-4 p-4">
                            {[
                                    { href: "/", label: "Home", icon: <RiHome4Line className="text-2xl z-50" /> },
                                    { href: "/about", label: "Subjects", icon: <RiBook2Line className="text-2xl z-50" /> },
                                    { href: "/services", label: "Settings", icon: <RiSettings3Line className="text-2xl z-50" /> },
                            ].map(({ href, label, icon }) => (
                                    <li key={href} className="overflow-hidden whitespace-nowrap">
                                            <Link
                                                    href={href}
                                                    className="hover:text-orange-500 flex items-center"
                                                    onClick={() => setIsOpen(true)} // Close menu on click
                                            >
                                                    <span className="block mr-2">
                                                            {icon}
                                                    </span>
                                                    <span className={`block bg-transparent overflow-hidden`}>
                                                            {label}
                                                    </span>
                                            </Link>
                                    </li>
                            ))}
                    </ul>
            </div>
    </nav>
);
}
