import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { Key, useState } from "react";
import { IconType } from "react-icons";
import { FaWineGlassAlt } from "react-icons/fa";
import { GiSodaCan } from "react-icons/gi";
import { LiaCocktailSolid } from "react-icons/lia";
import { TbBeerFilled } from "react-icons/tb";

import { Drink, DrinkType, MeasurementUnit } from "../page";

export interface CreateDrink {
  volume: string;
  abv: string;
  drinkType: DrinkType;
  measurementUnit: MeasurementUnit;
}

const TabTitle = ({
  tab,
}: {
  tab: {
    icon: IconType;
    type: DrinkType;
  };
}) => {
  return (
    <div className="flex items-center space-x-2 text-2xl">
      <tab.icon />
      <span className="capitalize">{tab.type}</span>
    </div>
  );
};

const DrinkInput = ({
  description,
  value,
  onChange,
  suffix,
}: {
  description: string;
  value: string;
  onChange: (val: string) => void;
  suffix: string;
}) => {
  return (
    <Input
      description={description}
      value={value}
      onValueChange={onChange}
      endContent={<div>{suffix}</div>}
      className="w-1/2"
      classNames={{
        input: ["text-3xl", "text-right"],
        description: "text-2xl",
      }}
      size="lg"
    />
  );
};

function convertNumberToString(num: number | undefined) {
  if (num === undefined) return undefined;
  return num.toString();
}

const DrinkForm = ({
  initDrink,
  onSubmit,
  onClose,
}: {
  initDrink?: Drink;
  onSubmit: (drink: CreateDrink) => void;
  onClose: () => void;
}) => {
  const [volume, setVolume] = useState<string>(
    convertNumberToString(initDrink?.volume) ?? "473"
  );
  const [abv, setAbv] = useState<string>(
    convertNumberToString(initDrink?.abv) ?? "5"
  );
  const [drinkType, setDrinkType] = useState<DrinkType>(
    initDrink?.drink_type ?? "pint"
  );
  const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>(
    initDrink?.measurement_unit ?? "ml"
  );

  function handleDrinkSelect(newDrinkType: Key) {
    if (newDrinkType === "pint") {
      setDrinkType("pint");
      setVolume("473");
      setMeasurementUnit("ml");
      setAbv("5");
    } else if (newDrinkType === "can") {
      setDrinkType("can");
      setVolume("375");
      setMeasurementUnit("ml");
      setAbv("5");
    } else if (newDrinkType === "glass") {
      setDrinkType("glass");
      setVolume("12");
      setMeasurementUnit("oz");
      setAbv("12");
    } else {
      setDrinkType("shot");
      setVolume("1");
      setMeasurementUnit("shot");
      setAbv("40");
    }
  }

  return (
    <>
      <Tabs
        selectedKey={drinkType}
        onSelectionChange={handleDrinkSelect}
        aria-label="Options"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider flex justify-between",
          cursor: "w-full bg-teal-500",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-teal-500",
        }}
      >
        <Tab
          key="pint"
          title={<TabTitle tab={{ type: "pint", icon: TbBeerFilled }} />}
        />
        <Tab
          key="can"
          title={<TabTitle tab={{ type: "can", icon: GiSodaCan }} />}
        />
        <Tab
          key="glass"
          title={<TabTitle tab={{ type: "glass", icon: FaWineGlassAlt }} />}
        />
        <Tab
          key="shot"
          title={<TabTitle tab={{ type: "shot", icon: LiaCocktailSolid }} />}
        />
      </Tabs>
      <div className="flex items-center gap-4 mb-4">
        <DrinkInput
          description={
            drinkType === "glass"
              ? "Amount of wine in oz"
              : drinkType === "shot"
              ? "# of shots"
              : "Amount of beer in ml"
          }
          value={volume}
          onChange={(value) => setVolume(value)}
          suffix={measurementUnit}
        />
        <DrinkInput
          description="Percentage of alcohol"
          value={abv}
          onChange={(value) => setAbv(value)}
          suffix="%"
        />
      </div>
      <div className="flex items-center justify-end gap-6 py-3">
        <Button className="text-2xl" variant="light" onPress={onClose}>
          Cancel
        </Button>
        <Button
          className="bg-teal-500 text-2xl"
          onPress={() => {
            onSubmit({
              volume,
              abv,
              drinkType,
              measurementUnit,
            });
            onClose();
          }}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};

export default DrinkForm;
