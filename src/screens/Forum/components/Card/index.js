/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import {
  IcComments,
  IcDownvote,
  IcShare,
  IcUpvote,
  IcWarning,
  IMGprofile,
} from '../../assets';
import { RefreshControl } from 'react-native-gesture-handler';

const Card = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true); // Mulai loading
    try {
      const snapshot = await database().ref('forum/post').once('value');
      const data = snapshot.val();

      if (data) {
        const postsArray = Object.keys(data)
          .filter(id => id !== null && data[id])
          .map(id => ({id, ...data[id]}));

        // Load upvote/downvote status from AsyncStorage
        const updatedPostsArray = await Promise.all(
          postsArray.map(async post => {
            const isUpvoted = await AsyncStorage.getItem(
              `card_${post.id}_isUpvoted`,
            );
            const isDownvoted = await AsyncStorage.getItem(
              `card_${post.id}_isDownvoted`,
            );

            return {
              ...post,
              isUpvoted: JSON.parse(isUpvoted) || false,
              isDownvoted: JSON.parse(isDownvoted) || false,
            };
          }),
        );

        setPosts(updatedPostsArray);
      }
    } catch (error) {
      console.error('Error fetching posts: ', error);
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  useEffect(() => {
    fetchPosts(); // Panggil fetchPosts saat komponen dimount
  }, []);

  const handleUpvote = async (
    id,
    upvotes,
    downvotes,
    isUpvoted,
    isDownvoted,
  ) => {
    const newUpvoteStatus = !isUpvoted;

    if (newUpvoteStatus) {
      await database()
        .ref(`forum/post/${id}`)
        .update({
          upVote: database.ServerValue.increment(1),
          ...(isDownvoted && {downVote: database.ServerValue.increment(-1)}),
        });
      await AsyncStorage.setItem(`card_${id}_isUpvoted`, JSON.stringify(true));
      await AsyncStorage.setItem(
        `card_${id}_isDownvoted`,
        JSON.stringify(false),
      );
    } else {
      await database()
        .ref(`forum/post/${id}`)
        .update({
          upVote: database.ServerValue.increment(-1),
        });
      await AsyncStorage.setItem(`card_${id}_isUpvoted`, JSON.stringify(false));
    }

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id
          ? {
              ...post,
              isUpvoted: newUpvoteStatus,
              isDownvoted: false,
              upVote: post.upVote + (newUpvoteStatus ? 1 : -1),
              downVote: post.isDownvoted ? post.downVote - 1 : post.downVote,
            }
          : post,
      ),
    );
  };

  const handleDownvote = async (
    id,
    downvotes,
    upvotes,
    isDownvoted,
    isUpvoted,
  ) => {
    const newDownvoteStatus = !isDownvoted;

    if (newDownvoteStatus) {
      await database()
        .ref(`forum/post/${id}`)
        .update({
          downVote: database.ServerValue.increment(1),
          ...(isUpvoted && {upVote: database.ServerValue.increment(-1)}),
        });
      await AsyncStorage.setItem(
        `card_${id}_isDownvoted`,
        JSON.stringify(true),
      );
      await AsyncStorage.setItem(`card_${id}_isUpvoted`, JSON.stringify(false));
    } else {
      await database()
        .ref(`forum/post/${id}`)
        .update({
          downVote: database.ServerValue.increment(-1),
        });
      await AsyncStorage.setItem(
        `card_${id}_isDownvoted`,
        JSON.stringify(false),
      );
    }

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id
          ? {
              ...post,
              isDownvoted: newDownvoteStatus,
              isUpvoted: false,
              downVote: post.downVote + (newDownvoteStatus ? 1 : -1),
              upVote: post.isUpvoted ? post.upVote - 1 : post.upVote,
            }
          : post,
      ),
    );
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchPosts} />
      }>
      <View style={{flex: 1}}>
        {posts.map(post => (
          <View
            key={post.id}
            style={[
              styles.cardContainer,
              post.type !== 'photo' && styles.cardContainerNonPhoto,
            ]}>
            {post.type === 'photo' && (
              <View style={styles.cardImage}>
                <Image source={{uri: post.image}} style={styles.postImage} />
              </View>
            )}
            <View style={styles.userInformationContainer}>
              <View style={styles.userInformation}>
                <View style={styles.userProfile}>
                  <Image style={styles.profileImage} source={IMGprofile} />
                </View>
                <Text style={styles.userName}>{post.owner}</Text>
                <Text style={styles.dash}>-</Text>
                <Text style={styles.userCreatedAt}>13 jam</Text>
              </View>
              <View style={styles.warningIcon}>
                <TouchableOpacity>
                  <IcWarning />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.caption}>
              <Text style={styles.captionStyle}>{post.caption}</Text>
            </View>
            <View style={styles.cardFooter}>
              <View>
                <TouchableOpacity
                  style={[
                    styles.voteStyle,
                    post.isUpvoted && styles.voteStyleUpvoted,
                  ]}
                  onPress={() =>
                    handleUpvote(
                      post.id,
                      post.upVote,
                      post.downVote,
                      post.isUpvoted,
                      post.isDownvoted,
                    )
                  }>
                  <IcUpvote />
                  {post.isUpvoted && (
                    <Text style={styles.upvoteCount}>{post.upVote}</Text>
                  )}
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={[
                    styles.voteStyle,
                    post.isDownvoted && styles.voteStyleDownvoted,
                  ]}
                  onPress={() =>
                    handleDownvote(
                      post.id,
                      post.downVote,
                      post.upVote,
                      post.isDownvoted,
                      post.isUpvoted,
                    )
                  }>
                  <IcDownvote />
                  {post.isDownvoted && (
                    <Text style={styles.upvoteCount}>{post.downVote}</Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.commentContainer}>
                <TouchableOpacity style={styles.commentStyle}>
                  <IcComments />
                  <Text style={styles.commentTextStyle}>Komentar</Text>
                  <Text style={styles.totalComment}>(8)</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shareButton}>
                <TouchableOpacity>
                  <IcShare />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    width: 392,
    height: 433,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderRadius: 8,
    elevation: 3,
    paddingLeft: 27,
    paddingTop: 5,
  },
  cardContainerNonPhoto: {
    height: 240,
  },
  cardImage: {
    width: 380,
    height: 180,
    marginTop: 10,
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  userInformationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInformation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    flexShrink: 1,
  },
  userProfile: {
    width: 44,
    height: 44,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  userName: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 12,
    flexShrink: 1,
  },
  dash: {
    marginLeft: 10,
  },
  userCreatedAt: {
    marginLeft: 5,
  },
  warningIcon: {
    position: 'absolute',
    right: 20,
    top: '50%',
    width: 24,
    height: 24,
  },
  caption: {
    width: 343,
    height: 100,
    marginTop: 15,
  },
  captionStyle: {
    color: 'black',
    fontSize: 13,
  },
  cardFooter: {
    flexDirection: 'row',
    marginTop: 18,
    marginLeft: -10,
  },
  voteStyle: {
    flexDirection: 'row',
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#39A5E1',
    marginLeft: 15,
  },
  voteStyleUpvoted: {
    marginRight: -10,
    marginLeft: 2,
    width: 60,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#39A5E1',
  },
  voteStyleDownvoted: {
    marginRight: -10,
    marginLeft: 5,
    width: 60,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#39A5E1',
  },
  upvoteCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#39A5E1',
    marginLeft: 5,
  },
  commentContainer: {
    width: 132,
    height: 30,
    marginLeft: 130,
    position: 'absolute',
  },
  commentStyle: {
    width: 132,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#39A5E1',
  },
  commentTextStyle: {
    color: '#39A5E1',
    marginHorizontal: 8,
  },
  totalComment: {
    color: '#39A5E1',
  },
  shareButton: {
    position: 'absolute',
    marginLeft: 320,
  },
});