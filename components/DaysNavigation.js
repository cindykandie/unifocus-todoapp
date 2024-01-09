// DaysNavigation.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment'; // For handling dates

const DaysNavigation = ({ onDayPress }) => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const today = moment().format('YYYY-MM-DD');

  const renderDays = () => {
    return days.map((day, index) => {
      const currentDate = moment().startOf('week').add(index, 'days').format('YYYY-MM-DD');
      const formattedDate = moment().startOf('week').add(index, 'days').format('DD');

      return (
        <TouchableOpacity key={day} onPress={() => onDayPress(currentDate)}>
          <View className="items-center">
            <Text>{day}</Text>
            <Text>{formattedDate}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View className="flex-row justify-between py-4 px-6 bg-gray-300">
      {renderDays()}
    </View>
  );
};

export default DaysNavigation;
