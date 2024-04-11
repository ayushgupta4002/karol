import { View, Text, FlatList, Image, TouchableWithoutFeedback  } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const Categories = ({ categories }) => {
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback  className="w-fit " onPress={() => navigation.navigate("CategoryPage",{
            category : item.name
          })}>
            <View className="my-1">
              <Image
                source={{ uri: item.icon }}
                className="h-[8vh]   w-[17vw] mx-3 rounded-full"
              />
              <Text className="text-center text-sm font-semibold p-1">
                {item.name}
              </Text>
            </View>
            </TouchableWithoutFeedback>    
                )}
      />
    </View>
  );
};

export default Categories;
