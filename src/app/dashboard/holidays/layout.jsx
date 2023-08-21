import { Suspense } from "react";
import Loading from "./loading";
export const metadata = {
  title: "Holidays",
};
export default function Layout({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
