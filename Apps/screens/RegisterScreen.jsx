import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
const RegisterScreen = () => {
  const navigation = useNavigation();

  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [userName , setUserName] = useState();

  return (
    <View className="flex-1 bg-red flex-col ">
      <View className="my-auto">
        <View className="justify-center  items-center">
          <Image
            source={require("./../../assets/Karol.png")}
            className="h-[35vh] w-[50vw]"
          />
        </View>
        <View className=" p-3 m-1 rounded-3xl w-[80%]	mx-auto">

        <TextInput
            placeholder="userName"
            className="p-3 border border-black rounded-xl my-2"
            value={Email}
            onChangeText={(text) => setUserName(text)}
          />

          <TextInput
            placeholder="Email"
            className="p-3 border border-black rounded-xl my-2"
            value={Email}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            className="p-3 border border-black rounded-xl my-2 mb-5"
            value={Password}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity
            onPress={() => console.log("login")}
            className=" bg-sky-800 p-3 m-1 rounded-xl w-[100%]	mx-auto "
          >
            <Text className="text-white text-lg text-center font-medium">
              Login
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center mx-auto my-3">
            <Text className="text-center">Not a member ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text className="text-center text-sky-900 font-semibold">
                {" "}
                Register here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
