import { FlatList, SafeAreaView,Alert, Text, View } from 'react-native'
import SearchInput from '../../components/SearchButton';
import EmptyState from '../../components/EmptyState';
import { searchPosts } from '../../lib/appwrite';
import { useAppwrite } from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

const Search = () => {
const {query} = useLocalSearchParams()
 const {data: posts, refetch} = useAppwrite(() => searchPosts(query));  

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full pt-10">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item}/>}
        ListHeaderComponent={() => (
          <View className="my-8 px-4 space-y-2">
          
              <View className='mb-4'>
                <Text className=" text-gray-100 text-sm font-pmedium">
                  Search Results
                </Text>
                <Text className="text-2xl text-white font-semibold">
                  {query}
                </Text>
              </View>
            
            <SearchInput initialQuery={query}/>

          </View>
        )}
        ListEmptyComponent={
          <EmptyState title={'No videos Found'} subtitle={'Be the first one to upload video'}/>
        }
      />
    </SafeAreaView>
  );
}

export default Search

