"use client";

import { TbBeerFilled } from "react-icons/tb";
import { Button, Input, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import Modal from "./Modal";
import { useState } from "react";
import { calculateUnits, convertToNumber } from "~/utils";
import supabase from "~/utils/supabase";
import { useRouter } from "next/navigation";
import { FaWineGlassAlt } from "react-icons/fa";
import { LiaCocktailSolid } from "react-icons/lia";
import { GiSodaCan } from "react-icons/gi";

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

const AddDrinkModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  const [pintVolume, setPintVolume] = useState<string>("473");
  const [canVolume, setCanVolume] = useState<string>("375");
  const [glassVolume, setGlassVolume] = useState<string>("12");
  const [shotVolume, setShotVolume] = useState<string>("1");

  const [pintAbv, setPintAbv] = useState<string>("5");
  const [canAbv, setCanAbv] = useState<string>("5");
  const [glassAbv, setGlassAbv] = useState<string>("12");
  const [shotAbv, setShotAbv] = useState<string>("40");

  async function addDrink() {
    //CHANGE THIS TO ACCOUNT FOR DIFFERENT VOLUMES
    const numericVolume = convertToNumber(pintVolume);
    const numericAbv = convertToNumber(pintAbv);

    await supabase.from("drinks").insert({
      volume: numericVolume,
      abv: numericAbv,
      units: calculateUnits(numericVolume, numericAbv),
    });

    router.refresh();
    onClose();
  }

  return (
    <Modal
      title="Add Drink"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={addDrink}
    >
      <Tabs
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
          title={
            <div className="flex items-center space-x-2 text-2xl">
              <TbBeerFilled />
              <span>Pint</span>
            </div>
          }
        >
          <div className="flex items-center gap-4 mb-4">
            <DrinkInput
              description="Amount of beer in ml"
              value={pintVolume}
              onChange={(value) => setPintVolume(value)}
              suffix="ml"
            />
            <DrinkInput
              description="Percentage of alcohol"
              value={pintAbv}
              onChange={(value) => setPintAbv(value)}
              suffix="%"
            />
          </div>
        </Tab>
        <Tab
          title={
            <div className="flex items-center space-x-2 text-2xl">
              <GiSodaCan />
              <span>Can</span>
            </div>
          }
        >
          <div className="flex items-center gap-4 mb-4">
            <DrinkInput
              description="Amount of beer in ml"
              value={canVolume}
              onChange={(value) => setCanVolume(value)}
              suffix="ml"
            />
            <DrinkInput
              description="Percentage of alcohol"
              value={canAbv}
              onChange={(value) => setCanAbv(value)}
              suffix="%"
            />
          </div>
        </Tab>
        <Tab
          title={
            <div className="flex items-center space-x-2 text-2xl">
              <FaWineGlassAlt />
              <span>Glass </span>
            </div>
          }
        >
          <div className="flex items-center gap-4 mb-4">
            <DrinkInput
              description="Amount of wine in oz"
              value={glassVolume}
              onChange={(value) => setGlassVolume(value)}
              suffix="oz"
            />
            <DrinkInput
              description="Percentage of alcohol"
              value={glassAbv}
              onChange={(value) => setGlassAbv(value)}
              suffix="%"
            />
          </div>
        </Tab>
        <Tab
          title={
            <div className="flex items-center space-x-2 text-2xl">
              <LiaCocktailSolid />
              <span>Shot</span>
            </div>
          }
        >
          <div className="flex items-center gap-4 mb-4">
            <DrinkInput
              description="# of shots in drink"
              value={shotVolume}
              onChange={(value) => setShotVolume(value)}
              suffix={`shot${shotVolume === "1" ? "" : "s"}`}
            />
            <DrinkInput
              description="Percentage of alcohol"
              value={shotAbv}
              onChange={(value) => setShotAbv(value)}
              suffix="%"
            />
          </div>
        </Tab>
      </Tabs>
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
