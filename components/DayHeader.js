// DayHeader.js

import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment'; // For handling dates

const DayHeader = ({ currentDate }) => {
  const today = moment().format('dddd');
  const yesterday = moment().subtract(1, 'days').format('dddd');

  let displayText;
  if (moment(currentDate).isSame(moment(), 'day')) {
    displayText = 'Today';
  } else if (moment(currentDate).isSame(moment().subtract(1, 'days'), 'day')) {
    displayText = 'Yesterday';
  } else {
    displayText = moment(currentDate).format('dddd');
  }

  return (
    <View className="flex-row items-center justify-center py-4 px-6 bg-purple-200">
      <Text>{displayText}</Text>
      {/* Button for navigating to Today */}
      {/* Add onPress action to navigate to Today's list */}
    </View>
  );
};

export default DayHeader;
