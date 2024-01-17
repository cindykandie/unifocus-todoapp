// MainScreen.js

import React, { useState } from 'react';
import { View } from 'react-native';
import DayHeader from '../components/DayHeader';
import DaysNavigation from '../components/DaysNavigation';
import TaskItem from '../components/TaskItem';
import PlusButton from '../components/PlusButton';
import TaskAdditionModal from '../components/TaskAddModal';

const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, emoji: '📅', time: '10:00 AM', task: 'Meeting', isChecked: false }]);

  const handleToggle = (taskId) => {
    // Implement toggle functionality based on task id
  };

  const handleDayPress = (selectedDate) => {
    // Implement navigation to the selected day's to-do list
    console.log('Selected Date:', selectedDate);
  };

  const handlePlusButtonPress = () => {
    setIsModalVisible(true);
  };

  const handleAddTask = ({ time, task }) => {
    if (task.trim() !== '') {
      const newTask = { id: tasks.length + 1, emoji: '📆', time, task, isChecked: false };
      setTasks([...tasks, newTask]);
      setIsModalVisible(false);
    }
  };

  const renderTasks = () => {
    return tasks.map((task) => (
      <TaskItem
        key={task.id}
        emoji={task.emoji}
        time={task.time}
        task={task.task}
        isChecked={task.isChecked}
        onToggle={() => handleToggle(task.id)}
      />
    ));
  };

  return (
    <View className="flex-1 bg-gray-100 pb-4">
      <DayHeader currentDate={new Date()} />
      <DaysNavigation onDayPress={handleDayPress} />

      <View className="flex-1">
        {renderTasks()}
      </View>

      <View className="flex items-end justify-center m-5 p-4">
        <PlusButton onPress={handlePlusButtonPress} />
      </View>

      <TaskAdditionModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddTask={handleAddTask}
      />
    </View>
  );
};

export default MainScreen;
