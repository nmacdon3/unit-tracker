import Link from "next/link";
import supabase from "~/utils/supabase";
import classnames from "classnames";
import Table from "./_components/Table";
import WeekDay from "./_components/WeekDay";
import ThisWeek from "./_components/ThisWeek";
import ProfileDropdown from "./_components/ProfileDropdown";
import AddDrinkButton from "./_components/AddDrinkButton";

export const revalidate = 0;

export interface Drink {
  id: string;
  units: number;
  volume: number;
  abv: number;
  created_at: string;
}

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

export default async function Home() {
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
      <header className="flex justify-between  py-4 px-10 sticky top-0 left-0">
        <div></div>
        <ProfileDropdown />
      </header>
      <ThisWeek drinks={drinks} />
      <div className="flex flex-col items-center justify-center px-40 gap-6 h-screen">
        <h1 className="text-6xl font-bold">{totalUnits} Units</h1>
        <ProgressBar value={totalUnits} />
        <div className="text-stone-400 flex items-center mb-20">
          {`That's`} <b className="text-stone-200 mx-2">12% less</b>than this
          time last week!
        </div>
        <AddDrinkButton />
      </div>

      <div className="px-20">
        <h2 className="pb-2">History</h2>
        <Table drinks={drinks} />
      </div>
    </>
  );
}
