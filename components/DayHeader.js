import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import moment from 'moment'; // For handling dates

const DayHeader = ({ currentDate, onTodayPress }) => {
  const today = moment().format('dddd');
  const yesterday = moment().subtract(1, 'days').format('dddd');

  let displayText;
  if (moment(currentDate).isSame(moment(), 'day')) {
    displayText = 'Today';
  } else if (moment(currentDate).isSame(moment().subtract(1, 'days'), 'day')) {
    displayText = 'Yesterday';
  } else if (moment(currentDate).isSame(moment().add(1, 'days'), 'day')) {
    displayText = 'Tomorrow';
  } else {
    displayText = moment(currentDate).format('dddd');
  }

  return (
    <View className="flex-row items-center justify-between py-4 px-6 pr-0 bg-purple-200">
      <Text className='ml-20 font-extrabold text-lg'>{displayText}</Text>
      <TouchableOpacity onPress={onTodayPress} className='flex-row gap-2 bg-purple-300 rounded- justify-center pb-2 px-2'>
        <Text className='text-xs'>Today</Text>
        <Feather name="chevron-right" size={14} color="purple" />
      </TouchableOpacity>
    </View>
  );
};

export default DayHeader;
