import { FlatList, Modal } from "react-native";
import { Product } from "../../types/products";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import * as C from "./styles";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({
  visible,
  onClose,
  product,
  onAddToCart,
}: ProductModalProps) {
  if (!product) {
    return null;
  }

  function handleAddToCart() {
    onAddToCart(product!);
    onClose();
  }

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <C.Image
        source={{
          uri: `http://192.168.0.102:8000/uploads/${product.imagePath}`,
        }}
      >
        <C.CloseButton onPress={() => onClose()}>
          <Close />
        </C.CloseButton>
      </C.Image>

      <C.ModalBody>
        <C.Header>
          <Text size={24} weight="500">
            {product.name}
          </Text>
          <Text style={{ marginTop: 8 }} color="#666">
            {product.description}
          </Text>
        </C.Header>

        {product.ingredients.length > 0 && (
          <C.IngredientsContainer>
            <Text weight="500" color="#666">
              Ingredientes
            </Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={(ingredient) => ingredient._id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredient }) => (
                <C.Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text style={{ marginLeft: 20 }} size={14} color="#666">
                    {ingredient.name}
                  </Text>
                </C.Ingredient>
              )}
            />
          </C.IngredientsContainer>
        )}
      </C.ModalBody>

      <C.Footer>
        <C.FooterContainer>
          <C.PriceContainer>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="500">
              {formatCurrency(product.price)}
            </Text>
          </C.PriceContainer>

          <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
        </C.FooterContainer>
      </C.Footer>
    </Modal>
  );
}
