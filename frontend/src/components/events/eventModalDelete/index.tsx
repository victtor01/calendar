'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button as ButtonModal,
} from "@nextui-org/react";

interface ModalProps {
  handleShowModal: () => void;
  eventDelete: () => void;
  show: boolean;
}

export const ModalDelete = ({
  handleShowModal,
  eventDelete,
  show,
}: ModalProps) => {
  return (
    <Modal
      onOpenChange={handleShowModal}
      isDismissable={false}
      isOpen={show}
      className="bg-zinc-900"
    >
      <ModalContent className="flex">
        <ModalHeader className="flex flex-col gap-1">Deletar</ModalHeader>
        <ModalBody>
          <p>Deseja realmente excluir esse evento?</p>
        </ModalBody>
        <ModalFooter>
          <ButtonModal
            color="primary"
            className="rounded-lg opacity-80 hover:opacity-100"
            onClick={handleShowModal}
          >
            Fechar
          </ButtonModal>
          <ButtonModal
            color="danger"
            onClick={eventDelete}
            className="rounded-lg bg-rose-600 opacity-80 hover:opacity-100"
          >
            Excluir!
          </ButtonModal>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
