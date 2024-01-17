
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Replace with your preferred icon library

const TaskItem = ({ emoji, time, task, isChecked, onToggle }) => {
  return (
    <View className="flex-row items-center justify-between p-6 rounded-xl bg-purple-400 m-2 mx-4 border-solid border-2 border-pink-400 bord">
      <Text className='text-3xl'>{emoji}</Text>
      <View>
        <Text className='text-md'>{time}</Text>
        <Text className='text-xl'>{task}</Text>
      </View>
      
      <TouchableOpacity onPress={onToggle} className='rounded-full'>
        {isChecked ? (
          <Feather name="check-square" size={30} color="black" />
        ) : (
          <Feather name="circle" size={30} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
