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
        <SidebarGroup className="flex-1">
          <nav className="flex flex-col h-full">
            <div className="flex-1 flex flex-col gap-2">
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
            </div>
            <div className="flex-none bg-amber-500 h-24 rounded-2xl flex flex-col justify-center items-start p-4">
              <p className="text-center">BACKEND URL:</p>
              <p className="text-center">{import.meta.env.VITE_BACKEND_URL}</p>
            </div>
          </nav>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
