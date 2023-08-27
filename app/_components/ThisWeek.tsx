import { Drink } from "../page";
import WeekDay from "./WeekDay";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const ThisWeek = ({ drinks }: { drinks: Drink[] }) => {
  //variable for how many days there are left in the week
  const daysLeft = 7 - new Date().getDay();

  return (
    <div className="absolute top-4 left-4">
      This Week
      <div className="flex  items-center gap-4 mt-2">
        {WEEK_DAYS.map((day) => (
          <WeekDay key={day} day={day} drinks={drinks} />
        ))}
        <div className="text-2xl text-stone-400">{daysLeft} days left</div>
      </div>
    </div>
  );
};

export default ThisWeek;
