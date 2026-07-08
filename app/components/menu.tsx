"use client";

interface MenuProps {
  isVisible: boolean;
  onClose: () => void;
}

const MenuOverlay = ({ isVisible, onClose }: MenuProps) => {
  return (
    <>
      <div
        className={`
          fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl
          transition-opacity duration-500 ease-in-out
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
        onClick={onClose}
      />

      <div
        className={`
          fixed inset-0 z-[10000] flex items-center justify-center
          transition-all duration-500 ease-in-out
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center text-white">
          <h1 className="text-7xl font-light mb-8">Main Menu</h1>
          <p className="text-2xl text-white/70">Welcome to the full menu</p>
        </div>

        <button
          onClick={onClose}
          className="fixed top-8 right-8 text-white text-6xl hover:scale-110 transition-transform z-[10001]"
        >
          ✕
        </button>
      </div>
    </>
  );
};

export default MenuOverlay;