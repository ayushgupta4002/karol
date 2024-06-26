import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import ListItem from "../components/ListItem";

const ExploreScreen = () => {
  const [AllItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);
  const navigation = useNavigation();

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "UserPosts"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setAllItems(data);
      console.log(AllItems);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      {AllItems && AllItems.length > 0 ? (
        <View className="px-2 mt-4 ">
          <FlatList
            data={AllItems}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductPage", {
                    item: item,
                  })
                }
                className="w-full  mx-auto my-1"
              >
           <ListItem item={item}/>
              </TouchableOpacity>
            )}
          />
      
        </View>
       
      ) : (
        <View className="flex h-full">
          <ErrorScreen message={"Data no available"} />
        </View>
      )}
    </>
  );
};

export default ExploreScreen;
