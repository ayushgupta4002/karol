import { View, Text, TextInput, Image, Dimensions,  } from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderSearchBar from "./HeaderSearchBar";

const Header = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView className="bg-[#D0D0D0] ">
    <View className="px-5 py-3 items-center">
      <HeaderSearchBar width={screenWidth-50}></HeaderSearchBar>
    </View>
    </SafeAreaView>
  );
};


export default Header;
