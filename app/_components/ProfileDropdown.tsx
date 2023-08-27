"use client";

import Image from "next/image";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

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
      <PopoverContent className="bg-stone-700 text-2xl mt-2">
        <div>My Account</div>
        <div>Logout</div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileDropdown;
