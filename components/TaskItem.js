
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Replace with your preferred icon library

const TaskItem = ({ emoji, time, task, isChecked, onToggle }) => {
  return (
    <View className="flex-row items-center">
      <Text>{emoji}</Text>
      <Text>{time}</Text>
      <TouchableOpacity onPress={onToggle}>
        {isChecked ? (
          <Feather name="check-square" size={24} color="black" />
        ) : (
          <Feather name="square" size={24} color="black" />
        )}
      </TouchableOpacity>
      <Text>{task}</Text>
    </View>
  );
};

export default TaskItem;
