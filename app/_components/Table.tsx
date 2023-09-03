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
      <table className="w-full border-t border-stone-500">
        <tbody>
          {drinks.map((drink) => (
            <tr key={drink.id} className="flex justify-between group">
              <td className="py-2 font-bold">{drink.units} Units</td>
              <td className="py-2 text-stone-400">{drink.volume}ml</td>
              <td className="py-2 text-stone-400">{drink.abv}%</td>
              <td className="py-2 text-stone-400">
                <Timestamp date={drink.created_at} />
              </td>
              <td className="py-2">
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
