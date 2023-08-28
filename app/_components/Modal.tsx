"use client";

import {
  Button,
  Modal as DefaultModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { ReactNode } from "react";

const Modal = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
}) => {
  return (
    <DefaultModal
      isDismissable={false}
      className="z-50 relative"
      backdrop={"blur"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent className="text-3xl">
        {(onClose) => (
          <>
            <ModalHeader className="text-3xl flex flex-col gap-1">
              {title}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter className="gap-6">
              <Button className="text-2xl" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                className="bg-teal-500 text-2xl"
                onPress={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </DefaultModal>
  );
};

export default Modal;
