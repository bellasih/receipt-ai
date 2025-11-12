import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

interface MobileNavBarProps {
  isOpen: boolean;
  injectedCloseNavBarFn: () => void;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({
  children,
  isOpen,
  injectedCloseNavBarFn,
}) => {
  const mobileNavBarRef = useRef<HTMLDivElement>();

  const handleClickOutside = (e: MouseEvent) => {
    if (
      !mobileNavBarRef.current ||
      !mobileNavBarRef.current.contains(e.target as Node)
    ) {
      injectedCloseNavBarFn();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div
      className="bg-white fixed top-0 bottom-0 z-1000 shadow-lg px-8 lg:hidden transition-all duration-700 ease-in-out"
      style={
        isOpen ? { width: "80vw", right: 0 } : { width: 0, right: "-100px" }
      }
      //   ref={mobileNavBarRef}
    >
      <div
        className="w-full h-full flex items-center justify-end"
        onClick={injectedCloseNavBarFn}
        style={{ height: "8.5vh" }}
      >
        <FaTimes className="w-5 h-5" />
      </div>
      <div className="text-right">
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
};
