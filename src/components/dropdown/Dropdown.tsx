import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import DropdownButton from "./DropdownButton";
import clsx from "clsx";

interface DropdownProps {
  name: string;
  direction?: "left" | "right";
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  direction = "left",
  name,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <DropdownButton>{name}</DropdownButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            "absolute w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            { "right-0": direction === "left" },
            { "left-0": direction === "right" }
          )}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
