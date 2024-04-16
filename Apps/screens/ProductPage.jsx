import { View, Text, Image, ScrollView, Share } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import { Entypo } from "@expo/vector-icons";
import * as Sharing from 'expo-sharing';

const ProductPage = ({ navigation }) => {
  const { params } = useRoute();

  useEffect(()=>{
    shareButton()
  },[navigation,params])

  const shareButton = () => {
    navigation.setOptions({
      
      headerRight: () => <Entypo name="share" size={24} color="black"  onPress={()=>shareProduct()} style={{marginRight:20}} />,
    
    });
  };
  const shareProduct=async()=>{
    const content={
      message: params.item.title + "\n" + params.item.description
    }
    Share.share(content).then((resp) =>{
      console.log(resp)
    }).catch((error)=>{
      console.log(error)
    });
  }
  return (
    <ScrollView className="bg-white h-full">
      {/* <SafeAreaView className="bg-[#D0D0D0]">
            <View className="px-5 py-3">
          <Header />
        </View>
      </SafeAreaView> */}
      <View>
        <Text className="text-2xl font-bold mx-3 mt-3">
          {params.item.title}
        </Text>

        <View className="h-fit py-1 bg-white w-full object-contain rounded-lg mt-5 px-3">
          <Image
            source={{ uri: params.item.imageLink }}
            className="  object-contain h-[40vh] w-full  "
            resizeMode="contain"
          />
        </View>
        <View className="flex flex-row mx-3 mt-3 p-1 items-center">
          <Text className=" text-base">$</Text>
          <Text className="text-2xl font-medium pl-1">{params.item.price}</Text>
        </View>
        <View className="flex  pl-5 pr-2 mt-1 text-left items-left">
          <Text className=" text-base">{params.item.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductPage;
