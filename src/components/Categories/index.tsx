import { useState } from "react";
import { FlatList } from "react-native";
import { Category } from "../../types/category";
import { Text } from "../Text";
import * as C from "./styles";

interface CategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? "" : categoryId;
    onSelectCategory(category);
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
