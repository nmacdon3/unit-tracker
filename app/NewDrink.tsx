"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import supabase from "../utils/supabase";

//function for converting a string value into a number
function convertToNumber(value: string) {
  if (value === "") {
    return 0;
  }
  return parseInt(value);
}

const NewDrink = () => {
  const router = useRouter();

  const [type, setType] = useState<string>("");
  const [units, setUnits] = useState<string>("0");

  const addDrink = async (e: any) => {
    e.preventDefault();
    await supabase
      .from("drinks")
      .insert({ type, units: convertToNumber(units) });

    setType("");
    setUnits("0");
    router.refresh();
  };

  return (
    <form onSubmit={addDrink} className="text-red-500">
      <input value={type} onChange={(e) => setType(e.target.value)} />
      <input value={units} onChange={(e) => setUnits(e.target.value)} />
      <button>Add Drink</button>
    </form>
  );
};

export default NewDrink;
