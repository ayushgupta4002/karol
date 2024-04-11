import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CategoryPage from "../screens/CategoryPage";
import ProductPage from "../screens/ProductPage";
import Header from "../components/Header";

const Stack = createStackNavigator();

const HomeScreenNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="CategoryPage" component={CategoryPage} options={({route})=>({
        title:route.params.category,
        headerStyle:{
            backgroundColor:"#D0D0D0"
        },
        // headerTintColor:"#ffffff"
      })} />
      <Stack.Screen name="ProductPage" component={ProductPage} options={({route})=>({
        header:Header,
        // headerTintColor:"#ffffff"
      })} />
    </Stack.Navigator>
  );
};

export default HomeScreenNavigation;
