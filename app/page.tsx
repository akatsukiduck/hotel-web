"use client";
import Nav from "./components/Nav";
import Body from "./components/body";
import Rooms from "./components/rooms";
import Booking from "./components/booking";
import MenuOverlay from "./components/menu";
import { useState, useEffect } from "react";

const Images = [
  "https://imgs.search.brave.com/fcIGdXNLtIlHqdnI5amgKG2w__kTO2UaTzfxKlwQn3c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vaG90ZWwtZmFj/YWRlLXdpdGgtaWxs/dW1pbmF0ZWQtdGV4/dC1ob3RlbC1idWls/ZGluZy1leHRlcmlv/cl8yMzAzNjMtMzU2/OTMuanBnP3NlbXQ9/YWlzX2h5YnJpZCZ3/PTc0MCZxPTgw",
  "https://imgs.search.brave.com/O11DjwhiFDa9ul3jxc6JtKcJg_eXZYxQkQhW-MJaj7g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU3/NTI5Mzc1L3Bob3Rv/L2hvdGVsLXNpZ24t/b24tYnVpbGRpbmcu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWJtRDdVVEVWbEg4/U3JsWmlXV0I5Yk53/SjMyVlRFZ2FtTm1s/QTFLUjZOQXc9",
  "https://imgs.search.brave.com/MGhmgHSl4IIdHn5aSNU0e1HY3GExEoYz1DI4wtHRAJg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQx/ODcwMTYxOS9waG90/by9ob3RlbC1zaWdu/LW9uLWJ1aWxkaW5n/LWZhY2FkZS1pbi1j/aXR5LWJ1c2luZXNz/LXRyYXZlbC1hbmQt/dG91cmlzbS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VzlV/Y1pUWW8zZjhmVGFp/VV80eHFmVlNCT1FS/bmEtUG0tUHJ3M2s1/NGt5TT0",
];

const Page = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [roomsVisible, setRoomsVisible] = useState(false);
  const [bookingVisible, setBookingVisible] = useState(false);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [activeSection, setActiveSection] = useState("Rooms");   // ← Add this

  useEffect(() => {
    let isMounted = true;

    const processNext = () => {
      if (!isMounted) return;

      setIsSliding(true);

      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % Images.length;
        setCurrentIndex(nextIndex);
        setIsSliding(false);
      }, 600);

      setTimeout(processNext, 5000);
    };

    const initialTimer = setTimeout(() => {
      processNext();
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(initialTimer);
    };
  }, [currentIndex]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          key={`current-${currentIndex}`}
          src={Images[currentIndex]}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out ${
            isSliding ? "-translate-x-full" : "translate-x-0"
          }`}
          alt="background"
        />

        <img
          key={`next-${(currentIndex + 1) % Images.length}`}
          src={Images[(currentIndex + 1) % Images.length]}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out ${
            isSliding ? "translate-x-0" : "translate-x-full"
          }`}
          alt="background"
        />
      </div>

      <Nav 
        onMenuClick={() => setMenuVisible(true)}
        onBookingClick={() => setBookingVisible(true)}
        onSectionClick={(section) => {
          setActiveSection(section);     // ← Important
          setRoomsVisible(true);
        }}
      />

      <Body />

      <MenuOverlay isVisible={menuVisible} onClose={() => setMenuVisible(false)} />
      
      <Rooms 
        isVisible={roomsVisible} 
        onClose={() => setRoomsVisible(false)}
        defaultSection={activeSection}     // ← Use dynamic value
      />
      
      <Booking isVisible={bookingVisible} onClose={() => setBookingVisible(false)} />
    </div>
  );
};

export default Page;