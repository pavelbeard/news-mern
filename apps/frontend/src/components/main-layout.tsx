import MainHeader from "./main-header.tsx";
import MainSidebar from "./main-sidebar.tsx";
import { SidebarProvider } from "./ui/sidebar.tsx";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <div className="h-screen flex flex-col items-center w-full">
        <MainHeader />
        <main className="overflow-y-auto flex-1 w-full">{children}</main>
      </div>
    </SidebarProvider>
  );
}
