import { View, Text, FlatList , Image } from "react-native";
import React from "react";

const Slider = ({ sliderImages }) => {
  return (
    <View>
      <FlatList data={sliderImages} 
      horizontal={true}
      showsHorizontalScrollIndicator={false}
         renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.url }} className="h-[200px] object-contain w-[300px] mr-2 rounded-sm" />
            </View>
          )}
      />
    </View>
  );
};

export default Slider;
