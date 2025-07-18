import { ArchiveIcon, Home, NewspaperIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "./ui/sidebar.tsx";
import { NavLink } from "react-router";
import { cn } from "@/lib/utils.ts";

interface ISidebarItem {
  title: string;
  pathname: string;
  icon: React.ReactElement<SVGElement>;
}

const items: ISidebarItem[] = [
  {
    title: "Headline",
    pathname: "/",
    icon: <Home className="size-4" />,
  },
  {
    title: "News",
    pathname: "/news",
    icon: <NewspaperIcon className="size-4" />,
  },
  {
    title: "Archive",
    pathname: "/news-archive",
    icon: <ArchiveIcon className="size-4" />,
  },
];

export default function MainSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <nav className="flex flex-col gap-2">
            {items.map((i) => (
              <NavLink
                key={i.title}
                to={{ pathname: i.pathname }}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 flex items-center gap-2",
                    isActive
                      ? "bg-black rounded-lg text-white shadow-lg shadow-gray-2500"
                      : "bg-amber-300 rounded-2xl",
                    "hover:rounded-2xl hover:bg-amber-300/65 transition-all"
                  )
                }
              >
                {i.icon}
                <header>{i.title}</header>
              </NavLink>
            ))}
          </nav>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
