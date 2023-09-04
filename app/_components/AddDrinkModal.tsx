import { useRouter } from "next/navigation";

import supabase from "~/utils/supabase";
import { convertToNumber, calculateUnits } from "~/utils";

import DrinkForm, { CreateDrink } from "./DrinkForm";
import Modal from "./Modal";

const AddDrinkModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  async function addDrink(drink: CreateDrink) {
    const numericVolume = convertToNumber(drink.volume);
    const numericAbv = convertToNumber(drink.abv);

    await supabase.from("drinks").insert({
      volume: numericVolume,
      abv: numericAbv,
      units: calculateUnits(numericVolume, numericAbv, drink.measurementUnit),
      drink_type: drink.drinkType,
      measurement_unit: drink.measurementUnit,
      created_at: drink.createdAt,
    });

    router.refresh();
    onClose();
  }

  return (
    <Modal title="Add Drink" isOpen={isOpen} onClose={onClose} noButtons>
      <DrinkForm onSubmit={addDrink} onClose={onClose} />
    </Modal>
  );
};

export default AddDrinkModal;
