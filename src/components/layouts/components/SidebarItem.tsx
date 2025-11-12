import { Link } from "@/components";
import clsx from "clsx";

export interface SidebarRoute {
  id: string;
  name: string;
  path: string;
  icon?: JSX.Element;
}

type SidebarItemProps = {
  route: SidebarRoute;
  opened: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  children,
  route,
  opened,
}) => (
  <Link
    className={clsx(
      "inline-flex w-full items-center gap-2",
      "px-4 py-2 mt-2 rounded-lg",
      "text-sm font-semibold",
      "hover:bg-black hover:bg-opacity-10",
      "focus:outline-none",
      "transition-colors duration-200",
      { "bg-black bg-opacity-20": opened }
    )}
    href={route.path}
  >
    {route.icon}
    {children}
  </Link>
);

export default SidebarItem;
