import { Suspense } from "react";
import Loading from "./loading";
export const metadata = {
  title: "Attendance",
};
export default function Layout({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
