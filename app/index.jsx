import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const {isLoading, isLoggedIn, user} = useGlobalContext()

  if(!isLoading && isLoggedIn) return <Redirect href={'/home'}/>

  return (
   <SafeAreaView className="bg-primary h-full">
    <ScrollView  contentContainerStyle={{
          height: "100%",
        }}>
      <View className={'w-full justify-center items-center min-h-[85vh] px-4'}>
        <Image 
          source={images.logo}
          className="w-[130px] h-[84px]"
          resizeMode='contain'
        />
        <Image 
          source={images.cards}
          className="max-w-[380px] h-[300px] w-full"
          resizeMode='contain'
        />
        <View className="relative mt-5 justify-center items-center">
          <Text className='text-3xl text-white font-bold text-center'>
            Discover Endless {"\n"} 
            Possibilities with {' '}
            <Text className='text-secondary-200'>Aroa</Text>
          </Text>
          <Image 
            source={images.path}
            className="w-[135px] h-[15px] absolute -right-8 -bottom-2"
            resizeMode='contain'
          />
        </View>

        <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
          Where Creativity Meets Innovation: Embark on a Journey of Limitless
          Exploration with Aora
        </Text>

        <CustomButton 
          title='Continue with an email'
          containerStyle='mt-7 w-full'
          handlePress={() => router.push('/sign-in')}
        />
      </View>
    </ScrollView>
    <StatusBar backgroundColor='#161622' style='light'/>
   </SafeAreaView>
  )
}


