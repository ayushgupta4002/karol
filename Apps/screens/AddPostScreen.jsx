import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Pressable,
  Vibration,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { app } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

const AddPostScreen = () => {
  const [categoryList, setCategotyList] = useState([]);
  const [price, setprice] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    Vibration.vibrate(40)

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const db = getFirestore(app);

  useEffect(() => {
    getCategories();
  }, []);

  const submit = async () => {
    Vibration.vibrate(80)
    console.log("title : " + title);
    console.log("description : " + description);
    console.log("price : " + price);
    console.log("category : " + selectedCategory);
    const resp= await fetch(image);
    const blob = await resp.blob();

    const storageRef = ref(storage, 'karolPosts/'+Date.now()+'.jpg');

    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

     depopulate();
  };
  const depopulate = () => {
    setprice("");
    setDescription("");
    setTitle("");
    setSelectedCategory("");
    setImage(null);
  };

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
        <Pressable onPress={pickImage} >
        {image?  <Image source={{ uri: image }} className="h-[15vh] w-[30vw] my-3 mx-1 rounded-xl" /> :   <Image
          source={require("./../../assets/placeholderImage.jpg")}
          className="h-[15vh] w-[30vw] my-3 mx-1 rounded-xl"
        /> }
      
        </Pressable>
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
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }
        >
          {categoryList.map((item, index) => (
            <Picker.Item label={item.name} value={item.name} key={index} />
          ))}
        </Picker>
        <Pressable className="bg-[#36454F]  rounded-3xl mt-4" onPress={submit}>
          <Text className="text-white text-center font-semibold p-3 ">
            Submit
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddPostScreen;
