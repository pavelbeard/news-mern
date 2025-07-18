import { Outlet } from "react-router";

export default function NewsLayout() {
  return (
    <section className="p-4 flex flex-col">
      <Outlet />
    </section>
  );
}
