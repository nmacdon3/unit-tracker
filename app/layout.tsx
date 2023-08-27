import "./globals.css";
import type { Metadata } from "next";
import classnames from "classnames";

import { Caveat } from "next/font/google";
import { Providers } from "./providers";

const caveat = Caveat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unit Tracker",
  description: "Track your alcohol consumption",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-stone-950 text-stone-50 dark" lang="en">
      <body
        // style={{ overscrollBehavior: "none" }}
        className={classnames(caveat.className, "text-3xl")}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
