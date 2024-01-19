import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
const TaskItem = ({ emoji, time, task, isChecked, onToggle }) => {
  return (
    <View onPress={onToggle}>
      <View className={`flex-row items-center justify-between p-6 rounded-xl bg-purple-400 m-2 mx-4 border-solid border-2 border-pink-400 bord ${isChecked ? 'line-through' : ''}`}>
        <Text className='text-3xl'>{emoji}</Text>
        <View>
          <Text className='text-md'>{time}</Text>
          <Text className={`text-xl ${isChecked ? 'line-through' : ''}`}>{task}</Text>
        </View>
        <TouchableOpacity onPress={onToggle} className='rounded-full'>
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
