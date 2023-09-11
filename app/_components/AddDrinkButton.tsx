"use client";
import { HiPlus } from "react-icons/hi";
import { Button, useDisclosure } from "@nextui-org/react";

import AddDrinkModal from "./AddDrinkModal";

const AddDrinkButton = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        className="bg-teal-600 text-white md:px-8 md:py-2 min-h-0 min-w-0  md:rounded-lg font-bold text-3xl md:relative fixed bottom-4 right-4 rounded-full h-14 w-14 md:h-auto md:w-auto"
      >
        <HiPlus className="h-12 w-12" />{" "}
        <span className="md:relative md:visible absolute invisible">
          Add Drink!
        </span>
      </Button>
      <AddDrinkModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddDrinkButton;
