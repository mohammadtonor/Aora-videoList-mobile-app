import { Image, StyleSheet, Text, View } from 'react-native'
import CustomButton from './../components/CustomButton'
import { images } from '../constants'

const EmptyState = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-[270px] h-[270px]" />
      <Text className="text-2xl text-white font-semibold">{title}</Text>
      <Text className=" text-gray-100 text-sm font-pmedium">
       {subtitle}
      </Text>
      <CustomButton 
        title={'Create a video'}
        containerStyle={'w-full mt-4'}
      />
    </View>
  );
}

export default EmptyState

const styles = StyleSheet.create({})