import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import DayHeader from "../components/DayHeader";
import DaysNavigation from "../components/DaysNavigation";
import TaskItem from "../components/TaskItem";
import PlusButton from "../components/PlusButton";
import TaskAdditionModal from "../components/TaskAddModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskEditModal from "../components/TaskEditModal";
import moment from "moment";

const MainScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  // Emoji Finder
  const emojis = ["🍀", "☘️", "🌺", "🌸", "🌼", "🌻", "🍎", "💛"];
  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  };

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

  // Filter tasks for the selected date
  const filteredTasks = (selectedDate) => {
    return tasks.filter((task) => {
      // Use moment to format task.date to match selectedDate format
      return moment(task.date).format("YYYY-MM-DD") === selectedDate;
    });
  };

  const handleDayPress = (selectedDate) => {
    setSelectedDate(selectedDate);
    const tasksForSelectedDate = filteredTasks(selectedDate);
    console.log("Selected Date:", selectedDate);
    console.log("Tasks for Selected Date:", tasksForSelectedDate);
  };

  const handlePlusButtonPress = () => {
    setIsModalVisible(true);
  };

  const handleAddTask = ({ time, task }) => {
    if (task.trim() !== "") {
      const newTask = {
        id: tasks.length + 1,
        emoji: getRandomEmoji(),
        date: moment(selectedDate).format("YYYY-MM-DD"), // Format the date
        time,
        task,
        isChecked: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setIsModalVisible(false);
    }
  };

  const handleEditTask = (editedTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === editedTask.id
          ? { ...editedTask, date: moment(selectedDate).format("YYYY-MM-DD") }
          : task
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
    setIsEditModalVisible(false);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks); // Save updated tasks to AsyncStorage
  };

  const handleLongPress = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setSelectedTask(taskToEdit);
    setIsEditModalVisible(true);
  };

  const renderTasks = () => {
    return filteredTasks(selectedDate).map((task) => (
      <TaskItem
        key={`${task.id}-${task.emoji}`}
        emoji={task.emoji}
        time={task.time}
        task={task.task}
        isChecked={task.isChecked}
        onToggle={() => handleToggle(task.id)}
        onLongPress={() => handleLongPress(task.id)}
      />
    ));
  };

  // Save tasks to AsyncStorage
  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage:", error);
    }
  };

  // Load tasks from AsyncStorage
  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks from AsyncStorage:", error);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 relative ">
      <View className="flex-1 bg-gray-100 relative mx-1">
        <DayHeader currentDate={new Date()} />
        <DaysNavigation
          navigation={navigation}
          onDayPress={(selectedDate) => {
            handleDayPress(selectedDate);
          }}
          selectedDate={selectedDate} // Pass the selectedDate to DaysNavigation
        />

        <ScrollView className="flex-1 mb-6 px-3 pt-2">
          {filteredTasks(selectedDate).length === 0 ? (
            <Text className="text-center my-20 text-3xl text-purple-950 font-light">
              Tasks Go Here!😉
            </Text>
          ) : (
            renderTasks()
          )}
        </ScrollView>

        <TaskAdditionModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onAddTask={handleAddTask}
          selectedDate={selectedDate}
        />

        <TaskEditModal
          visible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          task={selectedTask}
        />
        <View className="absolute bottom-4 right-3">
          <PlusButton onPress={handlePlusButtonPress} />
        </View>
      </View>
    </View>
  );
};

export default MainScreen;
