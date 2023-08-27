import Link from "next/link";
import supabase from "~/utils/supabase";
import classnames from "classnames";
import Table from "./_components/Table";
import { BsChevronDown } from "react-icons/bs";

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

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

type WeekDay = (typeof WEEK_DAYS)[number];

const WeekDay = ({ day, drinks }: { day: WeekDay; drinks: Drink[] }) => {
  //variable that checks if the day is in the past
  const isPast = new Date().getDay() > WEEK_DAYS.indexOf(day);

  //variable that determines how many days ago this weekday was
  const daysAgo = new Date().getDay() - WEEK_DAYS.indexOf(day);

  //all drinks that happened 2 days ago relative to today
  const filteredDrinks = drinks.filter(
    (drink) =>
      new Date(drink.created_at).getDay() === new Date().getDay() - daysAgo
  );

  return (
    <button
      disabled={daysAgo < 0}
      className={classnames(
        "w-10 h-10 border  rounded text-lg flex items-center justify-center",
        isPast
          ? "border-stone-400 text-stone-400"
          : filteredDrinks.length > 0
          ? "border-orange-200 text-orange-200"
          : "border-stone-50"
      )}
    >
      {day[0]}
    </button>
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
        <div className="w-10 h-10 border border-stone-50 rounded-full"></div>
      </header>
      <div className="absolute top-4 left-4">
        This Week
        <div className="flex justify-between gap-4 mt-2">
          {WEEK_DAYS.map((day) => (
            <WeekDay key={day} day={day} drinks={drinks} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-40 gap-6 h-screen">
        <h1 className="text-6xl font-bold">{totalUnits} Units</h1>
        <ProgressBar value={totalUnits} />
        <div className="text-stone-400 flex items-center ">
          {/* <BsChevronDown className="mr-4" /> */}
          {`That's`} <b className="text-stone-200 mx-2">12% less</b>than this
          time last week!
        </div>
        <Link
          href="/add"
          className="bg-teal-600 text-white px-8 py-2 rounded-lg mt-20 font-bold"
        >
          + Add Drink
        </Link>
      </div>

      <div className="px-20">
        <h2 className="pb-2">History</h2>
        <Table drinks={drinks} />
      </div>
    </>
  );
}
