import { Modal, TouchableOpacity, Platform } from "react-native";
import { useState } from "react";
import { Text } from "../Text";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import * as C from "./styles";

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export default function TableModal({
  visible,
  onClose,
  onSave,
}: TableModalProps) {
  const [table, setTable] = useState("");

  function handleSave() {
    onSave(table);
    setTable("");
    onClose();
  }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <C.Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <C.ModalBody>
          <C.Header>
            <Text weight="500">Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </C.Header>

          <C.Form>
            <C.Input
              keyboardType="number-pad"
              placeholderTextColor="#666"
              placeholder="Número da mesa"
              onChangeText={setTable}
            />
            <Button onPress={handleSave} disabled={table.length === 0}>
              Salvar
            </Button>
          </C.Form>
        </C.ModalBody>
      </C.Overlay>
    </Modal>
  );
}
