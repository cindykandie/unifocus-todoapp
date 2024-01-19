import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text } from 'react-native';

const TaskAdditionModal = ({ visible, onClose, onAddTask }) => {
  const [time, setTime] = useState('');
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    // Set "All Day" if the time is empty
    const formattedTime = time.trim() !== '' ? time : 'All Day';

    if (task.trim() !== '') {
      onAddTask({ time: formattedTime, task });
      setTime('');
      setTask('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <TextInput
          placeholder="Time"
          value={time}
          onChangeText={(text) => setTime(text)}
          className="bg-white p-2 mb-4 w-full text-xl rounded"
        />
        <TextInput
          placeholder="Task"
          value={task}
          onChangeText={(text) => setTask(text)}
          className="bg-white p-2 mb-4 w-full text-xl rounded"
        />
        <TouchableOpacity onPress={handleAddTask} className="bg-blue-500 p-3 rounded">
          <Text className="text-white text-xl text-center">Add Task</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} className="mt-4">
          <Text className="text-gray-600 text-xl text-center">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default TaskAdditionModal;
