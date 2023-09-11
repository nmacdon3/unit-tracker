"use client";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BsDot, BsThreeDots, BsTrash3Fill } from "react-icons/bs";
import { HiChevronRight } from "react-icons/hi";

import { Drink, DrinkType } from "../page";

import Timestamp from "./Timestamp";
import EditDrinkModal from "./EditDrinkModal";
import { CAN_ICON, GLASS_ICON, PINT_ICON, SHOT_ICON } from "./DrinkForm";
import classnames from "classnames";
import { Roboto } from "next/font/google";
import DeleteDrinkModal from "./DeleteDrinkModal";

const roboto = Roboto({
  weight: "300",
  subsets: ["latin"],
});

const DrinkIcon = ({ drinkType }: { drinkType: DrinkType }) => {
  return (
    <div className="flex items-center justify-center bg-stone-700 rounded-lg md:h-14 md:w-14 h-7 w-7">
      {drinkType === "pint" ? (
        <PINT_ICON className="md:h-10 md:w-10 h-5 w-5" />
      ) : drinkType === "can" ? (
        <CAN_ICON className="md:h-10 md:w-10 h-5 w-5" />
      ) : drinkType === "glass" ? (
        <GLASS_ICON className="md:h-10 md:w-10 h-5 w-5" />
      ) : (
        <SHOT_ICON className="md:h-10 md:w-10 h-5 w-5" />
      )}
    </div>
  );
};

const Table = ({ drinks }: { drinks: Drink[] }) => {
  const [drinkToEdit, setDrinkToEdit] = useState<Drink | undefined>(undefined);
  const [drinkToDeleteId, setDrinkToDeleteId] = useState<string | undefined>(
    undefined
  );

  return (
    <>
      <table
        style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
        className="w-full text-2xl"
      >
        <tbody>
          {drinks.map((drink) => (
            <tr key={drink.id} className=" group  ">
              <td className="py-3 pl-3 font-bold rounded-l-lg bg-stone-900 ">
                <div className="flex items-center">
                  <DrinkIcon drinkType={drink.drink_type} />{" "}
                  <span className="capitalize ml-4">
                    {drink.drink_type}
                    <div className="text-xl text-stone-400 h-0 w-0 invisible md:w-auto md:h-auto md:visible">
                      <Timestamp date={drink.created_at} />
                    </div>
                  </span>
                </div>
              </td>
              <td className="py-3 text-stone-400 bg-stone-900 ">
                <div className="flex items-center  gap-3">
                  <span className="w-0 h-0 invisible md:w-auto md:h-auto md:visible">
                    {drink.volume}
                    {drink.measurement_unit}
                  </span>{" "}
                  <BsDot className="h-6 w-6 invisible md:visible" />
                  <span className="w-0 h-0 invisible md:w-auto md:h-auto md:visible">
                    {drink.abv}%{" "}
                  </span>
                  <BsDot className="h-6 w-6 invisible md:visible" />{" "}
                  <span className="text-stone-50">
                    {drink.units.toFixed(1)} Units
                  </span>
                </div>
              </td>

              <td className="py-3  bg-stone-900 rounded-r-lg ">
                <Popover placement="bottom-end" shouldCloseOnBlur>
                  <PopoverTrigger>
                    <Button
                      variant="light"
                      className="text-xl text-stone-50 visible md:invisible group-hover:visible md:animate-pulse min-w-0 rounded-full"
                    >
                      <BsThreeDots />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className={classnames(
                      "bg-stone-800 text-lg mt-2 items-start",
                      roboto.className
                    )}
                  >
                    <Button
                      onPress={() => setDrinkToEdit(drink)}
                      className="flex items-center text-lg bg-transparent hover:text-teal-500"
                    >
                      <FiEdit className="mr-3" /> Edit Drink
                    </Button>
                    <Button
                      onPress={() => setDrinkToDeleteId(drink.id)}
                      className="flex items-center text-lg bg-transparent  hover:text-teal-500 mt-3"
                    >
                      <BsTrash3Fill className="mr-3" /> Remove Drink
                    </Button>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditDrinkModal
        drinkToEdit={drinkToEdit}
        onClose={() => setDrinkToEdit(undefined)}
      />
      <DeleteDrinkModal
        drinkToDeleteId={drinkToDeleteId}
        onClose={() => setDrinkToDeleteId(undefined)}
      />
    </>
  );
};

export default Table;
