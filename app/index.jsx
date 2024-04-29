import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useRef, useState } from "react";
import { quizes } from "../components/Quiz";
import QuestionItem from "./QuestionItem";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");
export default function index() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [questions, setQuestions] = useState(quizes);
  const [modalVisible, setModalVisible] = useState(false);
  const listRef = useRef();
  const onSelectOption = (index, x) => {
    const tempData = questions;
    tempData.map((item, ind) => {
      if (index == ind) {
        if (item.marked !== -1) {
          item.marked = -1;
        } else {
          item.marked = x;
        }
      }
    });
    let temp = [];
    tempData.map((item) => {
      temp.push(item);
    });
    setQuestions(temp);
  };

  const reset = () => {
    const tempData = questions;
    tempData.map((item, ind) => {
      item.marked = -1;
    });
    let temp = [];
    tempData.map((item) => {
      temp.push(item);
    });
    setQuestions(temp);
  };

  const getTextScore = () => {
    let marks = 0;
    quizes.map((item) => {
      if (item.marked !== -1) {
        marks = marks + 5;
      }
    });
    return marks;
  };
  return (
    <SafeAreaView className="flex-1 bg-slate-500">
      <StatusBar style="dark" />
      <View className="flex flex-row justify-between items-center mx-2 mt-10">
        <Text className="mt-2 ml-4  font-bold text-black text-xl ">
          English Questions:{"" + currentIndex + "/" + quizes.length}
        </Text>
        <Text
          className="mr-2 text-white p-2 rounded-sm mt-2 bg-purple-800 "
          onPress={() => {
            reset();
            listRef.current.scrollToIndex({ animated: true, index: 0 });
          }}
        >
          Reset
        </Text>
      </View>

      <View>
        <FlatList
          ref={listRef}
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x / width;
            setCurrentIndex((x + 1).toFixed(0));
          }}
          data={questions}
          renderItem={({ item, index }) => {
            return (
              <QuestionItem
                data={item}
                index={index}
                selectedOption={(x) => {
                  onSelectOption(index, x);
                }}
              />
            );
          }}
        />
        <View className="flex justify-between flex-row mt-20">
          {currentIndex > 1 ? (
            <TouchableOpacity
              onPress={() => {
                if (currentIndex > 1) {
                  listRef.current.scrollToIndex({
                    animated: true,
                    index: currentIndex - 2,
                  });
                }
              }}
              className="bg-purple-800 h-16 w-28 text-white justify-center rounded-lg ml-3"
            >
              <Text className="text-white text-center text-lg ">Previous</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled
              onPress={() => {
                if (currentIndex > 1) {
                  listRef.current.scrollToIndex({
                    animated: true,
                    index: currentIndex - 2,
                  });
                }
              }}
              className="bg-gray-600 h-16 w-28 text-white justify-center rounded-lg ml-3"
            >
              <Text className="text-white text-center text-lg ">Previous</Text>
            </TouchableOpacity>
          )}

          {currentIndex == 10 ? (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              className="bg-green-600 h-16 w-28 text-white justify-center rounded-lg mr-3"
            >
              <Text className="text-white text-center text-lg ">Submit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (questions[currentIndex - 1].marked !== -1) {
                  if (currentIndex < questions.length) {
                    listRef.current.scrollToIndex({
                      animated: true,
                      index: currentIndex,
                    });
                  }
                } else {
                  Alert.alert("Warning", "Please Select One");
                }
              }}
              className="bg-purple-800 h-16 w-28 text-white justify-center rounded-lg mr-3"
            >
              <Text className="text-white text-center text-lg ">Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View style={{ backgroundColor: "#fff", width: "90%", padding: 20 }}>
            <Text className="text-center text-4xl font-extrabold  ">
              Quiz Score
            </Text>
            <Text className="text-center text-4xl text-green-700 font-extrabold">
              {getTextScore()}
            </Text>
            <TouchableOpacity
              className="bg-gray-700 my-4 p-2 w-20 rounded-sm items-center self-center"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text className="text-white ">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
