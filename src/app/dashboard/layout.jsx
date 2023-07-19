import NavbarFC from "../../components/Shared/NavbarFC";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <section>
      <NavbarFC />
      {children}
    </section>
  );
}
