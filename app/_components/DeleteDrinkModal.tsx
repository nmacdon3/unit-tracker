import { useRouter } from "next/navigation";

import supabase from "~/utils/supabase";
import Modal from "./Modal";

const DeleteDrinkModal = ({
  drinkToDeleteId,
  onClose,
}: {
  drinkToDeleteId: string | undefined;
  onClose: () => void;
}) => {
  const router = useRouter();

  async function deleteDrink() {
    await supabase.from("drinks").delete().eq("id", drinkToDeleteId);

    router.refresh();
    onClose();
  }

  return (
    <Modal
      title="Are You Sure?"
      isOpen={!!drinkToDeleteId}
      onClose={onClose}
      onConfirm={deleteDrink}
    >
      You're about to remove this drink from your record. Are you sure you want
      to do this?
    </Modal>
  );
};

export default DeleteDrinkModal;
