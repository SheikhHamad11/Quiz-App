import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
const { width, height } = Dimensions.get("window");
export default function Questions({ data, index,selectedOption }) {
  return (
    <View className="mx-3 mt-10" style={{ width: width }}>
      <Text className="text-black text-2xl font-bold">
        Question::{index + 1}
        {"-"}
        {data.question}
      </Text>
      <FlatList
      scrollEnabled={false}
        pagingEnabled
        data={data.options}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
            onPress={()=>selectedOption(index+1)}
              style={{
                backgroundColor: data.marked == index+1? "skyblue" : "white",
              }}
              className="my-2 py-2 w-[90%] h-[60px] self-center items-center mr-5 flex flex-row"
            >
              <View className="bg-black p-2 ml-2">
                <Text className="text-white ">
                  {index == 0 ? "A" : index == 1 ? "B" : index == 2 ? "C" : "D"}
                </Text>
              </View>

              <Text className="ml-2">{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
