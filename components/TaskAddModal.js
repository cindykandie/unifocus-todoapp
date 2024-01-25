import React, { useState } from "react";
import { Modal, View, TextInput, TouchableOpacity, Text } from "react-native";

const TaskAdditionModal = ({ visible, onClose, onAddTask, selectedDate }) => {
  const [time, setTime] = useState("");
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    // Set "All Day" if the time is empty
    const formattedTime = time.trim() !== "" ? time : "All Day";

    if (task.trim() !== "") {
      onAddTask({ time: formattedTime, task, date: selectedDate });
      setTime("");
      setTask("");
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 justify-center items-center bg-purple-200  p-4 border-solid border-8 border-yellow-200 rounded-xl">
        <TextInput
          placeholder="Time"
          value={time}
          onChangeText={(text) => setTime(text)}
          className="border-solid border-[1px] border-purple-800 bg-white p-2 mb-4 w-full text-xl rounded"
        />
        <TextInput
          placeholder="Task"
          value={task}
          onChangeText={(text) => setTask(text)}
          className="border-solid border-[1px] border-purple-800 bg-white p-2 mb-4 w-full text-xl rounded"
        />
        <TouchableOpacity
          onPress={handleAddTask}
          className="bg-purple-600 p-2 rounded-lg w-40"
        >
          <Text className="text-white text-xl text-center">Add Task</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} className="mt-4">
          <Text className="bg-yellow-300 p-2 rounded-lg text-xl text-center w-16">
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default TaskAdditionModal;
