import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  containerStyle,
  handlePress,
  textStyle,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${containerStyle} bg-secondary min-h-[62px] rounded-xl first-letter:justify-center items-center
        ${isLoading ? "opacity-50" : ""}
      `}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
