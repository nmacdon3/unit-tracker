"use client";

import Image from "next/image";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { Roboto } from "next/font/google";
import classnames from "classnames";

const roboto = Roboto({
  weight: "300",
  subsets: ["latin"],
});

const ProfileDropdown = () => {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button className="w-12 h-12 min-w-0 bg-transparent p-1 border border-stone-50 rounded-full flex justify-center align-items-center">
          <Image
            src="/profile.png"
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={classnames("bg-stone-800 text-lg mt-2", roboto.className)}
      >
        <div>My Account</div>
        <div>Logout</div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileDropdown;
