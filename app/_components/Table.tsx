"use client";

import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";

import { convertToNumber, calculateUnits } from "~/utils";
import supabase from "~/utils/supabase";

import { Drink } from "../page";

import Modal from "./Modal";
import Timestamp from "./Timestamp";

const EditModal = ({
  drink,
  onClose,
}: {
  drink: Drink | undefined;
  onClose: () => void;
}) => {
  const router = useRouter();

  const [volume, setVolume] = useState<string>();
  const [abv, setAbv] = useState<string>();

  useEffect(() => {
    if (!drink) return;

    setVolume(drink.volume.toString());
    setAbv(drink.abv.toString());
  }, [drink]);

  async function updateDrink() {
    if (!drink) return;

    const numericVolume = convertToNumber(volume!);
    const numericAbv = convertToNumber(abv!);

    await supabase
      .from("drinks")
      .update({
        volume: numericVolume,
        abv: numericAbv,
        units: calculateUnits(numericVolume, numericAbv, "ml"),
      })
      .eq("id", drink.id);

    router.refresh();
    onClose();
  }

  return (
    <Modal
      title="Edit Drink"
      isOpen={!!drink}
      onClose={onClose}
      onConfirm={updateDrink}
    >
      <div className="flex flex-col gap-2">
        <input value={volume} onChange={(e) => setVolume(e.target.value)} />
        <input value={abv} onChange={(e) => setAbv(e.target.value)} />
      </div>
    </Modal>
  );
};

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
      <EditModal
        drink={drinkToEdit}
        onClose={() => setDrinkToEdit(undefined)}
      />
    </>
  );
};

export default Table;
