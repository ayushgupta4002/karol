import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import LoginScreen from "./Apps/screens/LoginScreen";
import HomeScreen from "./Apps/screens/HomeScreen";
import NavigationScreen from "./Apps/navigation/NavigationScreen";
import { AuthProvider } from "./Apps/context/ContextAuth";


export default function App() {
  return (
    <AuthProvider>
      <View className="flex-1   ">
        <StatusBar style="auto" />
        <NavigationScreen/>
        {/* <LoginScreen></LoginScreen> */}
      </View>
      </AuthProvider>
  );
}
