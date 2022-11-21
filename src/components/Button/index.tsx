import * as C from "./styles";
import { Text } from "../Text";
import { ActivityIndicator } from "react-native";

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ children, onPress, disabled, loading }: ButtonProps) {
  return (
    <C.Container disabled={disabled || loading} onPress={onPress}>
      {!loading && (
        <Text weight="500" color="#fff">
          {children}
        </Text>
      )}

      {loading && <ActivityIndicator color={"white"} />}
    </C.Container>
  );
}
