"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import supabase from "~/utils/supabase";
import { convertToNumber, calculateUnits } from "~/utils";

const AddDrink = () => {
  const router = useRouter();

  const [volume, setVolume] = useState<string>("375");
  const [abv, setAbv] = useState<string>("5");

  const addDrink = async (e: any) => {
    e.preventDefault();

    const numericVolume = convertToNumber(volume);
    const numericAbv = convertToNumber(abv);

    await supabase.from("drinks").insert({
      volume: numericVolume,
      abv: numericAbv,
      units: calculateUnits(numericVolume, numericAbv),
    });

    setVolume("375");
    setAbv("5");
    router.refresh();
    router.push("/");
  };

  return (
    <div>
      <Link href="/">Cancel</Link>
      <h1>Add Drink</h1>

      <form onSubmit={addDrink} className="text-red-500">
        <input value={volume} onChange={(e) => setVolume(e.target.value)} />
        <input value={abv} onChange={(e) => setAbv(e.target.value)} />
        <button>Add Drink</button>
      </form>
    </div>
  );
};

export default AddDrink;
