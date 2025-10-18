import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Hamburger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 focus:outline-none relative z-[10000]"
        >
          <Menu size={28} />
        </button>
      )}

      {/* Dim Background Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-[9998]"
        />
      )}

      {/* Slide-in Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-50 to-blue-100 shadow-xl border-r border-blue-200 z-[9999] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-blue-200 flex justify-between items-center">
          <span className="font-semibold text-blue-800 text-lg tracking-wide">
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-blue-600 hover:text-blue-800 transition-colors p-1"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-4 space-y-3">
          {[
            { label: "Home", href: "/" },
            { label: "Community", href: "/dashboard" },
            { label: "GST Calendar", href: "/calender" },
            { label: "Document Translator", href: "/doc" },
            { label: "Sales Visualizer", href: "/analysis" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-blue-800 hover:bg-blue-200 hover:text-blue-900 px-3 py-2 rounded-md transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

