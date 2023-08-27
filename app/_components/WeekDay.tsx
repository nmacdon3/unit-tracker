"use client";
import { Drink } from "../page";
import classnames from "classnames";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import Table from "./Table";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

type WeekDayType = (typeof WEEK_DAYS)[number];

const WeekDay = ({ day, drinks }: { day: WeekDayType; drinks: Drink[] }) => {
  const isPast = new Date().getDay() > WEEK_DAYS.indexOf(day);
  const isToday = new Date().getDay() === WEEK_DAYS.indexOf(day);
  const daysAgo = new Date().getDay() - WEEK_DAYS.indexOf(day);

  const filteredDrinks = drinks.filter(
    (drink) =>
      new Date(drink.created_at).getDay() === new Date().getDay() - daysAgo
  );

  return (
    <Popover placement="bottom">
      <PopoverTrigger disabled={daysAgo < 0}>
        <Button
          disabled={daysAgo < 0}
          className={classnames(
            "w-10 h-10 border p-0 bg-transparent min-w-0  rounded text-lg flex items-center justify-center relative font-bold",
            isPast
              ? filteredDrinks.length > 0
                ? "border-orange-200 text-orange-200"
                : "border-stone-500 text-stone-500"
              : isToday
              ? "bg-stone-50 text-stone-950"
              : "border-stone-50 text-stone-50"
          )}
        >
          {day[0]}
          {filteredDrinks.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center text-sm text-stone-900">
              {filteredDrinks.length}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-stone-700 text-2xl w-[35rem] flex flex-column items-start mt-2">
        <h4 className="font-3xl">
          {day} ({filteredDrinks.length} drinks)
        </h4>
        <Table drinks={filteredDrinks} />
      </PopoverContent>
    </Popover>
  );
};

export default WeekDay;
