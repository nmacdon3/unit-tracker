"use client";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

import { Drink } from "../page";

import Timestamp from "./Timestamp";
import EditDrinkModal from "./EditDrinkModal";

const Table = ({ drinks }: { drinks: Drink[] }) => {
  const [drinkToEdit, setDrinkToEdit] = useState<Drink | undefined>(undefined);

  return (
    <>
      <table
        style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
        className="w-full"
      >
        <tbody>
          {drinks.map((drink) => (
            <tr key={drink.id} className=" group  ">
              <td className="py-2 font-bold rounded-l-lg bg-stone-900 ">
                {drink.units} Units
              </td>
              <td className="py-2 text-stone-400 bg-stone-900 ">
                {drink.volume}ml
              </td>
              <td className="py-2 text-stone-400 bg-stone-900 ">
                {drink.abv}%
              </td>
              <td className="py-2 text-stone-400 bg-stone-900 ">
                <Timestamp date={drink.created_at} />
              </td>
              <td className="py-2 w-full flex justify-end bg-stone-900 rounded-r-lg ">
                <Button
                  onPress={() => setDrinkToEdit(drink)}
                  variant="light"
                  className="text-xl text-teal-500 invisible group-hover:visible animate-pulse min-w-0"
                >
                  <FiEdit />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditDrinkModal
        drinkToEdit={drinkToEdit}
        onClose={() => setDrinkToEdit(undefined)}
      />
    </>
  );
};

export default Table;
