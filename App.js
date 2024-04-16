import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import LoginScreen from "./Apps/screens/LoginScreen";
import HomeScreen from "./Apps/screens/HomeScreen";
import NavigationScreen from "./Apps/navigation/NavigationScreen";
import { AuthProvider } from "./Apps/context/ContextAuth";
import { StripeProvider } from '@stripe/stripe-react-native';


export default function App() {
  return (
    <AuthProvider>
    <StripeProvider publishableKey="">
      <View className="flex-1   ">
        <StatusBar style="auto" />
        <NavigationScreen/>
        {/* <LoginScreen></LoginScreen> */}
      </View>
      </StripeProvider>
      </AuthProvider>
  );
}
