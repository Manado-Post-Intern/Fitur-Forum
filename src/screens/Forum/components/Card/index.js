/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import { IcComments, IcDownvote, IcShare, IcUpvote, IcWarning, IMGprofile } from '../../assets';

const Card = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await database().ref('forum/post').once('value');
      const data = snapshot.val();

      if (data) {
        // Filter out any posts where ID or data is invalid
        const postsArray = Object.keys(data)
          .filter(id => id !== null && data[id]) // Filter out null IDs and ensure data is valid
          .map(id => ({ id, ...data[id] }));
        setPosts(postsArray);
      }
    };

    fetchPosts();
  }, []);

  const handleUpvote = async (id, upvotes, isUpvoted, isDownvoted) => {
    const newUpvoteStatus = !isUpvoted;
    const voteChange = newUpvoteStatus ? 1 : -1;

    if (isDownvoted && newUpvoteStatus) {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === id
            ? { ...post, isDownvoted: false, downVote: post.downVote - 1 }
            : post,
        ),
      );
      await AsyncStorage.setItem(`card_${id}_isDownvoted`, JSON.stringify(false));
      await AsyncStorage.setItem(`card_${id}_downvotes`, (upvotes - 1).toString());
    }

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id
          ? { ...post, isUpvoted: newUpvoteStatus, upVote: post.upVote + voteChange }
          : post,
      ),
    );

    await AsyncStorage.setItem(`card_${id}_isUpvoted`, JSON.stringify(newUpvoteStatus));
    await AsyncStorage.setItem(`card_${id}_upvotes`, (upvotes + voteChange).toString());
  };

  const handleDownvote = async (id, downvotes, isUpvoted, isDownvoted) => {
    const newDownvoteStatus = !isDownvoted;
    const voteChange = newDownvoteStatus ? 1 : -1;

    if (isUpvoted && newDownvoteStatus) {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === id
            ? { ...post, isUpvoted: false, upVote: post.upVote - 1 }
            : post,
        ),
      );
      await AsyncStorage.setItem(`card_${id}_isUpvoted`, JSON.stringify(false));
      await AsyncStorage.setItem(`card_${id}_upvotes`, (downvotes - 1).toString());
    }

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id
          ? { ...post, isDownvoted: newDownvoteStatus, downVote: post.downVote + voteChange }
          : post,
      ),
    );

    await AsyncStorage.setItem(`card_${id}_isDownvoted`, JSON.stringify(newDownvoteStatus));
    await AsyncStorage.setItem(`card_${id}_downvotes`, (downvotes + voteChange).toString());
  };

  return (
    <ScrollView>
      <View style={{ padding: 10 }}>
        {posts.map(post => (
          <View key={post.id} style={[styles.cardContainer, post.type !== 'photo' && styles.cardContainerNonPhoto]}>
            {post.type === 'photo' && (
              <View style={styles.cardImage}>
                <Image source={{ uri: post.image }} style={styles.postImage} />
              </View>
            )}
            <View style={styles.userInformation}>
              <View style={styles.userProfile}>
                <Image style={styles.profileImage} source={IMGprofile} />
              </View>
              <Text style={styles.userName}>{post.owner}</Text>
              <Text style={styles.dash}>-</Text>
              <Text style={styles.userCreatedAt}>13 jam</Text>
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
                  style={[styles.voteStyle, post.isUpvoted && styles.voteStyleUpvoted]}
                  onPress={() => handleUpvote(post.id, post.upVote, post.isUpvoted, post.isDownvoted)}>
                  <IcUpvote />
                  {post.isUpvoted && <Text style={styles.upvoteCount}>{post.upVote}</Text>}
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={[styles.voteStyle, post.isDownvoted && styles.voteStyleDownvoted]}
                  onPress={() => handleDownvote(post.id, post.downVote, post.isUpvoted, post.isDownvoted)}>
                  <IcDownvote />
                  {post.isDownvoted && <Text style={styles.upvoteCount}>{post.downVote}</Text>}
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
    width: 402,
    height: 433,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
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
  userInformation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginLeft: 14,
  },
  userProfile: {
    width: 44,
    height: 44,
    borderRadius: 30,
    backgroundColor: 'red',
    marginLeft: -20,
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
    marginLeft: 10,
  },
  dash: {
    marginLeft: 5,
  },
  userCreatedAt: {
    marginLeft: 5,
  },
  warningIcon: {
    marginLeft: 110,
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
  tagStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    marginTop: 18,
    marginLeft: -20,
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
    marginLeft: 30,
    marginRight: -5,
    width: 60,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#00599B',
  },
  voteStyleDownvoted: {
    marginRight: -25,
    width: 60,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F02D2D',
  },
  upvoteCount: {
    fontSize: 14,
    color: 'black',
    marginLeft: 5,
  },
  commentContainer: {
    width: 132,
    height: 30,
    marginLeft: 43,
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
    marginLeft: 40,
  },
});
