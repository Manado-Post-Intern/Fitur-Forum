/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {IcWarning, IMGprofile} from '../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Gap} from '../../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Reply = ({replyValue, username}) => {
  const [liked, setLiked] = useState(false);

  const storageKey = `liked_${username}`;

  useEffect(() => {
    const getLikedStatus = async () => {
      try {
        const savedLikedStatus = await AsyncStorage.getItem(storageKey);
        if (savedLikedStatus !== null) {
          setLiked(JSON.parse(savedLikedStatus));
        }
      } catch (error) {
        console.error('Failed to load liked status', error);
      }
    };

    getLikedStatus();
  }, [storageKey]);

  const handleLikePress = async () => {
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);

    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(newLikedStatus));
    } catch (error) {
      console.error('Failed to save liked status', error);
    }
  };

  return (
    <View>
      <View style={styles.commentContainer}>
        <View style={styles.imageContainer}>
          <Image source={IMGprofile} style={styles.imageStyling} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.username}>
            <Text style={styles.usernameStyle}>{username}</Text>
            <View style={styles.warningStyle}>
              <TouchableOpacity>
                <IcWarning />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.commentValue}>{replyValue}</Text>
        </View>
      </View>
      <View style={styles.userResponse}>
        <Text style={styles.commentHours}>12j</Text>
        <TouchableOpacity onPress={handleLikePress}>
          <Text style={[styles.likeButton, liked && styles.liked]}>
            {liked ? 'Suka(1)' : 'Suka'}
          </Text>
        </TouchableOpacity>
      </View>
      <Gap height={5} />
    </View>
  );
};

export default Reply;

const styles = StyleSheet.create({
  commentContainer: {
    top: 10,
    left: 68,
    width: 395,
    flexDirection: 'row',
    bottom: 10,
  },
  imageContainer: {
    width: 36,
    height: 36,
  },
  imageStyling: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    marginLeft: 17,
    top: 10,
  },
  contentContainer: {
    width: 265,
    paddingBottom: 10,
    backgroundColor: '#F1F2F6',
    borderRadius: 8,
    marginLeft: 30,
    top: 10,
  },
  username: {
    flexDirection: 'row',
    top: 4,
  },
  usernameStyle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#373737',
    left: 10,
  },
  warningStyle: {
    position: 'absolute',
    right: 6,
  },
  commentValue: {
    width: 250,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#373737',
    left: 10,
    top: 5,
  },
  userResponse: {
    flexDirection: 'row',
    left: 150,
    top: 20,
  },
  commentHours: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  likeButton: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 19,
  },
  replyButton: {
    marginLeft: 19,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  liked: {
    color: '#39A5E1', // Warna berubah menjadi biru saat "liked"
  },
});
