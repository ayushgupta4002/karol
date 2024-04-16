import {
  View,
  Text,
  Image,
  ScrollView,
  Share,
  Pressable,
  Button,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import { Entypo } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import { useAuth } from "../context/ContextAuth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";

const ProductPage = ({ navigation }) => {
  const { params } = useRoute();
  const { user } = useAuth();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const db = getFirestore(app);

  useEffect(() => {
    shareButton();
  }, [navigation, params]);

  const PurchaseProduct = async (price) => {
    await axios
      .post("https://2aee-49-36-176-184.ngrok-free.app/payment/intent" ,{price : price})
      .then(async(response) => {
        const data = response.data;
        console.log(data)

        const initResponse = await initPaymentSheet({
          merchantDisplayName:"merchant.com.Karol.Karol",
          paymentIntentClientSecret:data.paymentIntent,
         
        })
        if(initResponse.error){
          console.log(initResponse.error);
          Alert.alert('Oops! Something went wrong !')
          return;
        }
        console.log(initResponse)

        await presentPaymentSheet().then((response)=>{
          console.log(response);
          if(response.error){
            Alert.alert("Payment Failed" , "Oops Payment Failed, please try again later !")
          }
       
        }).catch((error)=>{
          console.log(error)
          Alert.alert("Payment Failed")
        });

      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Oops! Something went wrong !')
        return;
      });
  };

  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <Entypo
          name="share"
          size={24}
          color="black"
          onPress={() => shareProduct()}
          style={{ marginRight: 20 }}
        />
      ),
    });
  };
  const shareProduct = async () => {
    const content = {
      message: params.item.title + "\n" + params.item.description,
    };
    Share.share(content)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ScrollView className="bg-white h-full">
      {/* <SafeAreaView className="bg-[#D0D0D0]">
            <View className="px-5 py-3">
          <Header />
        </View>
      </SafeAreaView> */}
      <View>
        <View className="flex flex-row ">
          <Text className="text-2xl font-bold ml-3 mt-3">
            {params.item.title}
          </Text>
          {params.item.email == user.userEmail ? (
            <View className="px-4 mr-1 w-[27%]">
              <Pressable
                onPress={async () => {
                  const q = query(
                    collection(db, "Users"),
                    where("email", "==", params.item.email)
                  );
                  const querySnapshot = await getDocs(q);
                }}
              >
                <View className="mx-auto bg-red-500  mt-3  flex flex-row w-full p-2 rounded-xl items-center">
                  <Text className="text-sm78 font-medium text-white">
                    {" "}
                    Delete{" "}
                  </Text>
                </View>
              </Pressable>
            </View>
          ) : (
            <></>
          )}
        </View>
        <View className="h-fit py-1 bg-white w-full object-contain rounded-lg mt-5 px-3">
          <Image
            source={{ uri: params.item.imageLink }}
            className="  object-contain h-[40vh] w-full  "
            resizeMode="contain"
          />
        </View>
        <View className="flex flex-row mx-3 mt-3 p-1 items-center">
          <Text className=" text-base">₹</Text>
          <Text className="text-2xl font-medium pl-1">{params.item.price}</Text>
        </View>
        <View className="flex  pl-5 pr-2 mt-1 text-left items-left">
          <Text className=" text-base">{params.item.description}</Text>
        </View>
      </View>
      <View className="mx-10 my-5">
        <Button onPress={()=>{
          PurchaseProduct(params.item.price)
        }} title="Buy" />
      </View>
    </ScrollView>
  );
};

export default ProductPage;
