import { View, Text, FlatList, Touchable, TouchableOpacity,Image ,ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { app } from "../../firebaseConfig";
import { collection, getDocs, where  , query} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useRoute , useNavigation } from "@react-navigation/native";
import ErrorScreen from "../components/Error/ErrorScreen";

const CategoryPage = () => {
    const navigation = useNavigation();
  const { params } = useRoute();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);

  useEffect( () => {
    console.log(params)
     getItemsByCategory()

  }, [params]);
  const getItemsByCategory = async () => {
    setLoading(true);

    try {
      const q = query(collection(db, "UserPosts"), where("category", "==", params.category));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => doc.data());
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
    {items && items.length > 0 ? 
    <View className="mx-3 mt-4 ">
    <FlatList
    data={items}
    numColumns={2}
    renderItem={({item,index})=>(
       <TouchableOpacity onPress={()=>navigation.navigate('ProductPage' ,{
        item : item
       })} className="w-1/2 px-1 ">
       <View className="flex flex-col border h-[31vh]  w-full border-slate-200 bg-white p-3 rounded-lg">
       <Image
                source={{ uri: item.imageLink }}
                className="h-[20vh] w-full  rounded-lg "
              /> 
              <Text className="text-base w-full pt-1 font-medium " numberOfLines={1}>{item.title}</Text>
              <Text className="text-sm pt-1 font-normal	">$ {item.price}</Text>
       </View>

       </TouchableOpacity>

    )}
    />
     </View> :<View className="flex h-full"><ErrorScreen message={"Data not Found"}/></View>}
     </>
  );
};

export default CategoryPage;
