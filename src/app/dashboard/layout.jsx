import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
export const metadata = {
  title: "Dashboard",
};
export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <section className="dashboardLayout">
        <div>
          <Sidebar />
        </div>
        <main>{children}</main>
      </section>
    </>
  );
}
