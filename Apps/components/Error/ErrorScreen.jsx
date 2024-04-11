import { View, Text ,Image } from 'react-native'
import React from 'react'

const ErrorScreen = ({message}) => {
  return (
    <View className="flex-1  h-full flex-col ">
    <View className="my-auto">
      <View className="justify-center  items-center">
        <Image
          source={require("./../../../assets/raccoon.png")}
          className="h-[30vh] w-[70vw]"
        />
      </View>
          <Text className="text-black text-lg text-center font-medium">{message}</Text>
      
      </View>
    </View>
  )
}

export default ErrorScreen