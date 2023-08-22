import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Suspense } from "react";
import Loading from "../loading";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar />
        <section className="dashboardLayout">
          <Sidebar />
          <main>{children}</main>
        </section>
      </Suspense>
    </>
  );
}
