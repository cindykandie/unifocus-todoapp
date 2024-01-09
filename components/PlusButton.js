import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Replace with your preferred icon library

const PlusButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Feather name="plus-circle" size={40} color="black" />
    </TouchableOpacity>
  );
};

export default PlusButton;
