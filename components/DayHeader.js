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
    <View className="flex-row items-center justify-between mt-8 py-4 px-6 pr-0 bg-purple-200">
      <Text className='ml-[35%] font-extrabold text-2xl text-purple-950'>{displayText}</Text>
      {displayText !== 'Today' && (
        <TouchableOpacity onPress={onTodayPress} className='flex-row gap-2 bg-purple-300 rounded- justify-center pb-2 px-1 rounded-bl-md rounded-tl-md border-gray-200 border-2 border-r-0'>
          <Text className='text-xs text-purple-700'>Today</Text>
          <Feather name="chevron-right" size={15} color="purple" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DayHeader;
