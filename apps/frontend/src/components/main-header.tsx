import HeabycreamDiario from "@/assets/heavycream-diario-2.webp";
import { SidebarTrigger } from "./ui/sidebar";
import { Link } from "react-router";

export default function MainHeader() {
  return (
    <header className="flex-none flex items-start w-full bg-[#FEFCF8]">
      <SidebarTrigger className="flex-none" />
      <div className="flex-1 flex justify-center">
        <Link to="/">
          <img
            src={HeabycreamDiario}
            alt="main-pics"
            width={256}
            className="h-24 object-cover"
          />
        </Link>
      </div>
    </header>
  );
}
