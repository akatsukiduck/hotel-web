"use client";
import { useState, useEffect } from "react";

interface RoomsProps {
  isVisible: boolean;
  onClose: () => void;
  defaultSection?: string;
}
const rooms = [
  {
    id:1,
    name:"Wsp",
    disc:"Close room Door",
    prices:0,
  },
  {
    id:2,
    name:"Wsp",
    disc:"Close room Door",
    prices:0,
  },
  {
    id:3,
    name:"Wsp",
    disc:"Close room Door",
    prices:0,
  },
]
const Rooms = ({ isVisible, onClose, defaultSection = "Rooms" }: RoomsProps) => {
  const roomcomp = []
  const [activeSection, setActiveSection] = useState(defaultSection);
  for(let room of rooms){
    roomcomp.push(
    <div key={room.id} className="space-y-6 border-2 border-white rounded-2xl p-5">
      <h2 className="text-3xl font-bold text-white">{room.name}</h2><p className="text-zinc-300 text-lg">{room.disc}</p><p className="text-zinc-300 text-lg">{room.prices}</p>
    </div>)
  }
  useEffect(() => {
    if (isVisible) {
      setActiveSection(defaultSection);
    }
  }, [isVisible, defaultSection]);

  const menuItems = [
    { label: "Rooms", number: "I" },
    { label: "Gallery", number: "II" },
    { label: "Locate", number: "III" },
    { label: "Restaurant", number: "IV" },
    { label: "Contact", number: "V" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "Rooms": return <div className="flex gap-5 flex-col overflow-y-scroll">{roomcomp}</div>;
      case "Gallery": return <div className="space-y-6"><h2 className="text-3xl font-bold text-white">Gallery</h2><p className="text-zinc-300 text-lg">Moments captured at The Hotel Company.</p></div>;
      case "Locate":
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Our Location</h2>
      <p className="text-zinc-300 text-lg">Prime location in the heart of Algiers.</p>
      
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.4962491551178!2d3.0538157!3d36.734657899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad83763f6a93%3A0xca2bf5db863ac243!2sHotel%20Saray!5e0!3m2!1sfr!2sdz!4v1783531882624!5m2!1sfr!2sdz"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}           // ← Fixed
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
    );
      case "Restaurant": return <div className="space-y-6"><h2 className="text-3xl font-bold text-white">The Restaurant</h2><p className="text-zinc-300 text-lg">Fine dining experience awaits you.</p></div>;
      case "Contact": return <div className="space-y-6"><h2 className="text-3xl font-bold text-white">Contact Us</h2><p className="text-zinc-300 text-lg">We'd love to hear from you.</p></div>;
      default: return null;
    }
  };

  return (
    <>
      <div className={`fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl transition-all duration-500 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ pointerEvents: isVisible ? "auto" : "none" }} onClick={onClose} />

      <div className={`fixed inset-0 z-[10000] flex items-center justify-center transition-all duration-500 ease-in-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`} style={{ pointerEvents: isVisible ? "auto" : "none" }} onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16 flex flex-col md:flex-row gap-8 md:gap-16 z-10 overflow-auto">
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex flex-col gap-6 md:gap-7">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveSection(item.label)}
                  className={`flex items-center gap-5 text-white hover:text-blue-400 transition-all text-2xl md:text-3xl text-left ${activeSection === item.label ? "text-blue-400" : ""}`}
                >
                  <h1 className="text-3xl font-bold">{item.number}</h1>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 md:w-[38%] md:p-10">
            <div className="bg-black/70 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 min-h-[400px]">
              {renderContent()}
            </div>
          </div>
        </div>

        <button onClick={onClose} className="fixed top-6 right-6 md:top-8 md:right-8 text-white text-5xl md:text-6xl hover:scale-110 transition-transform z-[10001]">✕</button>
      </div>
    </>
  );
};

export default Rooms;