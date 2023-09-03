import { useRouter } from "next/navigation";

import supabase from "~/utils/supabase";
import { convertToNumber, calculateUnits } from "~/utils";

import { Drink } from "../page";

import DrinkForm, { CreateDrink } from "./DrinkForm";
import Modal from "./Modal";

const EditDrinkModal = ({
  drinkToEdit,
  onClose,
}: {
  drinkToEdit: Drink | undefined;
  onClose: () => void;
}) => {
  const router = useRouter();

  async function updateDrink(drink: CreateDrink) {
    if (!drinkToEdit) return;

    const numericVolume = convertToNumber(drink.volume!);
    const numericAbv = convertToNumber(drink.abv!);

    await supabase
      .from("drinks")
      .update({
        volume: numericVolume,
        abv: numericAbv,
        units: calculateUnits(numericVolume, numericAbv, "ml"),
        drink_type: drink.drinkType,
        measurement_unit: drink.measurementUnit,
      })
      .eq("id", drinkToEdit.id);

    router.refresh();
    onClose();
  }

  return (
    <Modal
      title="Edit Drink"
      isOpen={!!drinkToEdit}
      onClose={onClose}
      noButtons
    >
      <DrinkForm
        initDrink={drinkToEdit}
        onSubmit={updateDrink}
        onClose={onClose}
      />
    </Modal>
  );
};

export default EditDrinkModal;
