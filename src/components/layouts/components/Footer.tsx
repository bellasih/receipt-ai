import React from "react";
import Image from "next/image";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

interface SocialMediaButtonProps {
  href: string;
}

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({
  children,
  href,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="bg-indigo-800 rounded-full p-2 crusor-pointer hover:bg-opacity-80"
  >
    {children}
  </a>
);

export const Footer: React.FC = () => (
  <footer className="flex flex-col items-start justify-center bg-grey-dark text-white py-8">
    <div className="container px-8 lg:px-0 mx-auto flex flex-col items-center lg:items-start justify-center gap-6">
      <div className="w-full lg:w-1/3 text-center lg:text-left">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="flex items-center justify-center gap-6">
      </div>
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-end lg:justify-between gap-8 text-white font-semibold text-md w-full">
        <div className="flex flex-col items-end">
        </div>
        <div className="flex items-center gap-4">
        </div>
      </div>
    </div>
  </footer>
);
