import { View, Text ,Image } from 'react-native'
import React from 'react'

const ListItem = ({item}) => {
    console.log(item+"list")
  return (
    <View className="flex flex-row border h-fit  border-slate-200 bg-white p-2 rounded-lg">
    <Image
      source={{ uri: item.imageLink }}
      className="h-[20vh]  aspect-square	  rounded-lg "
    />
    <View className=" flex flex-col  w-[50vw] ml-4 mr-3">
      <Text
        className="text-lg pt-1 pr-2 mr-2 font-medium "
        numberOfLines={2}
      >
        {item.title}
      </Text>
      <Text className="text-sm pt-1 font-normal	">
        $ {item.price}
      </Text>
      <Text className="text-sm pt-3 font-normal	pr-3 " numberOfLines={2}>
        $ {item.description}
      </Text>
    </View>
    </View>
  )
}

export default ListItem