import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Button from "../button";

interface ModalPageProps {
  show: boolean
}

/** 
 * @param {boolean} show - serve para mostrar ou esconder o modal
*/

export function ModalPage({
  show,

}: ModalPageProps) {
  return (
    <Modal
      isOpen={show}
      isDismissable={false}
      className="bg-zinc-900"
    >
      <ModalContent className="flex">
        <ModalHeader className="flex flex-col gap-1">
          Excluir registro
        </ModalHeader>
        <ModalBody>
          <p>Deseja realmente excluir o registro</p>
          <p>Depois de excluir, não haverá como recupera-lo!</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="rounded-lg opacity-80 hover:opacity-100"
            onClick={() => null}
          >
            Fechar
          </Button>
          <Button
            color="danger"
            className="rounded-lg opacity-80 hover:opacity-100"
            onClick={() => null}
          >
            Tenho certeza!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
