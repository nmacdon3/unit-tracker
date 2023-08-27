"use client";

import { TbBeerFilled } from "react-icons/tb";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const AddDrinkButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/add")}
      className="bg-teal-600 text-white px-8 py-2 max-h-auto h-auto rounded-lg font-bold text-3xl"
    >
      <TbBeerFilled /> Add Drink!
    </Button>
  );
};

export default AddDrinkButton;
