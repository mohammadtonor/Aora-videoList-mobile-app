import { FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import {images} from './../../constants'
import SearchInput from '../../components/SearchButton';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { useState } from 'react';
import { getAllPosts, getLatestPosts } from '../../lib/appwrite';
import { useAppwrite } from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';

const Home = () => {
  const {user} = useGlobalContext()
 const {data: posts, refetch} = useAppwrite(getAllPosts)
 const {data: latestPost} = useAppwrite(getLatestPosts)

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh =async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false); 
  }

  return (
    <SafeAreaView className="bg-primary h-full pt-10">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item}/>}
        ListHeaderComponent={() => (
          <View className="my-8 px-4 space-y-2">
            <View className="items-start flex flex-row justify-between mb-8">
              <View>
                <Text className=" text-gray-100 text-sm font-pmedium">
                  Welcome to Aroa,
                </Text>
                <Text className="text-2xl text-white font-semibold">
                  {user?.username}
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

            <View className='w-full flex-1 pt-6'>
              <Text className='text-gray-100 text-lg font-pregular '>Trending Videos</Text>

              <Trending posts={latestPost}/>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <EmptyState title={'No videos Found'} subtitle={'Be the first one to upload video'}/>
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  );
}

export default Home

const styles = StyleSheet.create({})