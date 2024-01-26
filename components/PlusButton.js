import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const PlusButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className=" bg-purple-500 rounded-full" > 
      <Feather name="plus-circle" size={54} color="#ffd60a" />
      </View>
    </TouchableOpacity>
  );
};

export default PlusButton;
