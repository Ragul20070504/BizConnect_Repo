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
          className="p-3 text-blue-600 hover:text-blue-800 transition-colors duration-200 focus:outline-none relative z-[10000]"
        >
          <Menu size={30} />
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
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-blue-50 to-blue-100 shadow-2xl border-r border-blue-200 z-[9999] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 bg-blue-500">
          <span className="font-semibold text-white text-lg tracking-wide">
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-white-700 transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-6 space-y-4">
          {[
            { label: "Home", href: "/" },
            { label: "GST Calendar", href: "/calender" },
            { label: "Document Translator", href: "/doc" },
            { label: "Sales Visualizer", href: "/analysis" },
            { label: "Community", href: "/dashboard" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-black text-[1.05rem] font-medium hover:bg-blue-300 hover:text-blue-900 px-4 py-2 rounded-md transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

