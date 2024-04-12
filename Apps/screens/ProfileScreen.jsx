import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useAuth } from "../context/ContextAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const { user , onLogout} = useAuth();

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="pt-10 px-5 ">
        <Text className="text-2xl font-semibold">Hey ! {user?.userName} </Text>
        <Text className="py-2">We have been waiting for you !</Text>

        <View className="mx-auto mt-10">
          <Image
            source={require("./../../assets/placeholderImage.jpg")}
            className="h-[20vh] w-[39vw] my-3 mx-1 rounded-full"
          />
          <Text className="text-center text-base">{user?.userEmail}</Text>
        </View>
        <Pressable onPress={()=>onLogout()}>
        <View className="mx-auto bg-slate-100 mt-10  flex flex-row border border-slate-400 w-full p-4 rounded-xl items-center">
          <MaterialIcons name="logout" size={26} color="black" />
          <Text className="text-base font-medium"> Logout </Text>
        </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
