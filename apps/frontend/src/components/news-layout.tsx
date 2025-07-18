import { Outlet } from "react-router";

export default function NewsLayout() {
  return (
    <section className="pt-4 px-4 flex flex-col">
      <Outlet />
    </section>
  );
}
