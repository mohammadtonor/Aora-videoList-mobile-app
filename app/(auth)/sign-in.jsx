import { Alert, Image, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import CustomButton from './../../components/CustomButton'
import FormField from '../../components/FormField';
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'



const SingnIn = () => {
  const {setIsLoggedIn, setUser} = useGlobalContext();
  
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [isSubmitiong, setisSubmitiong] = useState(false)

  const handeSubmit = async () => {
    if( form.email === '' || form.password === '') {
      Alert.alert("Error", "Please fill in all fields");
    }
    setisSubmitiong(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();

      setUser(result);
      setIsLoggedIn(true);
      Alert.alert("Success", "You have signed in successfully.");
      router.replace('/home')
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log(error);
    } finally {
      setisSubmitiong(false);
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain' 
            className='w-[115px] h-[35px]'
          />  
          <Text className='text-2xl text-white mt-10 text-semibold font-psemibold'>
            Log in to Aroa
          </Text>
          <FormField 
            title={"Email"}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyle={'mt-7'}
            placeholder={"Enter your email address"}
            keyboardType={'email-address'}
          />
          <FormField 
            title={"Password"}
            handleChangeText={(e) => setForm({...form, password: e})}
            placeholder={"Enter your password"}
            otherStyle={'mt-7'}
          />

          <CustomButton
            handlePress={handeSubmit}
            containerStyle={'mt-7'}
            isLoading={isSubmitiong}
            title={"Sign In"}
          /> 
          <View className='justify-center items-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have Account?
            </Text>
            <Link className='text-secondary text-lg font-psemibold' href={'/sign-up'}>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SingnIn

