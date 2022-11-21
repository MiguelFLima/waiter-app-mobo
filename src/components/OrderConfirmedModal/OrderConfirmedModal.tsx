import { StatusBar } from "expo-status-bar";
import { Modal } from "react-native";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text";
import * as C from "./styles";

interface OrderConfirmedModalProps {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmedModal({
  visible,
  onOk,
}: OrderConfirmedModalProps) {
  return (
    <Modal visible={visible} animationType="fade">
      <StatusBar style="light" />
      <C.Container>
        <CheckCircle />
        <Text style={{ marginTop: 12 }} size={20} weight="500" color="#fff">
          Pedido Confirmado
        </Text>
        <Text style={{ marginTop: 4 }} color="#fff" opacity={0.9}>
          O pedido já entrou na fila de produção!
        </Text>
        <C.OKButton onPress={onOk}>
          <Text color="#d73035" weight="500">
            OK
          </Text>
        </C.OKButton>
      </C.Container>
    </Modal>
  );
}
