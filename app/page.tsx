import supabase from "~/utils/supabase";

import Table from "./_components/Table";
import ThisWeek from "./_components/ThisWeek";
import AddDrinkButton from "./_components/AddDrinkButton";
import ProgressBar from "./_components/ProgressBar";

export const revalidate = 0;

export type DrinkType = "pint" | "can" | "glass" | "shot";
export type MeasurementUnit = "ml" | "oz" | "shot";

export interface Drink {
  id: string;
  units: number;
  volume: number;
  abv: number;
  drink_type: DrinkType;
  measurement_unit: MeasurementUnit;
  created_at: string;
}

export default async function Home() {
  const dateToQuery = new Date();
  dateToQuery.setDate(dateToQuery.getDate() - new Date().getDay());
  dateToQuery.setHours(0, 0, 0, 0);

  const { data: drinks } = await supabase
    .from("drinks")
    .select()
    .gte("created_at", dateToQuery.toISOString())
    .returns<Drink[]>();

  const totalUnits = drinks?.reduce((acc, drink) => acc + drink.units, 0) ?? 0;

  const unitsLeft = 14 - totalUnits;
  const beersLeft = Math.floor(unitsLeft / 2);

  if (!drinks) {
    return <p>No drinks found.</p>;
  }

  return (
    <>
      <ThisWeek drinks={drinks} />
      <div className="flex flex-col items-center justify-center lg:px-64 px-4 gap-6 h-screen">
        <div className="text-stone-400 ">{`This week, you've had`}</div>
        <h1 className="text-6xl font-bold">{totalUnits.toFixed(1)} Units</h1>
        <ProgressBar value={totalUnits} />
        <div className="text-stone-400 flex items-center mb-20">
          Out of 14 {totalUnits > 14 && <> &#129325;</>}
        </div>
        <AddDrinkButton />
        <div className="text-stone-400 flex items-center">
          {totalUnits <= 14 ? (
            <>
              {`You've got about`}{" "}
              <b className="text-stone-200 mx-2">{beersLeft} beers</b>left!
            </>
          ) : (
            <>
              {`You're about`}{" "}
              <b className="text-stone-200 mx-2">{-beersLeft} beers</b>over the
              recommended amount.
            </>
          )}
        </div>
      </div>

      <div className="lg:px-20 px-4 mb-40">
        <h2>History</h2>
        <Table drinks={drinks} />
      </div>
    </>
  );
}
