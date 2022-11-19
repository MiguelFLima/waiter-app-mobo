import { TouchableOpacity } from "react-native";
import { Text } from "../Text";
import * as C from "./style";

interface HeaderProps {
  selectedTable: string;
  handleCancelOrder: () => void;
}

export function Header({ selectedTable, handleCancelOrder }: HeaderProps) {
  return (
    <C.Container>
      {!selectedTable && (
        <>
          <Text opacity={0.9}>Bem-vindo(a) ao!</Text>
          <Text size={24} weight="700">
            WAITER <Text size={24}>APP</Text>
          </Text>
        </>
      )}

      {selectedTable && (
        <C.Content>
          <C.OrderHeader>
            <Text size={24} weight="500">
              Pedido
            </Text>
            <TouchableOpacity onPress={handleCancelOrder}>
              <Text color="#d73035" size={14} weight="500">
                Cancelar pedido
              </Text>
            </TouchableOpacity>
          </C.OrderHeader>

          <C.Table>
            <Text color="#666">Mesa {selectedTable}</Text>
          </C.Table>
        </C.Content>
      )}
    </C.Container>
  );
}
