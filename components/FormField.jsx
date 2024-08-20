import { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  otherStyle,
  handleChangeText,
  keyboardType,
  placeholder,
  ...props
}) => {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className=" flex-row border-2 border-black-200 w-full h-16 justify-center px-4 bg-black-100  rounded-xl focus:border-secondary items-center">
        <TextInput 
            className="flex-1 text-white font-pmedium text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor={"#7b7b8b"}
            onChangeText={handleChangeText}
            secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
                <Image 
                    source={!showPassword ? icons.eye : icons.eyeHide}
                    resizeMode="contain"
                    className="w-4 h-4"

                />
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

