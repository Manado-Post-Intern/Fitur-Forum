/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {
  IcComments,
  IcDownvote,
  IcShare,
  IcUpvote,
  IcWarning,
  IMGkebakaran,
  IMGprofile,
} from '../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Card = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardImage}>
        <Image source={IMGkebakaran} style={styles.postImage} />
      </View>
      <View style={styles.userInformation}>
        <View style={styles.userProfile}>
          <Image style={styles.profileImage} source={IMGprofile} />
        </View>
        <Text style={styles.userName}>Jhellytha Kalantow</Text>
        <Text style={styles.dash}>-</Text>
        <Text style={styles.userCreatedAt}>13 jam</Text>
        <TouchableOpacity>
          <IcWarning style={styles.warningIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.caption}>
        <Text style={styles.captionStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.{' '}
        </Text>
        <Text style={styles.tagStyle}>#Kebakaran</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity>
          <View style={styles.voteStyle}>
            <IcUpvote />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.voteStyle}>
            <IcDownvote />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentStyle}>
          <IcComments />
          <Text style={styles.commentTextStyle}>Komentar</Text>
          <Text style={styles.totalComment}>(8)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <IcShare />
        </TouchableOpacity>
      </View>
    </View>
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
  cardImage: {
    width: 380,
    height: 180,
    marginTop: 10,
  },
  postImage: {
    width: '100%', // Sesuaikan dengan lebar cardImage
    height: '100%', // Sesuaikan dengan tinggi cardImage
    borderRadius: 8, // Optional: sesuai dengan borderRadius dari cardContainer
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
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#39A5E1',
    marginLeft: 15,
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
    marginLeft: 43,
  },
  commentTextStyle: {
    color: '#39A5E1',
    marginHorizontal: 8,
  },
  totalComment: {
    color: '#39A5E1',
  },
  shareButton: {
    marginLeft: 50,
  },
});
