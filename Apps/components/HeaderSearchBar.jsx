import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Fontisto } from "@expo/vector-icons";

const HeaderSearchBar = ({width}) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width }}>
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
        className="text-base ml-3 w-full h-full  "
      />
    </View>
  </View>
  )
}

export default HeaderSearchBar