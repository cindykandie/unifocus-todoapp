import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const TaskItem = ({ emoji, time, task, isChecked, onToggle, onLongPress }) => {
  return (
    <View>
      <View
        className={`flex-row items-center justify-between p-4 rounded-xl bg-purple-400 my-2 mx-3 border-solid border-2 border-pink-400 ${
          isChecked ? "line-through" : ""
        }`}
      >
        <Text className="text-3xl">{emoji}</Text>
        <TouchableOpacity onPress={onLongPress} style={{ flex: 1 }}>
          <Text className="mb-2 text-xs text-center">
           {time}
          </Text>
          <Text
            numberOfLines={5}
            ellipsizeMode="tail"
            className={`text-xl text-center mx-2 ${isChecked ? "line-through" : ""}`}
          >
            {task}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onToggle} className="rounded-full">
          {isChecked ? (
            <Feather name="check-circle" size={32} color="lightgreen" />
          ) : (
            <Feather name="circle" size={32} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskItem;
