"use client";
import "./globals.scss";
import { Open_Sans } from "next/font/google";
import { Providers } from "../redux/Providers";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Loading from "./loading";
const open_Sans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body className={open_Sans.className}>
        <Toaster position="top right" />
        <Suspense fallback={<Loading />}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
