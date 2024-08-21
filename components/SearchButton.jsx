import { useState } from "react";
import { Alert, Image, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }) => {
    const pathname = usePathname();
    const [query, setQquery] = useState(initialQuery || "")
  return (
    
      <View className="flex-row border-2 border-black-200 w-full h-16 justify-center px-4 bg-black-100  rounded-xl focus:border-secondary items-center">
        <TextInput
          className="flex-1 text-white font-pregular text-base"
          value={query}
          placeholder='Search a video topic'
          placeholderTextColor={"#CDCDE0"}
          onChangeText={e => setQquery(e)}
        />

        <TouchableOpacity onPress={() => {
            if(query === "")
                return Alert.alert(
                  "Missing Query",
                  "Please input something to search result accross database"
                );
            if(pathname.startsWith('/search')) router.setParams({query});
            else router.push(`/search/${query}`)
        }}>
          <Image
            source={icons.search}
            resizeMode="contain"
            className="w-5 h-5"
          />
        </TouchableOpacity>
      </View>
  );
};

export default SearchInput;

