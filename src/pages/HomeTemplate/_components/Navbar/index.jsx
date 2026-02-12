import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
  isActive
    ? "text-indigo-600 font-semibold"
    : "text-gray-700 hover:text-indigo-600";

  return (
    <>
      {/* Navbar */}
     <nav className="fixed w-full z-30 top-0 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.jpg" className="h-7" alt="Hotel TD Logo" />
            <span className="text-xl font-semibold text-heading">Hotel TD</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
            <NavLink to="/list-room" className={navClass}>
              List Room
            </NavLink>
            <NavLink to="/booked-room" className={navClass}>
              Booked Room
            </NavLink>
          </div>

          {/* Right (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <button className="relative text-heading hover:text-fg-brand">
              🔔
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>

            <NavLink
              to="/account"
              className="flex items-center gap-2 text-heading hover:text-fg-brand"
            >
              <div className="w-8 h-8 rounded-full bg-neutral-tertiary flex items-center justify-center">
                👤
              </div>
              <span>Account</span>
            </NavLink>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-heading text-2xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-20 transition-opacity
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Mobile Sidebar (slide from left) */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-neutral-primary z-30
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-default">
          <span className="text-lg font-semibold text-heading">Menu</span>
          <button onClick={() => setOpen(false)} className="text-2xl">
            ✕
          </button>
        </div>

        {/* Menu items */}
        <ul className="p-4 flex flex-col gap-4">
          <NavLink
            to="/"
            end
            onClick={() => setOpen(false)}
            className={navClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/list-room"
            onClick={() => setOpen(false)}
            className={navClass}
          >
            List Room
          </NavLink>

          <NavLink
            to="/booked-room"
            onClick={() => setOpen(false)}
            className={navClass}
          >
            Booked Room
          </NavLink>

          <hr className="border-default my-2" />

          <button className="flex items-center gap-2 text-heading">
            🔔 Thông báo
            <span className="bg-red-500 text-white text-xs rounded-full px-2">
              3
            </span>
          </button>

          <NavLink
            to="/account"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-heading"
          >
            👤 Account
          </NavLink>
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
