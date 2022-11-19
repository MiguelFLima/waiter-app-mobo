import * as C from "./styles";
import { Text } from "../Text";

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ children, onPress, disabled }: ButtonProps) {
  return (
    <C.Container disabled={disabled} onPress={onPress}>
      <Text weight="500" color="#fff">
        {children}
      </Text>
    </C.Container>
  );
}
