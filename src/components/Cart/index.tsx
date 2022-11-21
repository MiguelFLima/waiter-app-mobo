import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/cartItem";
import { Product } from "../../types/products";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { OrderConfirmedModal } from "../OrderConfirmedModal/OrderConfirmedModal";
import { Text } from "../Text";
import * as C from "./styles";
import { useState } from "react";
import { api } from "../../utils/api";

interface CartProps {
  cartItens: CartItem[];
  handleAddToCart: (product: Product) => void;
  handleDecrementCartItem: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({
  cartItens,
  handleAddToCart,
  handleDecrementCartItem,
  onConfirmOrder,
  selectedTable,
}: CartProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const total = cartItens.reduce((acc, cartItem) => {
    return acc + cartItem.product.price * cartItem.quantity;
  }, 0);

  async function handleConfirmOrder() {
    setLoading(true);
    const payload = {
      table: selectedTable,
      products: cartItens.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
    };

    await api.post("/orders", payload);
    setLoading(false);
    setModalVisible(true);

    // console.log("payload", JSON.stringify(payload, null, 2));
  }

  function handleOk() {
    onConfirmOrder();
    setModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal onOk={handleOk} visible={isModalVisible} />
      {cartItens.length > 0 && (
        <FlatList
          data={cartItens}
          keyExtractor={(cartItens) => cartItens.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 135 }}
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
                <TouchableOpacity
                  onPress={() => handleAddToCart(cartItem.product)}
                  style={{ marginRight: 16 }}
                >
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDecrementCartItem(cartItem.product)}
                >
                  <MinusCircle />
                </TouchableOpacity>
              </C.Actions>
            </C.Item>
          )}
        />
      )}

      <C.Sumary>
        <C.TotalContainer>
          {cartItens.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="700">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio!</Text>
          )}
        </C.TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={cartItens.length === 0}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </C.Sumary>
    </>
  );
}
