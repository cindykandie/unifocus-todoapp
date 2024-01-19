import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import DayHeader from "../components/DayHeader";
import DaysNavigation from "../components/DaysNavigation";
import TaskItem from "../components/TaskItem";
import PlusButton from "../components/PlusButton";
import TaskAdditionModal from "../components/TaskAddModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

    // Load tasks from AsyncStorage on component mount
    useEffect(() => {
      loadTasks();
    }, []);

    const handleToggle = (taskId) => {
      // Toggle the isChecked property of the task with the given ID
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
      );
  
      setTasks(updatedTasks);
      saveTasks(updatedTasks); // Save updated tasks to AsyncStorage
    };

  const handleDayPress = (selectedDate) => {
    // Implement navigation to the selected day's to-do list
    console.log("Selected Date:", selectedDate);
  };

  const handlePlusButtonPress = () => {
    setIsModalVisible(true);
  };

  const handleAddTask = ({ time, task }) => {
    if (task.trim() !== "") {
      const newTask = {
        id: tasks.length + 1,
        emoji: "🌼",
        time,
        task,
        isChecked: false,
      };
      setTasks([...tasks, newTask]);
      saveTasks([...tasks, newTask]); 
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

    // Save tasks to AsyncStorage
    const saveTasks = async (tasks) => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks to AsyncStorage:', error);
      }
    };
  
    // Load tasks from AsyncStorage
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks from AsyncStorage:', error);
      }
    };

  return (
    <View className="flex-1 bg-gray-100 relative ">
      <View className="flex-1 bg-gray-100 relative mx-1">
        <DayHeader currentDate={new Date()} />
        <DaysNavigation onDayPress={handleDayPress} />
        

        <ScrollView className="flex-1 mb-6 px-3 pt-2">{renderTasks()}</ScrollView>

        <TaskAdditionModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onAddTask={handleAddTask}
        />

        <View className="absolute bottom-4 right-3">
          <PlusButton onPress={handlePlusButtonPress} />
        </View>
      </View>
    </View>
  );
};

export default MainScreen;
