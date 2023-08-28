import "./globals.css";
import type { Metadata } from "next";
import classnames from "classnames";
import { Caveat } from "next/font/google";
import { ReactNode } from "react";

import { Providers } from "./providers";
import ProfileDropdown from "./_components/ProfileDropdown";
import WelcomeBack from "./_components/WelcomeBack";

const caveat = Caveat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unit Tracker",
  description: "Track your alcohol consumption",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="bg-stone-950 text-stone-50 dark" lang="en">
      <body
        className={classnames(caveat.className, "text-3xl overflow-x-hidden")}
      >
        <Providers>
          <header className="flex justify-between  py-4 px-4 sticky top-0 left-0">
            <div></div>
            <div className="flex items-center gap-6">
              <WelcomeBack />
              <ProfileDropdown />
            </div>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
