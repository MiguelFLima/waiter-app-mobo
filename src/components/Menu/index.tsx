import { FlatList } from "react-native";
import { Text } from "../Text";
import { products } from "../../mocks/products";
import * as C from "./styles";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import ProductModal from "../ProductModal";
import { useState } from "react";
import { Product } from "../../types/products";

export default function Menu() {
  const [isModalVisible, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setModal(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        product={selectedProduct}
        onClose={() => setModal(false)}
        visible={isModalVisible}
      />

      <FlatList
        ItemSeparatorComponent={C.Separator}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        data={products}
        keyExtractor={(product) => product._id}
        renderItem={({ item: product }) => (
          <C.ProductContainer onPress={() => handleOpenModal(product)}>
            <C.ProductImage
              source={{
                uri: `http://192.168.0.102:8000/uploads/${product.imagePath}`,
              }}
            />
            <C.ProductDetails>
              <Text weight="700">{product.name}</Text>
              <Text size={14} color="#666" style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text size={14} weight="500">
                {formatCurrency(product.price)}
              </Text>
            </C.ProductDetails>

            <C.AddToCartButton>
              <PlusCircle />
            </C.AddToCartButton>
          </C.ProductContainer>
        )}
      />
    </>
  );
}
