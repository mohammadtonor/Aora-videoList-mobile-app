import {  Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av';

const VideoCard = ({video: {title, thumbnail, video, creator: {username, avatar}}}) => {
    const [play, setPlay] = useState(false)
  return (
    <View className="px-4 flex-col items-center mb-14">
      <View className="flex-row gap-3 items-start">
        <View className=" flex-row flex-1 items-center justify-center">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary items-center">
            <Image
              source={{ uri: avatar }}
              resizeMode="contain"
              className="w-full h-full rounded-lg p-0.5"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              numberOfLines={1}
              className="text-sm text-white font-psemibold"
            >
              {title}
            </Text>
            <Text
              numberOfLines={1}
              className="text-xs text-gray-100 font-pregular"
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-1  bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
        >
          <Image
            className="w-full h-full rounded-xl"
            resizeMode="cover"
            source={{ uri: thumbnail }}
          />
          <Image
            className="w-12 h-12 absolute "
            resizeMode="contain"
            source={icons.play}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default VideoCard

