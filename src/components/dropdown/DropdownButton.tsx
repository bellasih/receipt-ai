import { Menu } from "@headlessui/react";
import { HiOutlineChevronDown } from "react-icons/hi";
import clsx from "clsx";

const DropdownButton: React.FC = ({ children }) => (
  <Menu.Button
    className={clsx(
      "inline-flex justify-center",
      "px-4 py-2 rounded-md text-sm font-medium ",
      "bg-black bg-opacity-20 hover:bg-opacity-30",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
      "transition-colors duration-500"
    )}
  >
    {children}
    <HiOutlineChevronDown
      className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
      aria-hidden="true"
    />
  </Menu.Button>
);

export default DropdownButton;
