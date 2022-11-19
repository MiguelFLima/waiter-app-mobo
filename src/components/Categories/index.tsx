import { categories } from "../../mocks/categories";
import { Text } from "../Text";
import * as C from "./styles";
import { useState } from "react";
import { FlatList } from "react-native";

export function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("");

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? "" : categoryId;
    setSelectedCategory(category);
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingRight: 24 }}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={categories}
      keyExtractor={(category) => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;
        return (
          <C.Category onPress={() => handleSelectCategory(category._id)}>
            <C.Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
            </C.Icon>

            <Text opacity={isSelected ? 1 : 0.5} size={14} weight="500">
              {category.name}
            </Text>
          </C.Category>
        );
      }}
    />
  );
}

//   categories.map((category) => (
// <C.Category key={category._id}>
//   <C.Icon>
//     <Text>{category.icon}</Text>
//   </C.Icon>

//   <Text size={14} weight="600">
//     {category.name}
//   </Text>
// </C.Category>
//   ));
// }
