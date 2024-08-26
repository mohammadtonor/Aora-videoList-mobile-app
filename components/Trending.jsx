import { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'

const zoomIn = {
  0:{
    scale: 0.9
  },
  1:{
    scale: 1
  }
}

const zoomOut = {
  0:{
    scale: 1
  },
  1:{
    scale: 0.9
  }
}

const TendingItem = ({activeItem, item}) => {
  const [play, setPlay] = useState(false)

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
    >
      {play ? (
        <Video
          source={{uri: item.video}}
          className='w-52 h-72 rounded-[35px]  bg-white/10'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if(status.didJustFinish) {
              setPlay(false)
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="relative items-center justify-center"
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 shadow-lg rounded-[33px] shadow-black/40 my-5 overflow-hidden"
            resizeMode="cover"
          />
          <Image source={icons.play} className="absolute w-12 h-12" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
}

const Trending = ({posts}) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };


  return (
    <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TendingItem activeItem={activeItem} item={item}/>
        )}
        onViewableItemsChanged={viewableItemsChanged}
        horizontal
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
        contentOffset={{ X: 170}}
    />
  )
}

export default Trending

