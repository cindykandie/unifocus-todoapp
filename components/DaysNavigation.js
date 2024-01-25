import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import { Feather } from "@expo/vector-icons";

const DaysNavigation = ({ onDayPress, onPreviousWeekPress, selectedDate }) => {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const renderDays = () => {
    const startOfWeek = moment(selectedDate).startOf("week");

    return days.map((day, index) => {
      const currentDate = startOfWeek
        .clone()
        .add(index, "days")
        .format("YYYY-MM-DD");
      const formattedDate = startOfWeek.clone().add(index, "days").format("DD");
      const isCurrentDay =
        currentDate === moment(selectedDate).format("YYYY-MM-DD");

      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onDayPress(currentDate);
          }}
          className={`items-center p-2 ${
            isCurrentDay ? "bg-purple-600 rounded " : ""
          }`}
        >
          <View>
            <Text
              className={`text-purple-950 ${isCurrentDay ? "text-white" : ""}`}
            >
              {day}
            </Text>
            <Text
              className={`text-purple-950 ${isCurrentDay ? "text-white" : ""}`}
            >
              {formattedDate}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View className="flex-row justify-between py-2 px-4 bg-purple-300 rounded-b-md">
      <TouchableOpacity
        onPress={onPreviousWeekPress}
        className="items-center py-2 pr-1 absolute top-[-60]"
      >
        <View>
          <Text className="text-purple-800 px-2 pb-2 font-bold text-xs">
            {moment(selectedDate).format("MMMM")}{" "}
          </Text>
          <View className="flex-row items-center">
            <Feather name="chevron-left" size={20} color="purple" />
            <Text className="font-extrabold text-xs">Prev Week</Text>
          </View>
        </View>
      </TouchableOpacity>
      {renderDays()}
    </View>
  );
};

export default DaysNavigation;
