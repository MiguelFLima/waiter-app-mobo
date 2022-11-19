import { Button } from "../components/Button";
import { Categories } from "../components/Categories";
import { Header } from "../components/Header";
import Menu from "../components/Menu";
import TableModal from "../components/TableModal";
import * as C from "./styles";
import { useState } from "react";
import { Cart } from "../components/Cart";
import { CartItem } from "../types/cartItem";
import { products } from "../mocks/products";

function Main() {
  const [isTableModalVisible, setTableModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [cartItens, setCartItens] = useState<CartItem[]>([
    {
      quantity: 1,
      product: products[0],
    },
    {
      quantity: 2,
      product: products[1],
    },
  ]);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
    setTableModal(false);
  }

  function handleCancelOrder() {
    setSelectedTable("");
  }

  return (
    <>
      <C.Container>
        <Header
          handleCancelOrder={handleCancelOrder}
          selectedTable={selectedTable}
        />

        <C.CategoryContainer>
          <Categories />
        </C.CategoryContainer>
        <C.MenuContainer>
          <Menu></Menu>
        </C.MenuContainer>
      </C.Container>
      <C.Footer>
        <C.FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setTableModal(true)}>Novo Pedido</Button>
          )}

          {selectedTable && <Cart cartItens={cartItens} />}
        </C.FooterContainer>
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
