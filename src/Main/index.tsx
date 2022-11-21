import { ActivityIndicator } from "react-native";
import { Button } from "../components/Button";
import { Categories } from "../components/Categories";
import { Header } from "../components/Header";
import Menu from "../components/Menu";
import TableModal from "../components/TableModal";
import * as C from "./styles";
import { useEffect, useState } from "react";
import { Cart } from "../components/Cart";
import { CartItem } from "../types/cartItem";
import { Product } from "../types/products";
import { Empty } from "../components/Icons/Empty";
import { Text } from "../components/Text";
import { Category } from "../types/category";
import { api } from "../utils/api";

function Main() {
  const [isTableModalVisible, setTableModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [cartItens, setCartItens] = useState<CartItem[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([api.get("/categories"), api.get("/products")]).then(
      ([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
        setLoading(false);
      }
    );
  }, []);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
    setTableModal(false);
  }

  function handleResetOrder() {
    setSelectedTable("");
    setCartItens([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setTableModal(true);
    }

    setCartItens((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItens = [...prevState];
      const item = newCartItens[itemIndex];

      newCartItens[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItens;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItens((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItens = [...prevState];

      if (item.quantity === 1) {
        newCartItens.splice(itemIndex, 1);

        return newCartItens;
      }

      newCartItens[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItens;
    });
  }

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? "/products"
      : `categories/${categoryId}/products`;

    setLoadingProducts(true);

    const { data } = await api.get(route);
    setProducts(data);
    setLoadingProducts(false);
  }

  return (
    <>
      <C.Container>
        <Header
          handleCancelOrder={handleResetOrder}
          selectedTable={selectedTable}
        />

        {isLoading ? (
          <C.CenteredContainer>
            <ActivityIndicator color={"#d73035"} size="large" />
          </C.CenteredContainer>
        ) : (
          <>
            <C.CategoryContainer>
              <Categories
                onSelectCategory={handleSelectCategory}
                categories={categories}
              />
            </C.CategoryContainer>

            {isLoadingProducts ? (
              <C.CenteredContainer>
                <ActivityIndicator color={"#d73035"} size="large" />
              </C.CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <C.MenuContainer>
                    <Menu products={products} onAddToCart={handleAddToCart} />
                  </C.MenuContainer>
                ) : (
                  <C.CenteredContainer>
                    <Empty />
                    <Text color="#666" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado ☹️
                    </Text>
                  </C.CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </C.Container>
      <C.Footer>
        {/* <C.FooterContainer> */}
        {!selectedTable && (
          <Button disabled={isLoading} onPress={() => setTableModal(true)}>
            Novo Pedido
          </Button>
        )}

        {selectedTable && (
          <Cart
            selectedTable={selectedTable}
            cartItens={cartItens}
            handleAddToCart={handleAddToCart}
            handleDecrementCartItem={handleDecrementCartItem}
            onConfirmOrder={handleResetOrder}
          />
        )}
        {/* </C.FooterContainer> */}
      </C.Footer>

      <TableModal
        onClose={() => setTableModal(false)}
        visible={isTableModalVisible}
        onSave={handleSaveTable}
      />
    </>
  );
}

export default Main;
