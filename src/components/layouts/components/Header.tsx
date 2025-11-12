import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { NavBarItem } from "./NavBarItem";
import { MobileNavBar } from "./MobileNavBar";
import { useAuth } from "@/lib/auth";
import { MdOutlineArrowBack, MdKeyboardArrowDown } from "react-icons/md";
import Router from "next/router";
import Skeleton from "react-loading-skeleton";
// import { useAuth } from 'lib/auth';
import { DropdownMenu } from "./DropdownMenu";

interface HeaderProps {
  inverted?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ inverted: _inverted }) => {
  const [scrolled, setScrolled] = useState(false);
  const [inverted, setInverted] = useState(
    _inverted !== undefined ? _inverted : false
  );
  const { user, loading } = useAuth();

  const MENU1 = [
    { title: "Jobs", path: "/jobs" },
    { title: "Recruiters", path: "/recruiters" },
  ];

  const MENU2 = [
    { title: "Jobseekers", path: "/jobseekers" },
    { title: "Recruiters", path: "/recruiters" },
  ];

  if (!loading && !user) {
    MENU2.push({ title: "Sign In", path: "/signin" });
    MENU2.push({ title: "Sign Up", path: "/signup" });
  }

  const { pathname } = useRouter();
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const closeNavbarHandler = () => {
    setIsNavBarOpen(false);
  };

  const handleScroll = () => {
    const isMovedFromTop = Boolean(window.scrollY);
    setScrolled(isMovedFromTop);
    if (_inverted) {
      setInverted(!isMovedFromTop);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const renderMenu = () => (
    <>
      <div className="flex flex-col lg:flex-row items-center gap-8 tracking-wider">
        {MENU1.map((item) => (
          <span key={item.path}>
            <NavBarItem
              opened={pathname === item.path}
              inverted={inverted && !isNavBarOpen}
            >
              <Link href={item.path}>{item.title}</Link>
            </NavBarItem>
          </span>
        ))}
      </div>

      {/* {MENU.map((item) => (
        <span key={item.path}>
          <NavBarItem
            opened={item.path === '/' ? pathname === item.path : pathname.includes(item.path)}
            inverted={inverted && !isNavBarOpen}
          >
            <Link href={item.path}>{item.title}</Link>
          </NavBarItem>
        </span>
      ))} */}
      <span>
        <NavBarItem inverted={inverted && !isNavBarOpen} className="dropdown">
          {loading ? (
            <Skeleton width={75} />
          ) : user ? (
            // <span className="flex items-center justify-end">
            //   {`Hi, ${user.firstName}`} <MdKeyboardArrowDown />
            // </span>
            <span className="flex items-center justify-end">
              {
                <div
                  className="hidden lg:flex h-10 w-10 relative bg-center bg-no-repeat bg-contain rounded-full mr-2"
                  style={{
                    backgroundImage: `url(${user.profilePicture})`,
                  }}
                />
              }{" "}
              <MdKeyboardArrowDown />
            </span>
          ) : (
            <Link href="/signin">Sign in</Link>
          )}
          <div className="flex justify-end top-20">
            {!!user && <DropdownMenu />}
          </div>
        </NavBarItem>
      </span>
    </>
  );

  return (
    <header
      className={`${scrolled ? "fixed" : "relative"} top-0 w-full z-100`}
      style={{ height: "8.5vh" }}
    >
      <div
        className={`h-full transition duration-300 ease-linear ${
          scrolled ? "shadow-md bg-white" : "bg-white"
        }`}
      >
        <div className="flex container h-full m-auto">
          <div className="flex items-center justify-between container px-8 lg:px-0">
            <Link href="/" passHref>
              <span className="items-center justify-center hidden lg:flex">
                {inverted ? (
                  <Image
                    src="/SRE_logo_white.png"
                    width="85"
                    height="45"
                    className="hover:cursor-pointer"
                    alt="SRE_logo_white"
                  />
                ) : (
                  <Image
                    src="/SRE_logo_black.png"
                    width="85"
                    height="45"
                    className="hover:cursor-pointer"
                    alt="SRE_logo_black"
                  />
                )}
              </span>
            </Link>
            <span
              className="items-center justify-center lg:hidden flex"
              onClick={Router.back}
            >
              <MdOutlineArrowBack className="w-5 h-5 text-gray-600" />
            </span>
            {/* <div className="hidden lg:flex items-center gap-8">{renderMenu()}</div> */}
            <div className="hidden lg:w-11/12 lg:flex items-center justify-between">
              {renderMenu()}
            </div>
            <div className="flex lg:hidden mt-1 items-center rounded-md bg-gray-100 w-full mx-4">
              <AiOutlineSearch className="text-green-light w-6 h-6 ml-2" />
              <input
                type="text"
                placeholder="Search for title, job, or location"
                className="border-none bg-gray-100 focus:border-green-light focus:ring focus:ring-green-light focus:ring-opacity-0 text-xs"
              />
            </div>
            <div
              className="flex lg:hidden pt-1 cursor-pointer"
              onClick={() => setIsNavBarOpen(true)}
            >
              <FaBars className={`w-5 h-5 ${inverted && "text-white"}`} />
            </div>
          </div>
          <MobileNavBar
            isOpen={isNavBarOpen}
            injectedCloseNavBarFn={closeNavbarHandler}
          >
            {renderMenu()}
          </MobileNavBar>
        </div>
      </div>
    </header>
  );
};
