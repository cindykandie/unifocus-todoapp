import React, { useState, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

const DarkThemeBtn = ({ onToggle }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load dark mode preference from AsyncStorage
    const loadDarkModePreference = async () => {
      try {
        const darkModePreference = await AsyncStorage.getItem("darkMode");
        setIsDarkMode(darkModePreference === "true");
      } catch (error) {
        console.error("Error loading dark mode preference:", error);
      }
    };

    loadDarkModePreference();
  }, []);

  const handleToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
    onToggle(!isDarkMode);

    // Save dark mode preference to AsyncStorage
    const saveDarkModePreference = async () => {
      try {
        await AsyncStorage.setItem("darkMode", String(!isDarkMode));
      } catch (error) {
        console.error("Error saving dark mode preference:", error);
      }
    };

    saveDarkModePreference();
  };

  return (
    <TouchableOpacity onPress={handleToggle}>
      <View className=" bg-purple-500 rounded-full p-4">
        {isDarkMode ? (
          <FontAwesome name="sun-o" size={24} color="#000" />
        ) : (
          <FontAwesome name="moon-o" size={24} color="#ffbe0b" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DarkThemeBtn;
