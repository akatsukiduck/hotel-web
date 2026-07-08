"use client";
import Link from "next/link";

interface NavProps {
  onMenuClick: () => void;
  onBookingClick: () => void;
  onSectionClick: (section: string) => void;
}

const Nav = ({ onMenuClick, onBookingClick, onSectionClick }: NavProps) => {
  return (
    <div className="flex w-full flex-col fixed backdrop-blur-md top-0 z-50 left-0 ">
      <div className="flex px-4 sm:px-6 justify-between items-center border-b border-gray-500 h-16">
        <button 
          onClick={onMenuClick} 
          className="flex h-12 items-center gap-2 text-white hover:scale-105 active:scale-95 transition-all"
        >
          <img width="32" height="32" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/menu--v3.png" alt="menu" />
          <span className="font-medium hidden sm:inline">Menu</span>
        </button>

        <Link href="/" className="flex items-center gap-1.5 text-white">
          <div className="flex max-sm:flex-col sm:gap-5 items-center">
            <p className="text-xs tracking-widest">2009</p>
            <h1 className="text-lg sm:text-xl font-bold whitespace-nowrap">The Hotel Company</h1>
            <div className="flex gap-0.5 sm:gap-1">
              {[...Array(4)].map((_, i) => (
                <img 
                  key={i}
                  width="16" 
                  height="16" 
                  className="sm:w-5 sm:h-5"
                  src="https://img.icons8.com/windows/32/FFFFFF/star--v1.png" 
                  alt="star" 
                />
              ))}
            </div>
          </div>
        </Link>

        <button 
          onClick={onBookingClick}
          className="flex h-12 items-center gap-2 text-white hover:scale-105 active:scale-95 transition-all"
        >
          <img width="32" height="32" src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/booking.png" alt="booking" />
          <span className="hidden sm:inline font-medium">Booking</span>
        </button>
      </div>

      <div className="border-b border-gray-500 overflow-x-auto">
        <div className="flex items-center justify-start md:justify-center gap-6 md:gap-10 px-4 sm:px-6 py-3 whitespace-nowrap min-w-max">
          <button onClick={() => onSectionClick("Rooms")} className="border-b-2 border-transparent hover:border-white pb-1 text-sm md:text-base font-medium text-white active:scale-95 transition-all">Rooms</button>
          <button onClick={() => onSectionClick("Gallery")} className="border-b-2 border-transparent hover:border-white pb-1 text-sm md:text-base font-medium text-white active:scale-95 transition-all">Gallery</button>
          <button onClick={() => onSectionClick("Locate")} className="border-b-2 border-transparent hover:border-white pb-1 text-sm md:text-base font-medium text-white active:scale-95 transition-all">Locate</button>
          <button onClick={() => onSectionClick("Restaurant")} className="border-b-2 border-transparent hover:border-white pb-1 text-sm md:text-base font-medium text-white active:scale-95 transition-all">Restaurant</button>
          <button onClick={() => onSectionClick("Contact")} className="border-b-2 border-transparent hover:border-white pb-1 text-sm md:text-base font-medium text-white active:scale-95 transition-all">Contact</button>
        </div>
      </div>
    </div>
  );
};

export default Nav;