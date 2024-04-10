import { View, Text, TextInput, Button, Image , Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { app } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
const AddPostScreen = () => {
  const [categoryList, setCategotyList] = useState([]);
  const [price, setprice] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  const db = getFirestore(app);

  useEffect(() => {
    getCategories();
  }, []);

  const submit=async()=>{
    console.log("title : "+ title);
    console.log("description : " + description)
    console.log("price : " + price)
    console.log("category : " + selectedCategory)
    await depopulate();
  }
  const depopulate=()=>{
    setprice("");
    setDescription("");
    setTitle("");
    setSelectedCategory("");
  }

  const getCategories = async () => {
    setCategotyList([]);
    const querySnapshot = await getDocs(collection(db, "category"));
    querySnapshot.forEach((doc) => {
      console.log(" Docs ", doc.data());
      setCategotyList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  return (
    <ScrollView>
    <View className="p-8 mt-[10%]">
      <Text className="text-3xl font-semibold">Add Post</Text>
      <Text className="text-base mb-3 ">
        Add a new post and start selling !
      </Text>
      <Image
        source={require("./../../assets/placeholderImage.jpg")}
        className="h-[15vh] w-[30vw] my-3 mx-1"
      />
      <TextInput
        placeholder="Title"
        className="p-3 border border-black rounded-xl my-2"
        value={title}
        onChangeText={(text) => setTitle(text)}

      />
      <TextInput
        placeholder="Description"
        style={{
          textAlignVertical: "top",
        }}
        value={description}
        onChangeText={(text) => setDescription(text)}
        className=" pb-14 pt-3 pl-3 border border-black rounded-xl  my-2"
      />
      <View className="p-3 border border-black rounded-xl flex-row flex items-center  my-2">
        <Text className="pr-2">$</Text>
        <TextInput
          placeholder="Price"
          className="w-full pr-2"
          value={price}
          onChangeText={(text) => setprice(text)}
        />
      </View>
      <Picker 
      className="border border-black"
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
      >
        {categoryList.map((item, index) => (
          <Picker.Item label={item.name} value={item.name} key={index} />
        ))}
      </Picker>
      <Pressable className="bg-[#36454F]  rounded-3xl mt-4" onPress={submit}>
        <Text className="text-white text-center font-semibold p-3 ">Submit</Text>
      </Pressable>
    </View>
    </ScrollView>
  );
};

export default AddPostScreen;
