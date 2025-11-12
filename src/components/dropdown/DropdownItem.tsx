import { Menu } from "@headlessui/react";
import clsx from "clsx";

const DropdownItem: React.FC = ({ children }) => (
  <Menu.Item>
    {({ active }) => (
      <button
        className={clsx(
          "group flex rounded-md items-center w-full px-2 py-2 text-sm font-medium text-black",
          { "bg-black bg-opacity-20": active }
        )}
      >
        {children}
      </button>
    )}
  </Menu.Item>
);

export default DropdownItem;
