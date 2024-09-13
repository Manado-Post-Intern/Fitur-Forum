/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {IcWarning, IMGprofile} from '../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Gap} from '../../../../components';
import Reply from '../Reply';

const Comment = ({Type, username, value}) => {
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
          <Text style={styles.commentValue}>{value}</Text>
        </View>
      </View>
      <View style={styles.userResponse}>
        <Text style={styles.commentHours}>12j</Text>
        <Text style={styles.likeButton}>Suka</Text>
        <Text style={styles.replyButton}>Balas</Text>
      </View>
      {Type === 'replied' && (
        <>
          <Reply username={"Ta'Litha"} replyValue={'Di Malalayang, di Griya Pantai kak.'} />
          <Reply username={'Richard Jong'} replyValue={'Hati-hati bagi warga di area sekitar Kebakaran. Utamakan keselamatan!'} />
          <Reply username={"Ta'Litha"} replyValue={'Bencana seperti ini mengingatkan kita pentingnya kesiapsiagaan! Stay safe!'} />
        </>
      )}

      <Gap height={20} />
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  commentContainer: {
    width: 395,
    flexDirection: 'row',
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  imageStyling: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    marginLeft: 17,
    top: 10,
  },
  contentContainer: {
    paddingBottom: 10,
    width: 320,
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
    width: 270,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000',
    left: 10,
    top: 5,
  },
  userResponse: {
    flexDirection: 'row',
    left: 95,
    top: 10,
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
});
