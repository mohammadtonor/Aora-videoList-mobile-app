import {
  FlatList,
  SafeAreaView,
  Alert,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import EmptyState from "../../components/EmptyState";
import { signOut, userPosts } from "../../lib/appwrite";
import { useAppwrite } from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";

import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import Infobar from "../../components/Infobar";
import { router } from "expo-router";

const Search = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => userPosts(user.$id));
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('sign-in');
  };
  
  return (
    <SafeAreaView className="bg-primary h-full pt-10">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="mt-6 px-4 justify-center items-center mb-12">
            <TouchableOpacity
              onPress={logout}
              className=" items-end w-full mb-10"
            >
              <Image
                source={icons.logout}
                className="w-5 h-5 items-end"
                resizeMode="cover"
              />
            </TouchableOpacity>

            <View className="items-center rounded-lg justify-center border border-secondary w-16 h-16">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <Infobar
              title={user?.username}
              titleStyles="mt-4"
              containerStyles="text-lg"
            />

            <View className="flex flex-row">
              <Infobar
                subtitle="Posts"
                title={posts.length || 0}
                titleStyles="text-xl"
                containerStyles="mr-10 ml-2"
              />
              <Infobar
                subtitle="Followers"
                title="1.2K"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            title={"No videos Found"}
            subtitle={"Be the first one to upload video"}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Search;
