import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Suspense } from "react";
import Loading from "../loading";
export const metadata = {
  title: "Mitral Hr",
};
export default function DashboardLayout({ children }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar />
        <section className="dashboardLayout">
          <div>
            <Sidebar />
          </div>
          <main>{children}</main>
        </section>
      </Suspense>
    </>
  );
}
