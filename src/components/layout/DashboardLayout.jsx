import { Outlet } from "react-router";
import Aside from "../common/Aside";

export default function DashboardLayout() {
  return (
    <main className="flex">
      <Aside />
      <Outlet />
    </main>
  );
}
