import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Infobar = ({title, subtitle, containerStyles, titleStyles}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold  ${titleStyles}`}>{title}</Text>
      <Text className='text-gray-100 text-center font-pregular'>{subtitle}</Text>
    </View>
  )
}

export default Infobar

