"use client";
import { TbBeerFilled } from "react-icons/tb";
import { Button, useDisclosure } from "@nextui-org/react";

import AddDrinkModal from "./AddDrinkModal";

const AddDrinkButton = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        className="bg-teal-600 text-white px-8 py-2 max-h-auto h-auto rounded-lg font-bold text-3xl"
      >
        <TbBeerFilled /> Add Drink!
      </Button>
      <AddDrinkModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddDrinkButton;
