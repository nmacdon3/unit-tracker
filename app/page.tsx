import Link from "next/link";
import supabase from "@/utils/supabase";
import classnames from "classnames";

export const revalidate = 0;

interface Drink {
  id: string;
  units: number;
  volume: number;
  abv: number;
  created_at: string;
}

//Timestamp component that takes a date string and returns a human readable date and time
const Timestamp = ({ date }: { date: string }) => {
  const dateObject = new Date(date);
  return (
    <div className="text-stone-400">
      {dateObject.toLocaleDateString()} {dateObject.toLocaleTimeString()}
    </div>
  );
};

const Table = ({ drinks }: { drinks: Drink[] }) => {
  return (
    <table className="w-full border-t border-stone-500">
      <tbody>
        {drinks.map((drink) => (
          <tr key={drink.id}>
            <td className="py-2 font-bold">{drink.units} Units</td>
            <td className="py-2 text-stone-400">{drink.volume}ml</td>
            <td className="py-2 text-stone-400">{drink.abv}%</td>
            <td className="py-2 text-stone-400">
              <Timestamp date={drink.created_at} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

//progress bar component that takes a value prop between 0 and 14 and fills the bar accordingly.
const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className="w-full h-10 p-2 border rounded-lg border-stone-50">
      <div
        //calculate width based on value prop
        style={{ width: `${(value / 14) * 100}%` }}
        className={classnames(
          "h-full rounded-md",
          value > 14 ? "bg-red-500" : "bg-orange-200",
          "transition-all duration-500 ease-in-out"
        )}
      ></div>
    </div>
  );
};

export default async function Drinks() {
  const { data: drinks } = await supabase
    .from("drinks")
    .select()
    .returns<Drink[]>();

  const totalUnits = drinks?.reduce((acc, drink) => acc + drink.units, 0) ?? 0;

  if (!drinks) {
    return <p>No drinks found.</p>;
  }

  return (
    <>
      <div className="flex flex-col items-center gap-20">
        <h1 className="text-6xl font-bold">{totalUnits} Units</h1>
        <ProgressBar value={totalUnits} />
        <Link href="/add" className="bg-teal-600 text-white px-8 py-2 rounded">
          + Add Drink
        </Link>
      </div>

      <h2 className="pb-2">History</h2>
      <Table drinks={drinks} />
    </>
  );
}
