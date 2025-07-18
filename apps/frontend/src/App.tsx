import { Outlet } from "react-router";
import MainLayout from "./components/main-layout";

export default function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
