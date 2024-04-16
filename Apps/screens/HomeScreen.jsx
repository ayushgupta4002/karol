import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "../components/Slider";
import { app } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import TopSelection from "../components/TopSelection";
import Categories from "../components/Categories";

const HomeScreen = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [categoryList, setCategotyList] = useState([]);

  useEffect(() => {
    getSliderImages();
    getCategories();
  }, []);

  const db = getFirestore(app);
  const getSliderImages = async () => {
    const querySnapshot = await getDocs(collection(db, "sliderImages"));
    const images = querySnapshot.docs.map((doc) => doc.data());
    setSliderImages(images);
  };

  const getCategories = async () => {
    setCategotyList([]);
    const querySnapshot = await getDocs(collection(db, "category"));
    querySnapshot.forEach((doc) => {
      // console.log(" Docs ", doc.data());
      setCategotyList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  return (
    <View>
    <View>
      
          <Header />

      <View className="px-2 mt-4 ">
        {sliderImages.length > 0 ? (
          <Slider sliderImages={sliderImages} />
        ) : (
          <View>
            <ActivityIndicator></ActivityIndicator>
          </View>
        )}
      </View>

      <View className=" mt-4  bg-white h-[30vh] ">
        {/* <Text className="text-xl font-semibold my-3">Top Selection</Text> */}
        <View className="my-3 items-center">
          <Categories categories={categoryList} />
        </View>
      </View>
      <View className="px-3 mt-4  bg-white h-[30vh]">
        <Text className="text-xl font-semibold my-3">Top Selections</Text>
        <View className="my-3 items-center">
          
        </View>
      </View>
    </View>
    </View>
    
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D0D0D0",
  },
});

export default HomeScreen;
