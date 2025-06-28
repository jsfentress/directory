import { useState, useRef, useEffect } from 'preact/hooks';

export default function NavDrawer() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  // Focus first link when open
  useEffect(() => {
    if (open && menuRef.current) {
      const first = menuRef.current.querySelector('a, button');
      first && first.focus();
    }
  }, [open]);

  return (
    <div class="relative">
      <button
        ref={buttonRef}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="nav-dropdown"
        class="p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white border border-gray-200 shadow-sm"
        onClick={() => setOpen(o => !o)}
        style={{ zIndex: 60 }}
      >
        <span class="sr-only">Menu</span>
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="text-indigo-700">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {open && (
        <div
          id="nav-dropdown"
          ref={menuRef}
          class="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl ring-1 ring-black/10 py-2 px-2 flex flex-col animate-fadeIn z-50"
          role="menu"
          aria-label="Main menu"
        >
          <a
            href="/"
            class="block px-3 py-2 text-lg font-semibold text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:bg-indigo-100 rounded-lg transition"
            tabIndex={0}
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            Home
          </a>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.18s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
} 