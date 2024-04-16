import { View, Text, TouchableOpacity,Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { app } from "../../firebaseConfig";
import { FlatList } from "react-native-gesture-handler";
import ListItem from "./ListItem";

const TopSelection = () => {
  const [AllItems, setAllItems] = useState([]);
  const db = getFirestore(app);
  const navigation = useNavigation();
  useEffect(() => {
    getAllItems();
  }, []);
  const getAllItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "UserPosts"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setAllItems(data);
      console.log(AllItems);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {AllItems && AllItems.length > 0 ? (
        <View className="px-2 m ">
          <FlatList
            data={AllItems}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductPage", {
                    item: item,
                  })
                }
                className="w-1/2 px-1 py-2"
              >
                <View className="flex flex-col border h-[31vh]  w-full border-slate-200 bg-white p-2 rounded-lg">
                  <Image
                    source={{ uri: item.imageLink }}
                    className="h-[20vh] w-full  rounded-lg "
                  />
                  <Text
                    className="text-base w-full pt-1 font-medium "
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text className="text-sm pt-1 font-normal	">
                  ₹ {item.price}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View className="flex "></View>
      )}
    </>
  );
};

export default TopSelection;
