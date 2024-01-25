import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import DayHeader from "../components/DayHeader";
import DaysNavigation from "../components/DaysNavigation";
import TaskItem from "../components/TaskItem";
import PlusButton from "../components/PlusButton";
import TaskAdditionModal from "../components/TaskAddModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskEditModal from "../components/TaskEditModal";
import moment from "moment";
import { StatusBar } from "expo-status-bar";

const MainScreen = ({ navigation }) => {
  // State variables
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  // Emoji Finder
  const emojis = ["🍀", "☘️", "🌺", "🌸", "🌼", "🌻", "🍎", "💛"];

  // Helper function to generate a unique ID
  const generateUniqueId = () => {
    const randomId = Math.random().toString(36).substr(2, 9);
    const timestamp = new Date().getTime();
    return `${randomId}-${timestamp}`;
  };

  // Helper function to load tasks from AsyncStorage
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

  // Initial load of tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Handle toggling the isChecked property of a task
  const handleToggle = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks); // Save updated tasks to AsyncStorage
  };

  // Filter tasks for the selected date
  const filteredTasks = (selectedDate) => {
    return tasks.filter(
      (task) => moment(task.date).format("YYYY-MM-DD") === selectedDate
    );
  };

  // Handle pressing a day in the DaysNavigation component
  const handleDayPress = (selectedDate) => {
    setSelectedDate(selectedDate);
    const tasksForSelectedDate = filteredTasks(selectedDate);
  };
  const handlePreviousWeekPress = () => {
    // Move to the previous week
    const previousWeek = moment(selectedDate)
      .subtract(1, "week")
      .format("YYYY-MM-DD");
    setSelectedDate(previousWeek);
  };

  // Handle pressing the "Today" button in the DayHeader component
  const handleTodayPress = () => {
    setSelectedDate(moment().format("YYYY-MM-DD"));
  };

  // Handle pressing the "Add Task" button
  const handlePlusButtonPress = () => {
    setIsModalVisible(true);
  };

  // Handle adding a new task
  const handleAddTask = ({ time, task }) => {
    if (task.trim() !== "") {
      const newTask = {
        id: generateUniqueId(),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        date: moment(selectedDate).format("YYYY-MM-DD"),
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
  // Handle long-pressing a task to edit
  const handleLongPress = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setSelectedTask(taskToEdit);
    setIsEditModalVisible(true);
  };

  // Handle editing an existing task
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

  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Render the list of tasks
  const renderTasks = () => {
    return filteredTasks(selectedDate).map((task) => (
      <TaskItem
        key={task.id}
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

  return (
    <View className="flex-1 bg-gray-800 relative">
      <StatusBar style="light" />
      <View className="flex-1 bg-gray-800 relative mx-1">
        {/* Day Header Component */}
        <DayHeader currentDate={selectedDate} onTodayPress={handleTodayPress} />

        {/* Days Navigation Component */}
        <DaysNavigation
          navigation={navigation}
          onDayPress={(selectedDate) => handleDayPress(selectedDate)}
          selectedDate={selectedDate}
          onPreviousWeekPress={handlePreviousWeekPress}
        />

        {/* List of Tasks */}
        <ScrollView className="my-4 px-3">
          {filteredTasks(selectedDate).length === 0 ? (
            <Text className="p-4 mx-4 rounded text-center my-60 text-3xl text-purple-50 font-semibold">
              {moment(selectedDate).format("dddd")}'s Tasks Go Here!😉
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
