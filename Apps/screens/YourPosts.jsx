import { View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { getFirestore , query , collection ,where,getDocs} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { useAuth } from "../context/ContextAuth";
import ErrorScreen from "../components/Error/ErrorScreen";
import ListItem from "../components/ListItem";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const YourPosts = () => {
  const navigation = useNavigation()
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const db = getFirestore(app);

  useEffect(() => {
    getYourPosts();
  }, []);
  const getYourPosts = async () => {
    setLoading(true);

    try {
      const q = query(
        collection(db, "UserPosts"),
        where("email", "==", user.userEmail)
      );
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => doc.data());
      console.log(items+" : items for your posts")
      setItems(items);
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
      {items && items.length > 0 ? (
        <View className="px-2 mt-4 ">
          <FlatList
            data={items}
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
                <ListItem item={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View className="flex h-full">
          <ErrorScreen message={"You Have not Posted Anything!"} />
        </View>
      )}
    </>
  );
};

export default YourPosts;
