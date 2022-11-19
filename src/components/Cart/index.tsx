import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/cartItem";
import { Product } from "../../types/products";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { Text } from "../Text";
import * as C from "./styles";

interface CartProps {
  cartItens: CartItem[];
}

export function Cart({ cartItens }: CartProps) {
  return (
    <>
      <FlatList
        data={cartItens}
        keyExtractor={(cartItens) => cartItens.product._id}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 20, maxHeight: 150 }}
        renderItem={({ item: cartItem }) => (
          <C.Item>
            <C.ProductContainer>
              <C.Image
                source={{
                  uri: `http://192.168.0.102:8000/uploads/${cartItem.product.imagePath}`,
                }}
              />

              <C.QuantityContainer>
                <Text>{cartItem.quantity}x</Text>
              </C.QuantityContainer>

              <C.ProductDetails>
                <Text size={14} weight="500">
                  {cartItem.product.name}
                </Text>
                <Text size={14} color="#666" style={{ marginTop: 4 }}>
                  {formatCurrency(cartItem.product.price)}
                </Text>
              </C.ProductDetails>
            </C.ProductContainer>
            <C.Actions>
              <TouchableOpacity style={{ marginRight: 16 }}>
                <PlusCircle />
              </TouchableOpacity>
              <TouchableOpacity>
                <MinusCircle />
              </TouchableOpacity>
            </C.Actions>
          </C.Item>
        )}
      />

      <C.Sumary>
        <C.TotalContainer>
          <Text color="#666">Total</Text>
          <Text size={20} weight="700">
            {formatCurrency(120)}
          </Text>
        </C.TotalContainer>

        <Button onPress={() => alert("Confirmar pedido")}>
          Confirmar pedido
        </Button>
      </C.Sumary>
    </>
  );
}
