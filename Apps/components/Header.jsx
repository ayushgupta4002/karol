import { View, Text, TextInput, Image,  } from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (
    <SafeAreaView className="bg-[#D0D0D0] ">
    <View className="px-5 py-3">
      <View className="flex flex-row justify-center justify-between items-center ">
        {/* <Image
          source={require("./../../assets/Karol.png")}
          className="h-[10vh] w-[15vw]  "
        /> */}
        <View className=" flex flex-row  items-center bg-white flex-1 p-2 mr-1 rounded-xl shadow-md	">
          <Fontisto
            name="search"
            size={18}
            color="black"
            style={{ paddingLeft: 4 }}
          />
          <TextInput
            placeholder="Search"
            className="text-base ml-3 w-full h-full "
          />
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
};


export default Header;
