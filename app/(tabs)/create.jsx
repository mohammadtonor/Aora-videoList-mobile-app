import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { icons, images } from '../../constants'
import { ResizeMode, Video } from 'expo-av';
// import * as DocumentPicker from "expo-document-picker"
import * as ImagePicker from "expo-image-picker"
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import {useGlobalContext} from './../../context/GlobalProvider'

const Create = () => {
  const {user} = useGlobalContext()
  const [uploading, setuploading] = useState(false)
  const [form, setform] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const openPicker = async (selectType) => {
    let result = await ImagePicker
      .launchImageLibraryAsync({
        mediaTypes:
          selectType === "image"
            ? ImagePicker.MediaTypeOptions.Images
            : ImagePicker.MediaTypeOptions.Videos,
        aspect: [4, 3],
        quality: 1,
      });

    if(!result.canceled) {
      if(selectType === 'image') {
        setform({...form, thumbnail: result.assets[0] })
      }

      if(selectType === 'video') {
        setform({...form, video: result.assets[0] })
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document Picked", JSON.stringify(result, null, ))
      }, 100)
    }
  }
  
  const handleSubmit = async () => {
    if(form.title === "" || form.prompt === "" || !form.thumbnail || !form.video) {
      Alert.alert("Error", "Please fill in all fields")
      return;
    }
    setuploading(true);
    try {
      await createVideo({...form, userId: user.$id})

      Alert.alert('success', "Document Uploaded Successfully!")
      router.push('/home')
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setuploading(false);
      // setform({
      //   title: '',
      //   video: null,
      //   thumbnail: null,
      //   prompt: ''
      // })
    }

  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="px-4 my-6 mt-14">
        <Text className="text-white font-psemibold text-2xl">Upload Video</Text>

        <FormField
          title={"Video Title"}
          value={form.title}
          otherStyle={"mt-8"}
          placeholder="Give your video a catch title..."
          handleChangeText={(e) => setform({ ...form, title: e })}
        />

        <View className="space-y-2 mt-6">
          <Text className="text-gray-100 font-pmedium text-base">
            Upload Video
          </Text>
          <TouchableOpacity
            onPress={() => openPicker("video")}
          >
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                useNativeControls
                className="w-full h-64 rounded-xl"
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="h-40 w-full justify-center items-center bg-black-100 rounded-xl">
                <View className="justify-center items-center border border-dashed border-secondary-100 h-14 w-14">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 font-pmedium text-base">
            Thumbnail Image
          </Text>
          <TouchableOpacity
            onPress={() => openPicker("image")}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="h-16 flex-row w-full justify-center items-center bg-black-100 rounded-xl">
                <Image
                  source={icons.upload}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-gray-200 text-xs ml-2">
                  Choese an Image
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title={"Ai prompt"}
          value={form.prompt}
          otherStyle={"mt-7"}
          placeholder="The AI prompt of the video"
          handleChangeText={(e) => setform({ ...form, prompt: e })}
        />

        <CustomButton
          containerStyle={"mt-8"}
          title={"Submit & Publish"}
          handlePress={handleSubmit}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Create

