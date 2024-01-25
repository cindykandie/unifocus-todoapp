import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

const DaysNavigation = ({ navigation, onDayPress, selectedDate }) => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const renderDays = () => {
    return days.map((day, index) => {
      const currentDate = moment().startOf('week').add(index, 'days').format('YYYY-MM-DD');
      const formattedDate = moment().startOf('week').add(index, 'days').format('DD');
      const isCurrentDay = currentDate === moment(selectedDate).format('YYYY-MM-DD');

      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onDayPress(currentDate);
          }}
          className={`items-center p-2 ${isCurrentDay ? 'bg-purple-600 rounded' : ''}`}
        >
          <View>
            <Text className={`text-purple-950 ${isCurrentDay ? 'text-white' : ''}`}>{day}</Text>
            <Text className={`text-purple-950 ${isCurrentDay ? 'text-white' : ''}`}>{formattedDate}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View className="flex-row justify-between py-2 px-4 bg-purple-300 rounded-b-md">
      {renderDays()}
    </View>
  );
};

export default DaysNavigation;
