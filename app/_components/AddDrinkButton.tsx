"use client";

import { TbBeerFilled } from "react-icons/tb";
import { IconType } from "react-icons";
import { GiSodaCan } from "react-icons/gi";
import { LiaCocktailSolid } from "react-icons/lia";
import { FaWineGlassAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Button, Input, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import { Key, useState } from "react";

import supabase from "~/utils/supabase";
import { calculateUnits, convertToNumber } from "~/utils";

import { DrinkType, MeasurementUnit } from "../page";

import Modal from "./Modal";

const DrinkInput = ({
  description,
  value,
  onChange,
  suffix,
}: {
  description: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
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

const AddDrinkModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  const [volume, setVolume] = useState<string>("473");
  const [abv, setAbv] = useState<string>("5");
  const [drinkType, setDrinkType] = useState<DrinkType>("pint");
  const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>("ml");

  async function addDrink() {
    const numericVolume = convertToNumber(volume);
    const numericAbv = convertToNumber(abv);

    await supabase.from("drinks").insert({
      volume: numericVolume,
      abv: numericAbv,
      units: calculateUnits(numericVolume, numericAbv, measurementUnit),
      drink_type: drinkType,
      measurement_unit: measurementUnit,
    });

    router.refresh();
    onClose();
  }

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
    <Modal
      title="Add Drink"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={addDrink}
    >
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
    </Modal>
  );
};

const AddDrinkButton = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        className="bg-teal-600 text-white px-8 py-2 max-h-auto h-auto rounded-lg font-bold text-3xl"
      >
        <TbBeerFilled /> Add Drink!
      </Button>
      <AddDrinkModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddDrinkButton;
