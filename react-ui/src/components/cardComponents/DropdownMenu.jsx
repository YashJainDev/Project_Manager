import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function DropdownMenu({ button, children }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const toggleMenu = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    setOpen(!open);
  };

  useEffect(() => {
    const close = (e) => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <>
      <div onClick={(e) => { e.stopPropagation(); toggleMenu(e); }}>
        {button}
      </div>

      {open &&
        createPortal(
          <div
            className="absolute z-[9999] bg-base-100 shadow-lg rounded-lg p-2 w-auto border border-secondary"
            style={{ top: position.top, left: position.left }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>,
          document.body
        )
      }
    </>
  );
}
