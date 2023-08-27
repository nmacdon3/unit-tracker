"use client";
import { Drink, WeekDayType, WEEK_DAYS } from "../page";
import classnames from "classnames";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import Table from "./Table";

const WeekDay = ({ day, drinks }: { day: WeekDayType; drinks: Drink[] }) => {
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
    <Popover placement="bottom">
      <PopoverTrigger>
        <button
          disabled={daysAgo < 0}
          className={classnames(
            "w-10 h-10 border  rounded text-lg flex items-center justify-center relative font-bold",
            isPast
              ? "border-stone-400 text-stone-400"
              : filteredDrinks.length > 0
              ? "border-orange-200 text-orange-200"
              : "bg-stone-50 text-stone-950"
          )}
        >
          {day[0]}
          {filteredDrinks.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center text-sm text-stone-900">
              {filteredDrinks.length}
            </div>
          )}
        </button>
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
