import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Replace with your preferred icon library

const PlusButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className=" bg-purple-500 rounded-full" > 
      <Feather name="plus-circle" size={54} color="#ffbe0b" />
      </View>
    </TouchableOpacity>
  );
};

export default PlusButton;
