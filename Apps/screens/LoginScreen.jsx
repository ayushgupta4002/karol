import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";



const LoginScreen = () => {

  return (
    <View className="flex-1 bg-red flex-col ">
    <View className="my-auto">
      <View className="justify-center  items-center">
        <Image
          source={require("./../../assets/Karol.png")}
          className="h-[35vh] w-[50vw]"
        />
      </View>
      <View className="bg-blue-500 p-3 m-5 rounded-3xl w-[80%]	mx-auto">
        <TouchableOpacity onPress={()=> console.log("login")} className="">
          <Text className="text-white text-lg text-center font-medium">Get started</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default LoginScreen;
