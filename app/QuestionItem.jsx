import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
const { width, height } = Dimensions.get("window");
export default function QuestionItem({ data, index, selectedOption }) {
  return (
    <View style={{ width: width }}>
      <Text className="text-2xl font-extrabold  mx-2 text-gray-800 mt-10">
        Question# {index + 1} {": " + data?.question}
      </Text>
      <FlatList
        pagingEnabled
        data={data?.options}
        className="mt-5"
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                elevation: 3,
                width: "90%",
                height: 60,
                alignSelf: "center",
                backgroundColor: data.marked == index + 1 ? "#600971" : "white",
                marginVertical: 10,
                justifyContent: "center",
                paddingLeft: 15,
              }}
              onPress={() => {
                selectedOption(index + 1);
              }}
            >
              <View className="flex  flex-row">
                <View className="rounded-full bg-sky-600 p-2 w-10 text-center justify-center items-center">
                  <Text className=" text-white font-bold text-md">{index==0?'A':index==1?'B':index==2?'C':'D'}</Text>
                </View>
                <Text
                  style={{
                    color: data.marked == index + 1 ? "white" : "black",
                  }}
                  className='ml-2 my-1 font-semibold text-xl'
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
