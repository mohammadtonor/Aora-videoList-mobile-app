import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import {images} from './../../constants'
import SearchInput from '../../components/SearchButton';
import Trending from '../../components/Trending';

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full pt-12">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Text className="text-3xl text-white">{item.id}</Text>}
        ListHeaderComponent={() => (
          <View className="my-8 px-4 space-y-2">
            <View className="items-start flex flex-row justify-between mb-8">
              <View>
                <Text className=" text-gray-100 text-sm font-pmedium">
                  Welcome to Aroa
                </Text>
                <Text className="text-2xl text-white font-semibold">
                  JSMastry
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="h-10 w-9"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className='w-full flex-1 pt-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>Trending Videos</Text>

              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]}/>
            </View>
          </View>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}

export default Home

const styles = StyleSheet.create({})