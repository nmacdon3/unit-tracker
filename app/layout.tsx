import "./globals.css";
import type { Metadata } from "next";
import classnames from "classnames";

import { Caveat } from "next/font/google";

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
    <html lang="en">
      <body
        className={classnames(
          caveat.className,
          "bg-stone-950 text-stone-50 text-3xl p-20"
        )}
      >
        {children}
      </body>
    </html>
  );
}
