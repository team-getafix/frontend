"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaUser, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { RiMenuLine, RiCloseLargeLine, RiAccountCircleFill, RiHome4Line, RiBook2Line, RiSettings3Line } from "react-icons/ri";
import { isAdmin, isTokenValid, isStudent } from "@/utils/authUtils";
import { HiOutlineBookOpen } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current route
  const [menuItems, setMenuItems] = useState([]);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const baseItems = [
      { href: "/", label: "Home", icon: RiHome4Line },
      //! Hydration error: ...(isAdmin() ? [{ href: "/admin", label: "Admin", icon: RiHome4Line }] : [{ href: "/class", label: "Subjects", icon: HiOutlineBookOpen }]),
      // { href: "/class", label: "Subjects", icon: HiOutlineBookOpen },
      // { href: "/services", label: "Settings", icon: RiSettings3Line },
    ];

    if (isAdmin()) {
      baseItems.splice(1, 0, { href: "/admin", label: "Admin", icon: RiSettings3Line });
    } else if (isStudent()) {
      baseItems.splice(1, 0, { href: "/class", label: "Subjects", icon: HiOutlineBookOpen });
    }

    if (isTokenValid()) {
      baseItems.splice(3, 0, { href: "/profile", label: "Profile", icon: FaUserCircle });
    }

    setMenuItems(baseItems);
  }, [])

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
          <Link href="/">Notate</Link>
        </div>
      </div>

      <div className="scale-[200%] duration-300 mr-4">
        <Link href='/login'>
          <RiAccountCircleFill />
        </Link>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`sidebar-menu fixed top-14 left-0 h-full bg-white shadow-xl transform transition-all duration-150 ${
          isOpen ? "w-40" : "sm:w-20 w-0 sm:hover:w-40"
        } sm:top-16`}
      >
        <ul className="flex flex-col space-y-4 p-6">
          {menuItems.map(({ href, label, icon: Icon }) => (
            <li key={href} className="overflow-hidden whitespace-nowrap">
              <div>
                <Link href={href} className={`hover:scale-105 duration-200  flex items-center ${pathname === href ? "text-orange-500" : "text-gray-700"}`} onClick={() => setIsOpen(true)}>
                  <span className={`block mr-2`}>
                    <Icon className="text-2xl z-50" />
                  </span>
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
