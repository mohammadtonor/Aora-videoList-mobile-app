import { Image, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import { Link } from 'expo-router'
const SingnIn = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center h-full px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain' 
            className='w-[115px] h-[35px]'
          />  
          <Text className='text-2xl text-white mt-10 text-semibold font-psemibold'>
            Log in to Aroa
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SingnIn

