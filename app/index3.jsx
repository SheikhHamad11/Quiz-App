import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { quizes } from "../components/Quiz";
import Questions from "./Questions";
const { width, height } = Dimensions.get("window");

export default function index() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [questions, setQuestions] = useState(quizes);
  const [modalVisible, setModalVisible] = useState(false);
  const listRef = useRef();

  const onSelectedOption = (x, index) => {
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

  const reset = (x, index) => {
    const tempData = questions;
    tempData.map((item, ind) => {
      item.marked = x;
    });

    let temp = [];
    tempData.map((item) => {
      temp.push(item);
    });
    setQuestions(temp);
  };

  const getTextScore = () => {
    let score = 0;
    quizes.map((item) => {
      if (item.marked !== -1) {
        score = score + 5;
      }
      return score;
    });
  };
  return (
    <View className="flex-1 bg-amber-500 ">
      <View className="mt-10">
        <Text className="text-3xl text-center font-extrabold">
          English Questions : {currentIndex} /{quizes.length}{" "}
        </Text>
        {console.warn(currentIndex)}
        <TouchableOpacity
          className="bg-gray-500 w-20 h-10 items-center justify-center mx-auto"
          onPress={() => {
            reset();
            listRef.current.scrollToIndex({ animated: true, index: 0 });
          }}
        >
          <Text className="text-white">Reset</Text>
        </TouchableOpacity>

        <FlatList
          ref={listRef}
          horizontal
          scrollEnabled={false}
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x / width;
            setCurrentIndex((x + 1).toFixed(0));
          }}
          showsHorizontalScrollIndicator={false}
          data={questions}
          renderItem={({ item, index }) => {
            return (
              <Questions
                data={item}
                index={index}
                selectedOption={(x) => onSelectedOption(x, index)}
              />
            );
          }}
        />
        <View className="flex flex-row justify-between mx-2 mt-10">
          {currentIndex > 1 ? (
            <TouchableOpacity
              onPress={() =>
                listRef.current.scrollToIndex({
                  animated: true,
                  index: currentIndex - 2,
                })
              }
              className="bg-gray-100 w-20 h-20 text-center items-center justify-center "
            >
              <Text className="font-bold text-md"> {"<"}Previous</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled
              className="bg-gray-400 w-20 h-20 text-center items-center justify-center"
            >
              <Text className="font-bold text-md"> {"<"}Previous</Text>
            </TouchableOpacity>
          )}

          {currentIndex == 10 ? (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              className="bg-green-300 w-20 h-20 text-center items-center justify-center"
            >
              <Text className="font-bold text-md"> Submit{">"}</Text>
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
              className="bg-gray-100 w-20 h-20 text-center items-center justify-center"
            >
              <Text className="font-bold text-md"> Next{">"}</Text>
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
    </View>
  );
}
