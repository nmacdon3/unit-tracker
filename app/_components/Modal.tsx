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
  noButtons,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  noButtons?: boolean;
  children: ReactNode;
}) => {
  return (
    <DefaultModal
      isDismissable={false}
      className="z-50 relative  w-full md:w-auto rounded-none md:rounded-lg"
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
            {!noButtons && (
              <ModalFooter className="gap-3 md:gap-6">
                <Button className="text-2xl" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-teal-500 text-2xl"
                  onPress={() => {
                    if (onConfirm) onConfirm();
                    onClose();
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </DefaultModal>
  );
};

export default Modal;
